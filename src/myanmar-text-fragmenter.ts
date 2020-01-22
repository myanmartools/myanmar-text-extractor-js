import { FragmentType } from './fragment-type';
import { InvalidReason } from './invalid-reason';
import { NormalizationReason } from './normalization-reason';
import { TextFragment } from './text-fragment';

interface NormalizedTextInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceDetected?: boolean;
    invisibleSpaceIncluded?: boolean;
}

interface NumberExtractInfo {
    normalizedStr: string;
    numberStr: string;
    digitCount: number;
    u101dCount: number;
    u104eCount: number;
    separatorCount: number;
    spaceDetected?: boolean;
    invisibleSpaceIncluded?: boolean;
}

interface PhoneNumberExtractInfo {
    normalizedStr: string;
    spaceDetected?: boolean;
    normalizationReason?: NormalizationReason;
    invalidReason?: InvalidReason;
}

interface DateExtractInfo {
    normalizedStr: string;
    spaceDetected?: boolean;
    dateSeparator?: string;
    dateFormat?: string;
    normalizationReason?: NormalizationReason;
    invalidReason?: InvalidReason;
}

interface TextFragmentPartial {
    matchedStr: string;
    normalizedStr: string;

    spaceDetected?: boolean;
    invisibleSpaceIncluded?: boolean;

    numberStr?: string;
    ancientMeasureWords?: string[];
    numberOrderList?: boolean;
}

// \uFF0D\u2010-\u2015\u2212\u002F\uFF0F\u002E\uFF0E
// \u3000\u2060

export class MyanmarTextFragmenter {
    private readonly _visibleSpace = ' \u00A0\u1680\u2000-\u2009\u202F\u205F\u3000';
    private readonly _invisibleSpace = '\u00AD\u180E\u200A\u200B\u2060\uFEFF';
    private readonly _space = `${this._visibleSpace}${this._invisibleSpace}`;
    private readonly _spaceRegExp = new RegExp(`[${this._space}]`);

    private readonly _possibleDigits = '\u1040-\u1049\u101D\u104E';

    // \u002E\u00B7\u02D9
    private readonly _digitSeparator1 = `\u002C\u066B\u066C\u2396\u005F\u0027${this._visibleSpace}`;

    private readonly _visibleSpaceRegExp = new RegExp(`[${this._visibleSpace}]`);
    private readonly _invisibleSpaceRegExp = new RegExp(`[${this._invisibleSpace}]`);

    // private readonly _options: TextFragmenterOptions;
    private readonly _hsethaRegExp = new RegExp(`^[(\uFF08][${this._space}]?[\u1041-\u1049\u104E][${this._space}]?[)\uFF09][${this._space}]?\u1040\u102D`);

    private readonly _numberBoxRegExp = new RegExp(`^[(\\[\uFF08\uFF3B][${this._space}]?[\u101D\u1040-\u1049\u104E]+[${this._space}]?[)\\]\uFF09\uFF3D]`);
    private readonly _orderListRegExp = new RegExp(`^[\u101D\u1040-\u1049\u104E]+[${this._space}]?[\u104A\u104B]`);
    private readonly _numberGroup1Regex = new RegExp(`^[\u1040-\u1049\u101D\u104E]{1,3}([${this._digitSeparator1}][\u1040-\u1049\u101D\u104E]{2,4})*([\u002E\u00B7][\u1040-\u1049\u101D\u104E]+)?`);

    // -/._
    private readonly _dtOrPhSeparator = '\\-/._~\u104A\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F\u2053\u223C\uFF5E';

    // Date
    private readonly _dtYear2DigitsPattern = `[\u1041\u1042][${this._possibleDigits}]`;
    private readonly _dtYearPattern = `[\u1041\u1042][${this._possibleDigits}]{3,3}`;
    private readonly _dtMonth1DigitPattern = '[\u1041-\u1049\u104E]';
    private readonly _dtMonthPattern = `\u1041[\u1040-\u1042\u101D]|[\u1040\u101D][\u1041-\u1049\u104E]|${this._dtMonth1DigitPattern}`;
    private readonly _dtDay1DigitPattern = '[\u1041-\u1049\u104E]';
    private readonly _dtDayPattern = `[\u1041-\u1042][${this._possibleDigits}]|\u1043[\u1040-\u1041\u101D]|[\u1040\u101D][\u1041-\u1049\u104E]|${this._dtDay1DigitPattern}`;
    // private readonly _dtHourPattern = `[\u1040\u1041\u101D][${this._possibleDigits}]|\u1042[\u1040-\u1043]|[\u1041-\u1049\u104E]`;
    // private readonly _dtMinuteSecondPattern = `[\u1040-\u1045\u101D\u104E][${this._possibleDigits}]|[\u1041-\u1049\u104E]`;

