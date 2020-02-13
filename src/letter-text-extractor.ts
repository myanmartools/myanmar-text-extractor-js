import { TextExtractor } from './text-extractor';
import { FragmentType, TextFragment } from './text-fragment';

export class LetterTextExtractor implements TextExtractor {
    // Space
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

    // Lagaung
    private readonly _possibleLagaungRegExp = new RegExp(`^[\u104E\u1044][${this._space}]?\u1004[${this._space}]?\u103A`);

    extractNext(input: string): TextFragment | null {
        let matchedStr = input[0];
        let curStr = input.substring(1);

        let curMatchedStr = this.matchDiacriticsAThetPahsin(curStr);

        while (curMatchedStr != null) {
            matchedStr += curMatchedStr;
            curStr = curStr.substring(curMatchedStr.length);
            if (!curStr) {
                break;
            }

            curMatchedStr = this.matchDiacriticsAThetPahsin(curStr);
        }

        const textFragment: TextFragment = {
            fragmentType: FragmentType.Letter,
            matchedStr,
            normalizedStr: ''
        };


        this.analyzeAndNormalizeTextFragment(textFragment);

        return textFragment;
    }

    private matchDiacriticsAThetPahsin(curStr: string): string | null {
        if (curStr[0] === '\u103F') {
            return curStr[0];
        }

        let m = curStr.match(this._diacriticRegExp);
        if (m == null) {
            m = curStr.match(this._aThetRegExp);
        }
        if (m == null) {
            m = curStr.match(this._pahsinRegExp);
        }

        if (m == null) {
            return null;
        }

        let matchedStr = m[0];

        if (matchedStr[matchedStr.length - 1] === '\u1039' && curStr.length > matchedStr.length) {
            matchedStr += curStr[matchedStr.length];
        }

        return matchedStr;
    }

    private analyzeAndNormalizeTextFragment(textFragment: TextFragment): void {
        for (let i = 0; i < textFragment.matchedStr.length; i++) {
            const c = textFragment.matchedStr[i];
            const cp = c.codePointAt(i) as number;

            if (!(cp >= 0x1000 && cp <= 0x109F) && (cp === 0x0020 || this._spaceRegExp.test(c))) {
                if (!textFragment.spaceIncluded) {
                    textFragment.spaceIncluded = true;
                    textFragment.normalizeReason = textFragment.normalizeReason || {};
                    textFragment.normalizeReason.removeSpace = true;
                }
            } else {
                if (cp === 0x1040) {
                    textFragment.normalizedStr += '\u101D';
                    textFragment.normalizeReason = textFragment.normalizeReason || {};
                    textFragment.normalizeReason.swapU1040ToU101D = true;
                } else if (cp === 0x1044 && i < textFragment.matchedStr.length - 2 &&
                    ((textFragment.matchedStr[i + 1] === '\u1004' && textFragment.matchedStr[i + 2] === '\u103A') ||
                        this._possibleLagaungRegExp.test(textFragment.matchedStr.substring(i)))) {
                    textFragment.normalizedStr += '\u104E';
                    textFragment.normalizeReason = textFragment.normalizeReason || {};
                    textFragment.normalizeReason.swapU1044ToU104E = true;
                } else {
                    textFragment.normalizedStr += c;
                }
            }
        }
    }
}
