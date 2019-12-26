import { TextFragment } from './text-fragment';
import { TextFragmenterOptions } from './text-fragmenter-options';

export class MyanmarTextFragmenter {
    private readonly _options: TextFragmenterOptions;

    private readonly _aThetRegExp = new RegExp('^[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]*[\u1000-\u1021\u1023\u1025\u1027\u103F\u1040\u1048]\u103A[\u103B\u103C]?[\u102B\u102C]?[\u1037\u1038]?');

    constructor(options?: TextFragmenterOptions) {
        this._options = options || {};
    }

    getNextFragment(input: string, options?: TextFragmenterOptions): TextFragment | null {
        const firstC = input[0];
        // ဤ / ဪ / ၊ / ။ / ၌ / ၍ / ၏
        if (firstC === '\u1024' || firstC === '\u102A' ||
            firstC === '\u104A' || firstC === '\u104B' ||
            firstC === '\u104C' || firstC === '\u104D' || firstC === '\u104F') {
            return {
                matchedString: firstC,
                normalizedString: firstC
            };
        }

        const fCp = firstC.codePointAt(0);
        if (!fCp) {
            return null;
        }

        const curOptions = options || this._options;

        if ((fCp >= 0x102B && fCp <= 0x103E) && !curOptions.noInvalidStart) {
            return this.getNextRawFragment(input.substring(1), curOptions, {
                matchedString: firstC,
                normalizedString: firstC,
                error: {
                    invalidUnicodeForm: true,
                    invalidStart: true
                }
            });
        }

        if (!((fCp >= 0x1000 && fCp <= 0x1021) || fCp === 0x1023 ||
            (fCp >= 0x1025 && fCp <= 0x1027) || fCp === 0x1029 || fCp === 0x103F || fCp === 0x104E)) {
            return null;
        }

        return null;
    }

    private getNextRawFragment(curStr: string, curOptions: TextFragmenterOptions, textFragment: TextFragment): TextFragment | null {
        let tmpSpace = '';

        while (curStr.length > 0) {
            const c = curStr[0];
            const cp = c.codePointAt(0);

            if (!cp) {
                break;
            }

            if (cp >= 0x102B && cp <= 0x103E) {
                textFragment.matchedString += tmpSpace + c;
                textFragment.normalizedString += c;
                if (tmpSpace.length > 0) {
                    textFragment.error = textFragment.error || {};
                    textFragment.error.spaceIncluded = true;
                    tmpSpace = '';
                }

                curStr = curStr.substring(1);
                continue;
            }

            if ((cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || cp === 0x180E || (cp >= 0x2000 && cp <= 0x200B) ||
                cp === 0x202F || cp === 0x205F || cp === 0x3000 || cp === 0xFEFF)) {
                if (!curOptions.noSpaceBetween) {
                    tmpSpace += c;
                    curStr = curStr.substring(1);
                    continue;
                }

                break;
            }

            const prevC = textFragment.normalizedString[textFragment.normalizedString.length - 1];

            // Check char after Kinsi \u103A\u1039
            if (prevC === '\u1039' && textFragment.normalizedString.length > 1 &&
                textFragment.normalizedString[textFragment.normalizedString.length - 2] === '\u103A' &&
                ((cp >= 0x1000 && cp <= 0x102A) || cp === 0x103F || (cp >= 0x1040 && cp <= 0x1049) || cp === 0x104E)) {
                textFragment.matchedString += tmpSpace + c;
                textFragment.normalizedString += c;
                if (tmpSpace.length > 0) {
                    textFragment.error = textFragment.error || {};
                    textFragment.error.spaceIncluded = true;
                    tmpSpace = '';
                }

                curStr = curStr.substring(1);
                continue;
            }

            // Check char after \u1039
            if (prevC === '\u1039' && ((cp >= 0x1000 && cp <= 0x1022) || cp === 0x1027 || cp === 0x103F)) {
                textFragment.matchedString += tmpSpace + c;
                textFragment.normalizedString += c;
                if (tmpSpace.length > 0) {
                    textFragment.error = textFragment.error || {};
                    textFragment.error.spaceIncluded = true;
                    tmpSpace = '';
                }

                curStr = curStr.substring(1);
                continue;
            }

            const aThatMatch = curStr.trim().length > 1 ? curStr.match(this._aThetRegExp) : null;
            if (aThatMatch != null) {
                const matchedStr = aThatMatch[0];
                textFragment.matchedString += tmpSpace + matchedStr;
                textFragment.normalizedString += c;
                if (tmpSpace.length > 0) {
                    textFragment.error = textFragment.error || {};
                    textFragment.error.spaceIncluded = true;
                    tmpSpace = '';
                }

                curStr = curStr.substring(matchedStr.length);
                continue;
            }

            break;
        }

        return textFragment.matchedString ? textFragment : null;
    }
}
