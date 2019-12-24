import { MyanmarTextFragmenterOptions } from './myanmar-text-fragmenter-options';
import { TextFragment } from './text-fragment';

export class MyanmarTextFragmenter {
    private readonly _options: MyanmarTextFragmenterOptions = {};
    private readonly _aThetRegExp = new RegExp('^[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]*[\u1000-\u1021\u1023\u1025\u1027\u103F\u1040\u1048]\u103A[\u103B\u103C]?[\u102B\u102C]?[\u1037\u1038]?');

    constructor(options?: MyanmarTextFragmenterOptions) {
        this._options = { ...options };
    }

    getNextFragment(input: string, options?: MyanmarTextFragmenterOptions): TextFragment | null {
        const firstC = input[0];
        // ဤ / ဪ / ၌ / ၊ / ။ / ၍ / ၏
        if (firstC === '\u1024' || firstC === '\u102A' ||
            firstC === '\u104A' || firstC === '\u104B' ||
            firstC === '\u104C' || firstC === '\u104D' || firstC === '\u104F') {
            return {
                matchedString: firstC,
                standaloneLetter: true
            };
        }

        const fCp = firstC.codePointAt(0);

        if (!fCp || !((fCp >= 0x1000 && fCp <= 0x1021) || fCp === 0x1023 ||
            (fCp >= 0x1025 && fCp <= 0x1027) || fCp === 0x1029 || fCp === 0x103F || fCp === 0x104E)) {
            return null;
        }

        return null;
    }

    getNextNonGrammarFragment(input: string, options?: MyanmarTextFragmenterOptions): TextFragment | null {
        let curStr = input;
        let tmpSpace = '';
        let trimedMatchedStr = '';
        const curOptions = options || this._options;

        const textFragment: TextFragment = {
            matchedString: ''
        };

        while (curStr.length > 0) {
            const c = curStr[0];
            const cp = c.codePointAt(0);
            if (!cp) {
                break;
            }

            if (cp >= 0x102B && cp <= 0x103E) {
                textFragment.matchedString += tmpSpace + c;
                trimedMatchedStr += c;
                if (tmpSpace) {
                    textFragment.spaceIncluded = true;
                }

                tmpSpace = '';
                curStr = curStr.substring(1);
                continue;
            }

            if ((cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || cp === 0x180E || (cp >= 0x2000 && cp <= 0x200B) ||
                cp === 0x202F || cp === 0x205F || cp === 0x3000 || cp === 0xFEFF)) {
                if (curOptions.allowSpacesBetween && !tmpSpace) {
                    tmpSpace = c;
                    curStr = curStr.substring(1);
                    continue;
                }

                break;
            }

            const prevC = trimedMatchedStr.length > 0 ? trimedMatchedStr[trimedMatchedStr.length - 1] : '';

            // Check char after Kinsi \u103A\u1039
            if (prevC === '\u1039' && trimedMatchedStr.length > 1 && trimedMatchedStr[trimedMatchedStr.length - 2] === '\u103A' &&
                ((cp >= 0x1000 && cp <= 0x102A) || cp === 0x103F || (cp >= 0x1040 && cp <= 0x1049) || cp === 0x104E)) {
                textFragment.matchedString += tmpSpace + c;
                trimedMatchedStr += c;
                if (tmpSpace) {
                    textFragment.spaceIncluded = true;
                }

                tmpSpace = '';
                curStr = curStr.substring(1);
                continue;
            }

            // Check char after Pahsin \u1039
            if (prevC === '\u1039' && ((cp >= 0x1000 && cp <= 0x1022) || cp === 0x1027 || cp === 0x103F)) {
                textFragment.matchedString += tmpSpace + c;
                trimedMatchedStr += c;
                if (tmpSpace) {
                    textFragment.spaceIncluded = true;
                }

                tmpSpace = '';
                curStr = curStr.substring(1);
                continue;
            }

            const aThatMatch = curStr.trim().length > 1 ? curStr.match(this._aThetRegExp) : null;
            if (aThatMatch != null) {
                const matchedStr = aThatMatch[0];
                textFragment.matchedString += tmpSpace + matchedStr;
                trimedMatchedStr += matchedStr;
                if (tmpSpace) {
                    textFragment.spaceIncluded = true;
                }

                tmpSpace = '';
                curStr = curStr.substring(matchedStr.length);
                continue;
            }

            break;
        }

        return textFragment.matchedString ? textFragment : null;
    }
}
