import { NumberTextExtractor } from './number-text-extractor';
import { SingleCharTextExtractor } from './single-char-text-extractor';
import { TextExtractor } from './text-extractor';
import { TextFragment } from './text-fragment';

export class MyanmarTextExtractor implements TextExtractor {
    // // [\u103B\u103C]
    // //
    // // ကျှော် / ကျှော့ / ကျှော (Length: 4)
    // private readonly _d3bOr3c3e312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u103E\u1031\u102C[\u1037\u103A]?');
    // // ကျှေး / ကျှေ့ / ကျှေ (Length: 3)
    // private readonly _d3bOr3c3e31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103E\u1031[\u1037\u1038]?');

    // // ကျွေး / ကျွေ့ / ကျွေ (Length: 3)
    // private readonly _d3bOr3c3d31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103D\u1031[\u1037\u1038]?');

    // // ကျော် / ကျော့ / ကျော (Length: 3)
    // private readonly _d3bOr3c312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u1031\u102C[\u1037\u103A]?');
    // // ကျေး / ကျေ့ / ကျေ (Length: 2)
    // private readonly _d3bOr3c31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u1031[\u1037\u1038]?');

    constructor(
        private readonly _singleCharTextExtractor: SingleCharTextExtractor,
        private readonly _numberTextExtractor: NumberTextExtractor) { }

    extractNext(input: string, firstCp?: number): TextFragment | null {
        firstCp = firstCp == null ? input.codePointAt(0) : firstCp;
        if (!firstCp) {
            return null;
        }

        if (firstCp >= 0x1000 && firstCp <= 0x104F) {
            const singleCharTextFragment = this._singleCharTextExtractor.extractNext(input, firstCp);
            if (singleCharTextFragment != null) {
                return singleCharTextFragment;
            }
        }

        const numberGroupTextFragment = this._numberTextExtractor.extractNext(input, firstCp);
        if (numberGroupTextFragment != null) {
            return numberGroupTextFragment;
        }

        return null;
    }

    // private detectAndAppendTimePart(matchedStr: string, rightStr: string, extractInfo: DateExtractInfo): string | null {
    //     if (rightStr.length < 5) {
    //         return null;
    //     }

    //     let spaceStr = '';
    //     let trimedRightStr = rightStr;
    //     while (this._spaceRegExp.test(trimedRightStr[0])) {
    //         spaceStr += trimedRightStr[0];
    //         trimedRightStr = trimedRightStr.substring(1);
    //     }

    //     if (trimedRightStr.length < 5) {
    //         return null;
    //     }

    //     const m = trimedRightStr.match(this._dtTimeRegExp);
    //     if (m == null) {
    //         return null;
    //     }

    //     const timeMatchedStr = m[0];
    //     const timeExtractInfo = this.getDateExtractInfo(timeMatchedStr);
    //     if (timeExtractInfo == null) {
    //         return null;
    //     }

    //     const newMatchedStr = `${matchedStr}${spaceStr}${timeMatchedStr}`;
    //     extractInfo.spaceIncluded = true;
    //     extractInfo.normalizedStr += ' ' + timeExtractInfo.normalizedStr;

    //     if (spaceStr !== ' ') {
    //         extractInfo.normalizeReason = extractInfo.normalizeReason || {};
    //         extractInfo.normalizeReason.normalizeSpace = true;
    //     }

    //     if (timeExtractInfo.normalizeReason) {
    //         extractInfo.normalizeReason = {
    //             ...extractInfo.normalizeReason,
    //             ...timeExtractInfo.normalizeReason
    //         };
    //     }

    //     if (timeExtractInfo.invalidReason) {
    //         extractInfo.invalidReason = {
    //             ...extractInfo.invalidReason,
    //             ...timeExtractInfo.invalidReason
    //         };
    //     }

    //     return newMatchedStr;
    // }


    // private startsWithPossibleNumber(cp: number): boolean {
    //     if ((cp >= 0x1040 && cp <= 0x1049) || cp === 0x101D || cp === 0x104E) {
    //         return true;
    //     }

    //     return false;
    // }

    // private startsWithPossibleNumberOrBracket(cp: number): boolean {
    //     if (this.startsWithPossibleNumber(cp) || this.startsWithOpeningBracket(cp)) {
    //         return true;
    //     }

    //     return false;
    // }

    // private getFragmentForCombination(input: string, firstCp: number, curOptions: TextFragmenterOptions): TextFragment | null {
    //     if (!((firstCp >= 0x1000 && firstCp <= 0x1021) ||
    //         firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
    //         firstCp === 0x1029 || firstCp === 0x103F ||
    //         (firstCp >= 0x1040 && firstCp <= 0x1049) || firstCp === 0x104E)) {
    //         return null;
    //     }

    //     const normalizedTextFragment = this.getNormalizedFragmentForConsonantCombination(input, curOptions);

    //     if (input.length < 2) {
    //         return textFragment;
    //     }

    //     const testCp1 = input.codePointAt(1);
    //     if (!testCp1 ||
    //         !((testCp1 >= 0x102B && testCp1 <= 0x1032) ||
    //             (testCp1 >= 0x1036 && testCp1 <= 0x1038) ||
    //             (testCp1 >= 0x103A && testCp1 <= 0x103E))) {
    //         return textFragment;
    //     }

    //     if (input.length === 2) {
    //         textFragment.matchedString += input[1];
    //         textFragment.normalizedString += input[1];

    //         return textFragment;
    //     }

    //     const testCp2 = input.codePointAt(2);
    //     if (!testCp2 ||
    //         !((testCp2 >= 0x102B && testCp2 <= 0x1032) ||
    //             (testCp2 >= 0x1036 && testCp2 <= 0x1038) ||
    //             (testCp2 >= 0x103A && testCp2 <= 0x103E))) {
    //         textFragment.matchedString += input[1];
    //         textFragment.normalizedString += input[1];

    //         return textFragment;
    //     }

    //     const curStr = input.substring(1);

    //     if (testCp1 === 0x103B || testCp1 === 0x103C) {
    //         const matchedStr = this.matchU103BOrU103CStart(curStr);
    //         if (matchedStr != null) {
    //             textFragment.matchedString += matchedStr;
    //             textFragment.normalizedString += matchedStr;

    //             return textFragment;
    //         }
    //     }

    //     return textFragment;
    // }

    // private matchU103BOrU103CStart(curStr: string): string | null {
    //     const curStrLen = curStr.length;

    //     if (curStrLen >= 4 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3e312cO37Or3aRegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3e31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u103D' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3d31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u1031' && curStr[2] === '\u102C') {
    //         const m = curStr.match(this._d3bOr3c312cO37Or3aRegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 2 && curStr[1] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     }

    //     return null;
    // }
}