    private readonly _dtDateQuickRegExp = new RegExp(`^(?:[${this._possibleDigits}]{1,4})[${this._dtOrPhSeparator}${this._space}]*(?:[${this._possibleDigits}]{1,2})[${this._dtOrPhSeparator}${this._space}]*(?:[${this._possibleDigits}]{1,4})`);
    private readonly _dtDMYRegExp = new RegExp(`^(?:${this._dtDayPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtMonthPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtYearPattern})`);
    private readonly _dtDMYWith2DigitYearRegExp = new RegExp(`^(?:${this._dtDayPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtMonthPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtYear2DigitsPattern})`);
    private readonly _dtYMDRegExp = new RegExp(`^(?:${this._dtYearPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtMonthPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtDayPattern})`);
    private readonly _dtMDYRegExp = new RegExp(`^(?:${this._dtMonthPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtDayPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtYearPattern})`);
    private readonly _dtMDYWith2DigitYearRegExp = new RegExp(`^(?:${this._dtMonthPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtDayPattern})[${this._dtOrPhSeparator}${this._space}]{1,3}(?:${this._dtYear2DigitsPattern})`);
    private readonly _dtYMDIsoRegExp = new RegExp(`^(?:[\u1041\u1042][${this._possibleDigits}]{3,3})(?:[\u1040\u101D][\u1041-\u1049\u104E]|\u1041[\u1040-\u1042\u101D])(?:[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1042][${this._possibleDigits}]|\u1043[\u1040-\u1041\u101D])`);
    // private readonly _dtTimeRegExp = new RegExp(`^(?:${this._dtHourPattern})[${this._space}]?:[${this._space}]?(?:${this._dtMinuteSecondPattern})(?:[${this._space}]?:[${this._space}]?${this._dtMinuteSecondPattern})?`);

    // Phone Number
    private readonly _phPlus = '+\uFF0B';
    private readonly _phSeparator = `${this._dtOrPhSeparator}()\\[\\]\uFF08\uFF09\uFF3B\uFF3D`;
    private readonly _phStar = '*';
    private readonly _phRegExp = new RegExp(`^[${this._phPlus}]?(?:[${this._phSeparator}${this._space}${this._phStar}]*[${this._possibleDigits}]){3,}#?`);

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

    // constructor(options?: TextFragmenterOptions) {
    //     this._options = options || {};
    // }

    getNextFragment(input: string, prevFragments?: TextFragment[]): TextFragment | null {
        const firstCp = input.codePointAt(0);
        if (!firstCp) {
            return null;
        }

        const punctuationOrSingleCharAlphabetFragment = this.getPunctuationOrSingleCharAlphabetFragment(input, firstCp);
        if (punctuationOrSingleCharAlphabetFragment != null) {
            return punctuationOrSingleCharAlphabetFragment;
        }

        const numberDateOrPhoneNumberFragment = this.getNumberDateOrPhoneNumberFragment(input, firstCp, prevFragments);
        if (numberDateOrPhoneNumberFragment != null) {
            return numberDateOrPhoneNumberFragment;
        }

        return null;
    }

