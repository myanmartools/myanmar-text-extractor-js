import { TextFragment } from './text-fragment';
import { TextFragmenterOptions } from './text-fragmenter-options';

export class MyanmarTextFragmenter {
    private readonly _options: TextFragmenterOptions;

    // [\u103B\u103C]
    //
    // ကျှော် / ကျှော့ / ကျှော (Length: 4)
    private readonly _d3bOr3c3e312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u103E\u1031\u102C[\u1037\u103A]?');
    // ကျှေး / ကျှေ့ / ကျှေ (Length: 3)
    private readonly _d3bOr3c3e31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103E\u1031[\u1037\u1038]?');

    // ကျွေး / ကျွေ့ / ကျွေ (Length: 3)
    private readonly _d3bOr3c3d31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103D\u1031[\u1037\u1038]?');

    // ကျော် / ကျော့ / ကျော (Length: 3)
    private readonly _d3bOr3c312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u1031\u102C[\u1037\u103A]?');
    // ကျေး / ကျေ့ / ကျေ (Length: 2)
    private readonly _d3bOr3c31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u1031[\u1037\u1038]?');

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

        const firstCp = firstC.codePointAt(0);
        if (!firstCp) {
            return null;
        }

        const curOptions = options || this._options;

        // if ((fCp >= 0x102B && fCp <= 0x103E) && !curOptions.noInvalidStart) {
        //     return this.getNextFragmentCore(input.substring(1), curOptions, {
        //         matchedString: firstC,
        //         normalizedString: firstC,
        //         error: {
        //             invalidUnicodeForm: true,
        //             invalidStart: true
        //         }
        //     });
        // }

