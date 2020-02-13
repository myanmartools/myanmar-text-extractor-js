import { TextExtractor } from './text-extractor';
import { FragmentType, TextFragment } from './text-fragment';

export class LetterTextExtractor implements TextExtractor {
    // Spaces
    private readonly _visibleSpace = ' \u00A0\u1680\u2000-\u2009\u202F\u205F\u3000';
    private readonly _invisibleSpace = '\u00AD\u180E\u200A\u200B\u2060\uFEFF';
    private readonly _space = `${this._visibleSpace}${this._invisibleSpace}`;
    private readonly _spaceRegExp = new RegExp(`^[${this._space}]`);

    // Diacritic
    private readonly _diacriticRegExp = new RegExp(`^(?:[${this._space}]?[\u102B-\u103E])+`);

    // AThet
    private readonly _aThetRegExp = new RegExp(`^[${this._space}]?[\u1000-\u1021\u1025](?:(?:[${this._space}]?[\u103B-\u103E])+)?[${this._space}]?\u103A(?:(?:[${this._space}]?[\u102B-\u103E])+)?`);

    // Pahsin
    private readonly _pahsinUpper = '\u1000-\u1021\u1025-\u1027\u1029\u102A\u103F\u1040-\u1049\u104E';
    private readonly _pahsinLower = '\u1000-\u1021\u1027\u103F';
    private readonly _pahsinRegExp = new RegExp(`^[${this._space}]?[${this._pahsinUpper}][${this._space}]?\u1039[${this._space}]?[${this._pahsinLower}]`);

    extractNext(input: string): TextFragment | null {
        let matchedStr = input[0];
        let curStr = input.substring(1);

        let curMatchedStr = this.matchDiacriticsAThetPahsin(curStr);

        while (curMatchedStr != null) {
            matchedStr += curMatchedStr;
            curStr = curStr.substring(curMatchedStr.length);
            while (curStr.length > 0 && (curMatchedStr[curMatchedStr.length - 1] === '\u1039' || curStr[0] === '\u103F')) {
                matchedStr += curStr[0];
                curStr = curStr.substring(1);
            }

            if (!curStr) {
                break;
            }

            curMatchedStr = this.matchDiacriticsAThetPahsin(curStr);
        }

        let normalizedStr = '';
        let spaceIncluded = false;
        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;
            if (!(cp >= 0x1000 && cp <= 0x109F) && (cp === 0x0020 || this._spaceRegExp.test(c))) {
                spaceIncluded = true;
            } else {
                normalizedStr += c;
            }
        }

        const textFragment: TextFragment = {
            fragmentType: FragmentType.Letter,
            matchedStr,
            normalizedStr
        };

        if (spaceIncluded) {
            textFragment.spaceIncluded = true;
            textFragment.normalizeReason = textFragment.normalizeReason || {};
            textFragment.normalizeReason.removeSpace = true;
        }

        return textFragment;
    }

    private matchDiacriticsAThetPahsin(curStr: string): string | null {
        let m = curStr.match(this._diacriticRegExp);
        if (m != null) {
            return m[0];
        }

        m = curStr.match(this._aThetRegExp);
        if (m != null) {
            return m[0];
        }

        m = curStr.match(this._pahsinRegExp);
        if (m != null) {
            return m[0];
        }

        return null;
    }
}