    private getPunctuationOrSingleCharAlphabetFragment(input: string, firstCp: number): TextFragment | null {
        // ဤ / ဪ / Single letter length
        if (firstCp === 0x1024 || firstCp === 0x102A ||
            (input.length === 1 && ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029 || firstCp === 0x103F || firstCp === 0x104E))) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                fragmentType: FragmentType.Alphabet
            };
        }

        // ၌ / ၍ / ၏ / ၊ / ။
        if (firstCp === 0x104C || firstCp === 0x104D || firstCp === 0x104F ||
            firstCp === 0x104A || firstCp === 0x104B) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                fragmentType: FragmentType.Punctuation
            };
        }

        return null;
    }

    private getNumberDateOrPhoneNumberFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        const inputLen = input.length;
        const isStartsWithNumber = firstCp >= 0x1040 && firstCp <= 0x1049;
        const isStartsWithPossibleNumber = !isStartsWithNumber && (firstCp === 0x101D || firstCp === 0x104E);

        if (isStartsWithNumber || isStartsWithPossibleNumber) {
            if (inputLen === 1 && isStartsWithPossibleNumber) {
                return null;
            }

            if (inputLen > 5) {
                const dateFragment = this.getDateFragment(input);
                if (dateFragment != null) {
                    return dateFragment;
                }
            }

            if (inputLen > 2) {
                const phoneFragment = this.getPhoneFragment(input, firstCp);
                const digitGroupFragment = this.getDigitGroupFragment(input);

                if (phoneFragment != null && digitGroupFragment != null) {
                    return digitGroupFragment.matchedStr.length > phoneFragment.matchedStr.length ?
                        digitGroupFragment : phoneFragment;
                }

                if (phoneFragment != null) {
                    return phoneFragment;
                }

                return digitGroupFragment;
            }

            const orderListFragment = this.getNumberWithBracketsOrOrderListFragment(input, firstCp, prevFragments);
            if (orderListFragment != null) {
                return orderListFragment;
            }

            return this.getDigitGroupFragment(input);
        }

        if (input.length === 1 && (firstCp >= 0x1040 && firstCp <= 0x1049)) {
            return {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };
        }

        if (inputLen > 3 && firstCp === 0x1004) {
            const ingaTinOrTaungAncientNumberFragment = this.getIngaTinOrTaungAncientNumberFragment(input, firstCp);
            if (ingaTinOrTaungAncientNumberFragment != null) {
                return ingaTinOrTaungAncientNumberFragment;
            }
        }

        if (inputLen > 3 && (firstCp === 0x002A || firstCp === 0x002B || firstCp === 0xFF0B)) {
            const phoneFragment = this.getPhoneFragment(input, firstCp);
            if (phoneFragment != null) {
                return phoneFragment;
            }
        }

        if (inputLen > 2 && (firstCp === 0x0028 || firstCp === 0xFF08 || firstCp === 0x005B || firstCp === 0xFF3B)) {
            const bracketPrefixFragment = this.getBracketPrefixFragment(input, firstCp);
            if (bracketPrefixFragment != null) {
                return bracketPrefixFragment;
            }
        }

        return null;
    }

    private getBracketPrefixFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        const hsethaFragment = this.getNumberHsethaFragment(input, firstCp);
        if (hsethaFragment != null) {
            return hsethaFragment;
        }

        const phoneNumberFragment = this.getPhoneFragment(input, firstCp);
        const boxNumberFragment = this.getNumberWithBracketsOrOrderListFragment(input, firstCp, prevFragments);

        if (phoneNumberFragment != null && boxNumberFragment != null) {
            return phoneNumberFragment.matchedStr.length > boxNumberFragment.matchedStr.length ?
                phoneNumberFragment : boxNumberFragment;
        } else if (phoneNumberFragment != null) {
            return phoneNumberFragment;
        } else if (boxNumberFragment != null) {
            return boxNumberFragment;
        } else {
            return null;
        }
    }

    private getPhoneFragment(input: string, firstCp: number): TextFragment | null {
        if (input.length < 3 || !this.startsWithPossibleNumberOrBracket(firstCp)) {
            return null;
        }

        const m = input.match(this._phRegExp);
        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        const extractInfo = this.getPhoneExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        return {
            matchedStr,
            fragmentType: FragmentType.PossiblePhoneNumber,
            ...extractInfo
        };
    }

    private getDateFragment(input: string): TextFragment | null {
        if (!this._dtDateQuickRegExp.test(input)) {
            return null;
        }

        let monthStart = false;
        let m = input.match(this._dtDMYRegExp);
        if (m == null) {
            m = input.match(this._dtYMDRegExp);
        }

        if (m == null) {
            m = input.match(this._dtMDYRegExp);
            if (m != null) {
                monthStart = true;
            }
        }

        if (m == null && input.length > 7) {
            m = input.match(this._dtYMDIsoRegExp);
        }

        if (m == null) {
            m = input.match(this._dtDMYWith2DigitYearRegExp);
        }

        if (m == null) {
            m = input.match(this._dtMDYWith2DigitYearRegExp);
            if (m != null) {
                monthStart = true;
            }
        }

        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        const rightStr = input.substring(matchedStr.length);
        if (!this.isRightStrSafeForDateOrPhoneNumber(rightStr)) {
            return null;
        }

        const extractInfo = this.getDateExtractInfo(matchedStr, monthStart);
        if (extractInfo == null) {
            return null;
        }

        if (rightStr.length > 1 && (this._spaceRegExp.test(rightStr[0]))) {
            const cp = rightStr.codePointAt(1);
            if (extractInfo.spaceDetected && cp && cp >= 0x1040 && cp <= 0x1049) {
                return null;
            }
        }

        return {
            matchedStr,
            fragmentType: FragmentType.PossibleDate,
            ...extractInfo
        };
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
    //     extractInfo.spaceDetected = true;
    //     extractInfo.normalizedStr += ' ' + timeExtractInfo.normalizedStr;

    //     if (spaceStr !== ' ') {
    //         extractInfo.normalizationReason = extractInfo.normalizationReason || {};
    //         extractInfo.normalizationReason.normalizeSpace = true;
    //     }

    //     if (timeExtractInfo.normalizationReason) {
    //         extractInfo.normalizationReason = {
    //             ...extractInfo.normalizationReason,
    //             ...timeExtractInfo.normalizationReason
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

    private getIngaTinOrTaungAncientNumberFragment(input: string, firstCp: number): TextFragment | null {
        const ingaFragment = this.getNumberIngaFragment(input, firstCp);
        if (ingaFragment != null) {
            return ingaFragment;
        }

        return this.getNumberTinOrTaungFragment(input, firstCp);
    }

    /**
     * Get ancient 'အင်္ဂါ' number fragment - e.g. \u1004\u103A\u1039\u1041\u102B င်္၁ါ - (၁)အင်္ဂါ
     */
    private getNumberIngaFragment(input: string, firstCp: number): TextFragment | null {
        if (firstCp !== 0x1004 || input.length < 5) {
            return null;
        }

        if (input[1] !== '\u103A' || input[2] !== '\u1039') {
            return null;
        }

        const c4 = input[3];
        const c4Cp = c4.codePointAt(0);
        if (!c4Cp || !(c4Cp >= 0x1040 && c4Cp <= 0x1049)) {
            return null;
        }

        let matchedStr = input.substring(0, 4);
        let normalizedStr = matchedStr;
        let spaceDetected: boolean | undefined;

        if (input[4] !== '\u102B') {
            if (input.length < 6 || input[5] !== '\u102B' || !this._spaceRegExp.test(input[4])) {
                return null;
            }

            matchedStr += input[4] + input[5];
            normalizedStr += input[5];
            spaceDetected = true;
        } else {
            matchedStr += input[4];
            normalizedStr += input[4];
        }

        const rightStr = input.substring(matchedStr.length);
        const rFirstCp = rightStr ? rightStr.codePointAt(0) : undefined;
        if (rFirstCp && rFirstCp >= 0x102B && rFirstCp <= 0x103E) {
            return null;
        }

        const numberFragment: TextFragment = {
            matchedStr,
            normalizedStr,
            fragmentType: FragmentType.Number,
            ancientWrittenForm: true,
            numberStr: c4,
            // အင်္ဂါ
            ancientMeasureWords: ['\u1021\u1004\u103A\u1039\u1002\u102B']
        };

        if (spaceDetected) {
            numberFragment.spaceDetected = true;
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidSpaceIncluded = true;
            numberFragment.invalidReason.invalidUnicodeForm = true;
        }

        return numberFragment;
    }

    /**
     * Get ancient `တင်း` / `တောင်း` number fragment - e.g. \u1004\u103A\u1039\u1041 င်္၁ - (၁)တင်း / (၁)တောင်း
     */
    private getNumberTinOrTaungFragment(input: string, firstCp: number): TextFragment | null {
        if (firstCp !== 0x1004 || input.length < 4) {
            return null;
        }

        if (input[1] !== '\u103A' || input[2] !== '\u1039') {
            return null;
        }

        const c4 = input[3];
        const c4Cp = c4.codePointAt(0);
        if (!c4Cp || !(c4Cp >= 0x1040 && c4Cp <= 0x1049)) {
            return null;
        }

        const matchedStr = input.substring(0, 4);

        const rightStr = input.substring(matchedStr.length);
        const rFirstCp = rightStr ? rightStr.codePointAt(0) : undefined;
        if (rFirstCp && rFirstCp >= 0x102B && rFirstCp <= 0x103E) {
            return null;
        }

        let ancientMeasureWords: string[];
        if (rightStr && rightStr.trimLeft().startsWith('\u1010\u1031\u102C\u1004\u103A\u1038')) {
            ancientMeasureWords = ['\u1010\u1031\u102C\u1004\u103A\u1038'];
        } else if (rightStr && rightStr.trimLeft().startsWith('\u1010\u1004\u103A\u1038')) {
            ancientMeasureWords = ['\u1010\u1004\u103A\u1038'];
        } else {
            ancientMeasureWords = [
                '\u1010\u1031\u102C\u1004\u103A\u1038',
                '\u1010\u1004\u103A\u1038'
            ];
        }

        return {
            matchedStr,
            normalizedStr: matchedStr,
            fragmentType: FragmentType.Number,
            ancientWrittenForm: true,
            numberStr: c4,
            // အင်္ဂါ
            ancientMeasureWords
        };
    }

    /**
     * Get ancient `ဆယ်သား` number fragment - e.g. \u0028\u1041\u0029\u1040\u102D (၁)၀ိ - (၁)ဆယ်သား.
     */
    private getNumberHsethaFragment(input: string, firstCp: number): TextFragment | null {
        if (!(firstCp === 0x0028 || firstCp === 0xFF08) || input.length < 5) {
            return null;
        }

        const m = input.match(this._hsethaRegExp);
        if (m == null) {
            return null;
        }

        // TODO: For \uFF08 and \uFF09
        const matchedStr = m[0];

        const rightStr = input.substring(matchedStr.length);
        const rFirstCp = rightStr ? rightStr.codePointAt(0) : undefined;
        if (rFirstCp && rFirstCp >= 0x102B && rFirstCp <= 0x103E) {
            return null;
        }

        const normalizedTextInfo = this.getNormalizedTextInfo(matchedStr, undefined, true);
        let normalizedStr = normalizedTextInfo.normalizedStr;

        const numberExtractInfo = this.getNumberExtractInfo(normalizedStr);
        normalizedStr = numberExtractInfo.normalizedStr;

        const numberFragment: TextFragment = {
            matchedStr,
            normalizedStr,
            fragmentType: FragmentType.Number,
            ancientWrittenForm: true,
            numberStr: numberExtractInfo.numberStr,
            // ဆယ်သား
            ancientMeasureWords: ['\u1006\u101A\u103A\u101E\u102C\u1038']
        };

        if (numberExtractInfo.u104eCount) {
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        if (normalizedTextInfo && (normalizedTextInfo.spaceDetected || normalizedTextInfo.invisibleSpaceIncluded)) {
            numberFragment.spaceDetected = true;
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidSpaceIncluded = true;
        }

        return numberFragment;
    }

    private getNumberWithBracketsOrOrderListFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        let m: RegExpMatchArray | null;
        if (this.startsWithOpeningBracket(firstCp)) {
            m = input.match(this._numberBoxRegExp);
        } else {
            m = input.match(this._orderListRegExp);
        }

        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        const numberExtractInfo = this.getNumberExtractInfo(matchedStr);

        if (numberExtractInfo.u101dCount && !numberExtractInfo.digitCount) {
            return null;
        }

        if (numberExtractInfo.u104eCount && numberExtractInfo.numberStr === '\u1044') {
            if (!prevFragments) {
                return null;
            }

            let foundMatch = false;
            for (let i = prevFragments.length - 1; i === 0; i--) {
                const prevFragment = prevFragments[i];
                if (prevFragment.fragmentType !== FragmentType.Number) {
                    continue;
                }

                if (prevFragment.numberStr === '\u1043') {
                    foundMatch = true;
                }

                break;
            }

            if (!foundMatch) {
                return null;
            }
        }

        const textFragment: TextFragment = {
            matchedStr,
            normalizedStr: numberExtractInfo.normalizedStr,
            fragmentType: FragmentType.Number,
            numberStr: numberExtractInfo.numberStr
        };

        if (numberExtractInfo.spaceDetected) {
            textFragment.spaceDetected = true;
            textFragment.invalidReason = textFragment.invalidReason || {};
            textFragment.invalidReason.invalidSpaceIncluded = true;
        }

        if (numberExtractInfo.invisibleSpaceIncluded) {
            textFragment.spaceDetected = true;
            textFragment.invalidReason = textFragment.invalidReason || {};
            textFragment.invalidReason.invalidSpaceIncluded = true;
        }

        if (numberExtractInfo.u101dCount) {
            textFragment.invalidReason = textFragment.invalidReason || {};
            textFragment.invalidReason.invalidU101DInsteadOfU1040 = true;
        }

        if (numberExtractInfo.u104eCount) {
            textFragment.invalidReason = textFragment.invalidReason || {};
            textFragment.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        return textFragment;
    }

    private getDigitGroupFragment(input: string): TextFragment | null {
        const m1 = input.match(this._numberGroup1Regex);
        if (m1 == null) {
            return null;
        }

        const matchedStr = m1[0];
        const numberExtractInfo = this.getNumberExtractInfo(matchedStr, true);
        if (!numberExtractInfo.digitCount) {
            return null;
        }

        const numberFragment: TextFragment = {
            matchedStr,
            fragmentType: FragmentType.Number,
            normalizedStr: numberExtractInfo.normalizedStr,
            numberStr: numberExtractInfo.numberStr
        };

        if (numberExtractInfo.spaceDetected || numberExtractInfo.invisibleSpaceIncluded) {
            numberFragment.spaceDetected = true;
            if (numberExtractInfo.invisibleSpaceIncluded) {
                numberFragment.invalidReason = numberFragment.invalidReason || {};
                numberFragment.invalidReason.invalidSpaceIncluded = true;
            }
        }

        if (numberExtractInfo.u101dCount) {
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidU101DInsteadOfU1040 = true;
        }

        if (numberExtractInfo.u104eCount) {
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        const rightStr = input.substring(matchedStr.length);
        const r1stCp = rightStr.length > 0 ? rightStr.codePointAt(0) : undefined;
        if (r1stCp) {
            const ancientFragment = this.getAncientNumeralShortcutSuffixFragment(rightStr, r1stCp);
            if (ancientFragment != null) {
                numberFragment.matchedStr += ancientFragment.matchedStr;
                numberFragment.normalizedStr += ancientFragment.normalizedStr;
                numberFragment.numberStr = numberFragment.numberStr || '';
                numberFragment.numberStr += ancientFragment.numberStr || '';
                numberFragment.ancientWrittenForm = true;
                numberFragment.ancientMeasureWords = ancientFragment.ancientMeasureWords;

                if (ancientFragment.spaceDetected || ancientFragment.invisibleSpaceIncluded) {
                    numberFragment.spaceDetected = true;
                    numberFragment.invalidReason = numberFragment.invalidReason || {};
                    numberFragment.invalidReason.invalidSpaceIncluded = true;
                }
            }
        }

        return numberFragment;
    }

    private getAncientNumeralShortcutSuffixFragment(input: string, firstCp: number): TextFragmentPartial | null {
        if (!(firstCp >= 0x102B && firstCp <= 0x103E)) {
            return null;
        }

        const diacriticsFragment = this.getDiacriticsFragment(input);

        let ancientMeasureWords: string[] | undefined;

        if (diacriticsFragment.normalizedStr === '\u103D\u1031') {
            // ရွေး
            ancientMeasureWords = ['\u101B\u103D\u1031\u1038'];
        } else if (diacriticsFragment.normalizedStr === '\u102D') {
            // ကျပ် / စိတ် / မိုက်
            ancientMeasureWords = [
                '\u1000\u103B\u1015\u103A',
                '\u1005\u102D\u1010\u103A',
                '\u1019\u102D\u102F\u1000\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u102C') {
            // ထွာ
            ancientMeasureWords = ['\u1011\u103D\u102C'];
        } else if (diacriticsFragment.normalizedStr === '\u1032') {
            // ပဲ / စလယ် / ပယ်
            ancientMeasureWords = [
                '\u1015\u1032',
                '\u1005\u101C\u101A\u103A',
                '\u1015\u101A\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u1030') {
            // မူး
            ancientMeasureWords = ['\u1019\u1030\u1038'];
        } else if (diacriticsFragment.normalizedStr === '\u1036') {
            // လက်သစ် / မတ်
            ancientMeasureWords = [
                '\u101C\u1000\u103A\u101E\u1005\u103A',
                '\u1019\u1010\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u103B\u1000\u103A') {
            // လမျက်
            ancientMeasureWords = ['\u101C\u1019\u103B\u1000\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u101A\u103A') {
            // လမယ်
            ancientMeasureWords = ['\u101C\u1019\u101A\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u1000\u103A') {
            // ခွက်
            ancientMeasureWords = ['\u1001\u103D\u1000\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103A') {
            // ပြည်
            ancientMeasureWords = ['\u1015\u103C\u100A\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u1032') {
            // ခွဲ
            ancientMeasureWords = ['\u1001\u103D\u1032'];
        } else if (diacriticsFragment.normalizedStr === '\u102B') {
            // ပိဿာ
            ancientMeasureWords = ['\u1015\u102D\u103F\u102C'];
        } else if (diacriticsFragment.normalizedStr === '\u102B\u1038') {
            // ပြား / ပါး
            ancientMeasureWords = [
                '\u1015\u103C\u102C\u1038',
                '\u1015\u102B\u1038'
            ];
        }

        if (!ancientMeasureWords || !ancientMeasureWords.length) {
            return null;
        }

        return {
            matchedStr: diacriticsFragment.matchedStr,
            normalizedStr: diacriticsFragment.normalizedStr,
            spaceDetected: diacriticsFragment.spaceDetected,
            invisibleSpaceIncluded: diacriticsFragment.invisibleSpaceIncluded,
            ancientMeasureWords
        };
    }

    private getDiacriticsFragment(input: string): TextFragmentPartial {
        let matchedStr = input[0];
        let normalizedStr = input[0];
        let tmpSpace = '';
        let tmpInvisibleIncluded = false;
        let spaceDetected = false;
        let invisibleSpaceIncluded = false;
        let curStr = input.substring(1);

        while (curStr.length > 0) {
            const c = curStr[0];
            const cp = c.codePointAt(0);

            if (!cp) {
                break;
            }

            if (cp >= 0x102B && cp <= 0x103E) {
                matchedStr += tmpSpace + c;
                normalizedStr += c;
                if (tmpSpace) {
                    spaceDetected = true;
                    if (tmpInvisibleIncluded) {
                        invisibleSpaceIncluded = true;
                    }
                    tmpSpace = '';
                }

                curStr = curStr.substring(1);
                continue;
            }

            if (this._invisibleSpaceRegExp.test(c)) {
                if (tmpSpace) {
                    break;
                }

                tmpInvisibleIncluded = true;
                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (this._visibleSpaceRegExp.test(c)) {
                if (tmpSpace) {
                    break;
                }

                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            break;
        }

        return {
            matchedStr,
            normalizedStr,
            spaceDetected,
            invisibleSpaceIncluded
        };
    }

    private getNumberExtractInfo(matchedStr: string, allowSpaceInNormalizedStr?: boolean): NumberExtractInfo {
        const numberExtractInfo: NumberExtractInfo = {
            normalizedStr: '',
            numberStr: '',
            digitCount: 0,
            u101dCount: 0,
            u104eCount: 0,
            separatorCount: 0
        };

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++numberExtractInfo.digitCount;
                numberExtractInfo.numberStr += c;
                numberExtractInfo.normalizedStr += c;
            } else if (cp === 0x002C || cp === 0x066B || cp === 0x066C || cp === 0x2396) {
                // , ٫ ٬ ⎖
                ++numberExtractInfo.separatorCount;
                numberExtractInfo.normalizedStr += '\u002C';
            } else if (cp === 0x0027) {
                // '
                ++numberExtractInfo.separatorCount;
                numberExtractInfo.normalizedStr += c;
            } else if (cp === 0x005F) {
                // _
                ++numberExtractInfo.separatorCount;
                numberExtractInfo.normalizedStr += c;
            } else if (cp === 0x002E || cp === 0x00B7) {
                // . ·
                ++numberExtractInfo.separatorCount;
                numberExtractInfo.numberStr += '\u002E';
                numberExtractInfo.normalizedStr += '\u002E';
            } else if (cp === 0x101D) {
                ++numberExtractInfo.u101dCount;
                numberExtractInfo.numberStr += '\u1040';
                numberExtractInfo.normalizedStr += '\u1040';
            } else if (cp === 0x104E) {
                ++numberExtractInfo.u104eCount;
                numberExtractInfo.numberStr += '\u1044';
                numberExtractInfo.normalizedStr += '\u1044';
            } else if (this._visibleSpaceRegExp.test(c)) {
                numberExtractInfo.spaceDetected = true;
                if (allowSpaceInNormalizedStr) {
                    numberExtractInfo.normalizedStr += '\u0020';
                }
            } else if (this._invisibleSpaceRegExp.test(c)) {
                numberExtractInfo.spaceDetected = true;
                numberExtractInfo.invisibleSpaceIncluded = true;
            } else {
                numberExtractInfo.normalizedStr += c;
            }
        }

        return numberExtractInfo;
    }

    // tslint:disable-next-line: max-func-body-length
    private getPhoneExtractInfo(matchedStr: string): PhoneNumberExtractInfo | null {
        const extractInfo: PhoneNumberExtractInfo = {
            normalizedStr: ''
        };

        let curStr = matchedStr;
        const firstCp = curStr.codePointAt(0) as number;
        let startOfString = true;
        let prevIsDigit = false;
        let prevIsSpace = false;
        let digitCount = 0;
        let possibleDigitCount = 0;
        let dotCount = 0;
        let slashCount = 0;
        let u101DIncluded = false;
        let u104EIncluded = false;
        let invisibleSpaceIncluded = false;

        if (firstCp === 0x002B || firstCp === 0xFF0B) {
            extractInfo.normalizedStr += '+';
            if (firstCp !== 0x002B) {
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                extractInfo.normalizationReason.normalizePlusSign = true;
            }
            curStr = curStr.substring(1);
            startOfString = false;
        }

        for (let i = 0; i < curStr.length; i++) {
            const c = curStr[i];
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                ++possibleDigitCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x101D || cp === 0x104E) {
                ++possibleDigitCount;
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                if (cp === 0x101D) {
                    u101DIncluded = true;
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.normalizationReason.changeU101DToU1040 = true;
                } else {
                    u104EIncluded = true;
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.normalizationReason.changeU104EToU1044 = true;
                }
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x002A) {
                if (!prevIsDigit && !prevIsSpace && !startOfString) {
                    return null;
                }
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (cp === 0x0023) {
                if (!prevIsDigit && !prevIsSpace) {
                    return null;
                }
                extractInfo.normalizedStr += c;
                break;
            } else if (cp === 0x0028 || cp === 0xFF08 || cp === 0x005B || cp === 0xFF3B) {
                if (!this.hasCorrectClosingBracket(cp, curStr.substring(i + 1))) {
                    return null;
                }
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (this._visibleSpaceRegExp.test(c)) {
                extractInfo.spaceDetected = true;
                extractInfo.normalizedStr += ' ';
                if (cp !== 0x0020) {
                    extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                    extractInfo.normalizationReason.normalizeSpace = true;
                }
                prevIsDigit = false;
                prevIsSpace = true;
            } else if (this._invisibleSpaceRegExp.test(c)) {
                extractInfo.spaceDetected = true;
                invisibleSpaceIncluded = true;
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                extractInfo.normalizationReason.removeInvisibleSpace = true;
                prevIsDigit = false;
                prevIsSpace = true;
            } else {
                if (!prevIsDigit && !prevIsSpace && !startOfString) {
                    return null;
                }

                if (cp === 0x002E) {
                    ++dotCount;
                } else if (cp === 0x002F) {
                    ++slashCount;
                }

                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            }

            startOfString = false;
        }

        if (!digitCount) {
            return null;
        }

        if (invisibleSpaceIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidSpaceIncluded = true;
        }

        if (u101DIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidU101DInsteadOfU1040 = true;
        }

        if (u104EIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        if (dotCount === 1 && possibleDigitCount + 1 === extractInfo.normalizedStr.length && extractInfo.normalizedStr[0] !== '\u1040') {
            return null;
        }

        if (slashCount === 1 && possibleDigitCount + 1 === extractInfo.normalizedStr.length &&
            possibleDigitCount < 8 && extractInfo.normalizedStr[0] !== '\u1040') {
            return null;
        }

        return extractInfo;
    }

    // tslint:disable-next-line: max-func-body-length
    private getDateExtractInfo(matchedStr: string, monthStart?: boolean): DateExtractInfo | null {
        const extractInfo: DateExtractInfo = { normalizedStr: '' };

        let prevIsDigit = false;
        let prevIsSpace = false;
        let prevIsSeparator = false;
        let dateSeparator: string | undefined;
        let digitCount = 0;
        let u101DIncluded = false;
        let u104EIncluded = false;
        let invisibleSpaceIncluded = false;

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (cp === 0x101D || cp === 0x104E) {
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};

                if (cp === 0x101D) {
                    u101DIncluded = true;
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.normalizationReason.changeU101DToU1040 = true;
                } else {
                    u104EIncluded = true;
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.normalizationReason.changeU104EToU1044 = true;
                }

                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (this._spaceRegExp.test(c)) {
                if (prevIsSpace) {
                    return null;
                }

                extractInfo.spaceDetected = true;

                if (prevIsSeparator) {
                    extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                    extractInfo.normalizationReason.removeSpace = true;
                } else {
                    extractInfo.normalizedStr += ' ';

                    if (cp !== 0x0020) {
                        if (this._invisibleSpaceRegExp.test(c)) {
                            invisibleSpaceIncluded = true;
                        }
                        extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                        extractInfo.normalizationReason.normalizeSpace = true;
                    }
                }

                prevIsDigit = false;
                prevIsSpace = true;
                prevIsSeparator = false;
            } else {
                if (prevIsSeparator || (!prevIsDigit && !prevIsSpace && dateSeparator && c !== dateSeparator)) {
                    return null;
                }

                if (prevIsSpace) {
                    extractInfo.normalizedStr = extractInfo.normalizedStr.trimRight();
                    extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                    extractInfo.normalizationReason.removeSpace = true;
                }

                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
                dateSeparator = c;
                prevIsSeparator = true;
            }
        }

        if (!digitCount) {
            return null;
        }

        if (dateSeparator) {
            extractInfo.dateSeparator = dateSeparator;
        } else if (extractInfo.spaceDetected) {
            extractInfo.dateSeparator = ' ';
        }

        if (extractInfo.dateSeparator != null) {
            const dParts = extractInfo.normalizedStr.split(extractInfo.dateSeparator);
            if (dParts[0].length === 4) {
                if (dParts[1].length === 2 && dParts[2].length === 2) {
                    extractInfo.dateFormat = `yyyy${extractInfo.dateSeparator}MM${extractInfo.dateSeparator}dd`;
                } else {
                    extractInfo.dateFormat = `yyyy${extractInfo.dateSeparator}M${extractInfo.dateSeparator}d`;
                }
            } else if (dParts[2].length === 4) {
                if (dParts[0].length === 2 && dParts[1].length === 2) {
                    extractInfo.dateFormat = monthStart ?
                        `MM${extractInfo.dateSeparator}dd${extractInfo.dateSeparator}yyyy` : `dd${extractInfo.dateSeparator}MM${extractInfo.dateSeparator}yyyy`;
                } else {
                    extractInfo.dateFormat = monthStart ?
                        `M${extractInfo.dateSeparator}d${extractInfo.dateSeparator}yyyy` : `d${extractInfo.dateSeparator}M${extractInfo.dateSeparator}yyyy`;
                }
            } else {
                if (dParts[0].length === 2 && dParts[1].length === 2) {
                    extractInfo.dateFormat = monthStart ?
                        `MM${extractInfo.dateSeparator}dd${extractInfo.dateSeparator}yy` : `dd${extractInfo.dateSeparator}MM${extractInfo.dateSeparator}yy`;
                } else {
                    extractInfo.dateFormat = monthStart ?
                        `M${extractInfo.dateSeparator}d${extractInfo.dateSeparator}yy` : `d${extractInfo.dateSeparator}M${extractInfo.dateSeparator}yy`;
                }
            }
        } else {
            extractInfo.dateFormat = 'yyyyMMdd';
        }

        if (invisibleSpaceIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidSpaceIncluded = true;
        }

        if (u101DIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidU101DInsteadOfU1040 = true;
        }

        if (u104EIncluded) {
            extractInfo.invalidReason = extractInfo.invalidReason || {};
            extractInfo.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        return extractInfo;
    }

    private getNormalizedTextInfo(str: string, upTo?: number, acceptAllOtherChars?: boolean): NormalizedTextInfo {
        let matchedStr = '';
        let normalizedStr = '';
        let tmpSpace = '';
        let tmpInvisibleIncluded = false;
        let spaceDetected = false;
        let invisibleSpaceIncluded = false;
        let curStr = str;

        while (curStr.length > 0) {
            const c = curStr[0];

            const cp = c.codePointAt(0);

            if (!cp) {
                break;
            }

            let validChar = false;

            if ((cp >= 0x1000 && cp <= 0x1021) ||
                (cp >= 0x1023 && cp <= 0x1027) ||
                (cp >= 0x1029 && cp <= 0x1049) ||
                cp === 0x104E) {
                validChar = true;
            }

            if (!validChar && this._invisibleSpaceRegExp.test(c)) {
                if (tmpSpace) {
                    break;
                }

                tmpInvisibleIncluded = true;
                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (!validChar && this._visibleSpaceRegExp.test(c)) {
                if (tmpSpace) {
                    break;
                }

                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (validChar || acceptAllOtherChars) {
                matchedStr += tmpSpace + c;
                normalizedStr += c;
                if (tmpSpace) {
                    spaceDetected = true;
                    if (tmpInvisibleIncluded) {
                        invisibleSpaceIncluded = true;
                    }
                    tmpSpace = '';
                }

                if (upTo != null && normalizedStr.length >= upTo) {
                    break;
                }

                curStr = curStr.substring(1);
                continue;
            }

            break;
        }

        return {
            matchedStr,
            normalizedStr,
            spaceDetected,
            invisibleSpaceIncluded
        };
    }

    private startsWithOpeningBracket(cp: number): boolean {
        if (cp === 0x0028 || cp === 0xFF08 || cp === 0x005B || cp === 0xFF3B) {
            return true;
        }

        return false;
    }

    private startsWithPossibleNumber(cp: number): boolean {
        if ((cp >= 0x1040 && cp <= 0x1049) || cp === 0x101D || cp === 0x104E) {
            return true;
        }

        return false;
    }

    private startsWithPossibleNumberOrBracket(cp: number): boolean {
        if (this.startsWithPossibleNumber(cp) || this.startsWithOpeningBracket(cp)) {
            return true;
        }

        return false;
    }

    private hasCorrectClosingBracket(openingBracketCp: number, str: string): boolean {
        for (const c of str) {
            const cp = c.codePointAt(0) as number;
            if (cp === 0x0029 && openingBracketCp === 0x0028) {
                return true;
            }

            if (cp === 0xFF09 && openingBracketCp === 0xFF08) {
                return true;
            }

            if (cp === 0x005D && openingBracketCp === 0x005B) {
                return true;
            }

            if (cp === 0xFF3D && openingBracketCp === 0xFF3B) {
                return true;
            }
        }

        return false;
    }

    private isRightStrSafeForDateOrPhoneNumber(rightStr: string): boolean {
        if (!rightStr) {
            return true;
        }

        const firstCp = rightStr.codePointAt(0);

        if (!firstCp) {
            return true;
        }

        if (firstCp >= 0x1040 && firstCp <= 0x1049) {
            return false;
        }

        if (firstCp === 0x101D || firstCp === 0x104E) {
            if (rightStr.length === 1) {
                return false;
            }

            const f = this.getDigitGroupFragment(rightStr);
            return f == null ? true : false;
        }

        // # $ % + @ ＋
        if ((firstCp >= 0x0023 && firstCp <= 0x0025) || firstCp === 0x002B || firstCp === 0x0040 || firstCp === 0xFF0B) {
            return false;
        }

        if (rightStr.length > 1 && ((firstCp >= 0x0021 && firstCp <= 0x002F) ||
            firstCp === 0x003A || (firstCp >= 0x003C && firstCp <= 0x003F) ||
            (firstCp >= 0x005B && firstCp <= 0x005F) || firstCp === 0x0060 ||
            (firstCp >= 0x007B && firstCp <= 0x007E))) {
            const cp = rightStr.codePointAt(1);

            if (!cp) {
                return true;
            }

            if (cp >= 0x1040 && cp <= 0x1049) {
                return false;
            }

            if (cp === 0x101D || cp === 0x104E) {
                const f = this.getDigitGroupFragment(rightStr);
                return f == null ? true : false;
            }
        }

        return true;
    }

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