        return this.getConsonantCombination(input, firstCp, curOptions);
    }

    // private getNextFragmentCore(curStr: string, curOptions: TextFragmenterOptions, textFragment: TextFragment): TextFragment | null {
    //     let tmpSpace = '';

    //     while (curStr.length > 0) {
    //         const c = curStr[0];
    //         const cp = c.codePointAt(0);

    //         if (!cp) {
    //             break;
    //         }

    //         if (cp >= 0x102B && cp <= 0x103E) {
    //             textFragment.matchedString += tmpSpace + c;
    //             textFragment.normalizedString += c;
    //             if (tmpSpace.length > 0) {
    //                 textFragment.error = textFragment.error || {};
    //                 textFragment.error.spaceIncluded = true;
    //                 tmpSpace = '';
    //             }

    //             curStr = curStr.substring(1);
    //             continue;
    //         }

    //         if ((cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || cp === 0x180E || (cp >= 0x2000 && cp <= 0x200B) ||
    //             cp === 0x202F || cp === 0x205F || cp === 0x3000 || cp === 0xFEFF)) {
    //             if (!curOptions.noSpaceBetween) {
    //                 tmpSpace += c;
    //                 curStr = curStr.substring(1);
    //                 continue;
    //             }

    //             break;
    //         }

    //         const prevC = textFragment.normalizedString[textFragment.normalizedString.length - 1];

    //         // Check char after Kinsi \u103A\u1039
    //         if (prevC === '\u1039' && textFragment.normalizedString.length > 1 &&
    //             textFragment.normalizedString[textFragment.normalizedString.length - 2] === '\u103A' &&
    //             ((cp >= 0x1000 && cp <= 0x102A) || cp === 0x103F || (cp >= 0x1040 && cp <= 0x1049) || cp === 0x104E)) {
    //             textFragment.matchedString += tmpSpace + c;
    //             textFragment.normalizedString += c;
    //             if (tmpSpace.length > 0) {
    //                 textFragment.error = textFragment.error || {};
    //                 textFragment.error.spaceIncluded = true;
    //                 tmpSpace = '';
    //             }

    //             curStr = curStr.substring(1);
    //             continue;
    //         }

    //         // Check char after \u1039
    //         if (prevC === '\u1039' && ((cp >= 0x1000 && cp <= 0x1022) || cp === 0x1027 || cp === 0x103F)) {
    //             textFragment.matchedString += tmpSpace + c;
    //             textFragment.normalizedString += c;
    //             if (tmpSpace.length > 0) {
    //                 textFragment.error = textFragment.error || {};
    //                 textFragment.error.spaceIncluded = true;
    //                 tmpSpace = '';
    //             }

    //             curStr = curStr.substring(1);
    //             continue;
    //         }

    //         const aThatMatch = curStr.trim().length > 1 ? curStr.match(this._aThetRegExp) : null;
    //         if (aThatMatch != null) {
    //             const matchedStr = aThatMatch[0];
    //             textFragment.matchedString += tmpSpace + matchedStr;
    //             textFragment.normalizedString += c;
    //             if (tmpSpace.length > 0) {
    //                 textFragment.error = textFragment.error || {};
    //                 textFragment.error.spaceIncluded = true;
    //                 tmpSpace = '';
    //             }

    //             curStr = curStr.substring(matchedStr.length);
    //             continue;
    //         }

    //         break;
    //     }

    //     return textFragment.matchedString ? textFragment : null;
    // }

    private getConsonantCombination(input: string, firstCp: number, curOptions: TextFragmenterOptions): TextFragment | null {
        if (!((firstCp >= 0x1000 && firstCp <= 0x1021) ||
            firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
            firstCp === 0x1029 || firstCp === 0x104E)) {
            return null;
        }

        const firstC = input[0];
        const textFragment: TextFragment = {
            matchedString: firstC,
            normalizedString: firstC
        };

        const inputLen = input.length;

        if (inputLen < 2) {
            return textFragment;
        }

        const testCp1 = input.codePointAt(1);
        if (!testCp1 ||
            !((testCp1 >= 0x102B && testCp1 <= 0x1032) ||
                (testCp1 >= 0x1036 && testCp1 <= 0x1038) ||
                (testCp1 >= 0x103A && testCp1 <= 0x103E))) {
            return textFragment;
        }

        if (inputLen === 2) {
            textFragment.matchedString += input[1];
            textFragment.normalizedString += input[1];

            return textFragment;
        }

        const testCp2 = input.codePointAt(2);
        if (!testCp2 ||
            !((testCp2 >= 0x102B && testCp2 <= 0x1032) ||
                (testCp2 >= 0x1036 && testCp2 <= 0x1038) ||
                (testCp2 >= 0x103A && testCp2 <= 0x103E))) {
            textFragment.matchedString += input[1];
            textFragment.normalizedString += input[1];

            return textFragment;
        }

        const curStr = input.substring(1);

        if (testCp1 === 0x103B || testCp1 === 0x103C) {
            const matchedStr = this.matchU103BOrU103CStart(curStr);
            if (matchedStr != null) {
                textFragment.matchedString += matchedStr;
                textFragment.normalizedString += matchedStr;
            }
        }

        return textFragment;
    }

    private matchU103BOrU103CStart(curStr: string): string | null {
        const curStrLen = curStr.length;

        if (curStrLen >= 4 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
            const m = curStr.match(this._d3bOr3c3e312cO37Or3aRegExp);
            if (m != null) {
                return m[0];
            }
        } else if (curStrLen >= 3 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
            const m = curStr.match(this._d3bOr3c3e31O37Or38RegExp);
            if (m != null) {
                return m[0];
            }
        } else if (curStrLen >= 3 && curStr[1] === '\u103D' && curStr[2] === '\u1031') {
            const m = curStr.match(this._d3bOr3c3d31O37Or38RegExp);
            if (m != null) {
                return m[0];
            }
        } else if (curStrLen >= 3 && curStr[1] === '\u1031' && curStr[2] === '\u102C') {
            const m = curStr.match(this._d3bOr3c312cO37Or3aRegExp);
            if (m != null) {
                return m[0];
            }
        } else if (curStrLen >= 2 && curStr[1] === '\u1031') {
            const m = curStr.match(this._d3bOr3c31O37Or38RegExp);
            if (m != null) {
                return m[0];
            }
        }

        return null;
    }
}
