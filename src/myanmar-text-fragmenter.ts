import { FragmentType } from './fragment-type';
import { NormalizationReason } from './normalization-reason';
import { TextFragment } from './text-fragment';

interface NormalizedTextInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;
}

interface NumberExtractInfo {
    normalizedStr: string;
    numberStr: string;
    digitCount: number;
    u101dCount: number;
    u104eCount: number;
    separatorCount: number;
    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;
}

interface DateOrPhoneExtractInfo {
    normalizedStr: string;
    digitCount: number;
    possibleDigitCount: number;
    u101DCount: number;
    u104ECount: number;
    separatorCount: number;
    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;
    dotCount: number;
    slashCount: number;
    plusSignIncluded?: boolean;
    starIncluded?: boolean;
    bracketsIncluded?: boolean;
    hashEnded?: boolean;
    normalizationReason?: NormalizationReason;
}

interface TextFragmentPartial {
    matchedStr: string;
    normalizedStr: string;

    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;

    numberStr?: string;
    measureWords?: string[];
    numberOrderList?: boolean;
}

// \uFF0D\u2010-\u2015\u2212\u002F\uFF0F\u002E\uFF0E
// \u3000\u2060

export class MyanmarTextFragmenter {
    private readonly _visibleSpace = ' \u00A0\u1680\u2000-\u2009\u202F\u205F\u3000';
    private readonly _invisibleSpace = '\u00AD\u180E\u200A\u200B\u2060\uFEFF';
    private readonly _space = `${this._visibleSpace}${this._invisibleSpace}`;
    private readonly _possibleDigits = '\u1040-\u1049\u101D\u104E';

    // \u002E\u00B7\u02D9
    private readonly _digitSeparator1 = `\u002C\u066B\u066C\u2396\u005F\u0027${this._visibleSpace}`;

    private readonly _visibleSpaceRegExp = new RegExp(`[${this._visibleSpace}]`);
    private readonly _invisibleSpaceRegExp = new RegExp(`[${this._invisibleSpace}]`);

    // private readonly _options: TextFragmenterOptions;
    private readonly _hsethaRegExp = new RegExp(`^[(][${this._space}]?[\u1041-\u1049\u104E][${this._space}]?[)][${this._space}]?\u1040\u102D`);

    private readonly _numberBoxRegExp = new RegExp(`^[(\\[\uFF08\uFF3B][${this._space}]?[\u101D\u1040-\u1049\u104E]+[${this._space}]?[)\\]\uFF09\uFF3D]`);
    private readonly _orderListRegExp = new RegExp(`^[\u101D\u1040-\u1049\u104E]+[${this._space}]?[\u104A\u104B]`);
    private readonly _numberGroup1Regex = new RegExp(`^[\u1040-\u1049\u101D\u104E]{1,3}([${this._digitSeparator1}][\u1040-\u1049\u101D\u104E]{2,4})*([\u002E\u00B7][\u1040-\u1049\u101D\u104E]+)?`);

    private readonly _separatorForDtAndPh = '-_./\u104A~\u002D\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F\u2053\u223C\uFF5E';

    // Date
    private readonly _dtYearPattern = `[\u1041\u1042][${this._possibleDigits}]{3,3}|[${this._possibleDigits}]{2,2}`;
    private readonly _dtMonthPattern = '[\u1041-\u1049\u104E]|[\u1040\u101D][\u1041-\u1049\u104E]|\u1041[\u1040-\u1042\u101D]';
    private readonly _dtDayPattern = `[\u1041-\u1049\u104E]|[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1042][${this._possibleDigits}]|\u1043[\u1040-\u1041\u101D]`;
    private readonly _dtIsoDatePattern = `(?:[\u1041\u1042][${this._possibleDigits}]{3,3})[-]?(?:[\u1040\u101D][\u1041-\u1049\u104E]|\u1041[\u1040-\u1042\u101D])[-]?(?:[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1042][${this._possibleDigits}]|\u1043[\u1040-\u1041\u101D])`;
    private readonly _dtDMY = new RegExp(`^(?:${this._dtDayPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtMonthPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtYearPattern})$`);
    private readonly _dtYMD = new RegExp(`^(?:${this._dtYearPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtMonthPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtDayPattern})$`);
    private readonly _dtMDY = new RegExp(`^(?:${this._dtMonthPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtDayPattern})[${this._separatorForDtAndPh}${this._space}]{1,3}(?:${this._dtYearPattern})$`);
    private readonly _dtYMDWithoutSpace = new RegExp(`^${this._dtIsoDatePattern}`);

    // Phone Number
    private readonly _phPlus = '+\uFF0B';
    private readonly _phSeparator = `${this._separatorForDtAndPh}()\\[\\]\uFF08\uFF09\uFF3B\uFF3D`;
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

        const punctuationOrSingleLetterWordFragment = this.getPunctuationOrSingleLetterWordFragment(input, firstCp);
        if (punctuationOrSingleLetterWordFragment != null) {
            return punctuationOrSingleLetterWordFragment;
        }

        const numberDateOrPhoneFragment = this.getNumberDateOrPhoneFragment(input, firstCp, prevFragments);
        if (numberDateOrPhoneFragment != null) {
            return numberDateOrPhoneFragment;
        }

        return null;
    }

    private getPunctuationOrSingleLetterWordFragment(input: string, firstCp: number): TextFragment | null {
        // ဤ / ဪ
        if (firstCp === 0x1024 || firstCp === 0x102A) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                fragmentType: FragmentType.Text
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

    private getNumberDateOrPhoneFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        const preAncientNumberFragment = this.getPreAncientNumberFragment(input, firstCp);
        if (preAncientNumberFragment != null) {
            return preAncientNumberFragment;
        }

        const preDateOrPhoneFragment = this.getDateOrPhoneFragment(input, firstCp);
        if (preDateOrPhoneFragment != null) {
            return preDateOrPhoneFragment;
        }

        if (input.length > 4 && this.isOpeningCharInBox(firstCp)) {
            const phoneNumberFragment = this.getDateOrPhoneFragment(input, firstCp);
            const boxNumberFragment = this.getNumberBoxOrOrderListFragment(input, firstCp, prevFragments);
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

        if (input.length > 2 && this.isOpeningCharInBox(firstCp)) {
            return this.getNumberBoxOrOrderListFragment(input, firstCp, prevFragments);
        }

        if (!((firstCp >= 0x1040 && firstCp <= 0x1049) || firstCp === 0x101D || firstCp === 0x104E)) {
            return null;
        }

        if ((firstCp === 0x101D || firstCp === 0x104E) && input.length === 1) {
            return null;
        }

        if (input.length === 1) {
            return {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };
        }

        const orderListFragment = this.getNumberBoxOrOrderListFragment(input, firstCp, prevFragments);
        if (orderListFragment != null) {
            return orderListFragment;
        }

        if (input.length > 2) {
            const phoneNumberFragment = this.getDateOrPhoneFragment(input, firstCp);
            const numberDigitGroupFragment = this.getNumberDigitGroupFragment(input);
            if (phoneNumberFragment != null && numberDigitGroupFragment != null) {
                if (phoneNumberFragment.matchedStr.length === numberDigitGroupFragment.matchedStr.length) {
                    const phNumberStr = phoneNumberFragment.numberStr || '';
                    const ndgNumberStr = numberDigitGroupFragment.numberStr || '';
                    if (phNumberStr.length === ndgNumberStr.length) {
                        return phoneNumberFragment;
                    } else {
                        return phNumberStr.length > ndgNumberStr.length ? phoneNumberFragment : numberDigitGroupFragment;
                    }
                }

                return phoneNumberFragment.matchedStr.length > numberDigitGroupFragment.matchedStr.length ?
                    phoneNumberFragment : numberDigitGroupFragment;
            } else if (phoneNumberFragment != null) {
                return phoneNumberFragment;
            } else if (numberDigitGroupFragment != null) {
                return numberDigitGroupFragment;
            } else {
                return null;
            }
        }

        return this.getNumberDigitGroupFragment(input);
    }

    private getDateOrPhoneFragment(input: string, firstCp: number): TextFragment | null {
        if (input.length < 3 || !this.startsWithPossibleNumberOrBracket(firstCp, true)) {
            return null;
        }

        const m = input.match(this._phRegExp);
        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        const extractInfo = this.getDateOrPhoneExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        let fragment = this.getPossibleDateFragment(matchedStr, extractInfo);
        if (fragment == null) {
            fragment = {
                matchedStr,
                fragmentType: FragmentType.PossiblePhone,
                normalizedStr: extractInfo.normalizedStr
            };
        }

        if (extractInfo.normalizationReason) {
            fragment.normalizationReason = extractInfo.normalizationReason;
        }

        if (extractInfo.spaceIncluded || extractInfo.invisibleSpaceIncluded) {
            fragment.spaceIncluded = true;
            if (extractInfo.invisibleSpaceIncluded) {
                fragment.invalidReason = fragment.invalidReason || {};
                fragment.invalidReason.invalidSpaceIncluded = true;
            }
        }

        if (extractInfo.u101DCount) {
            fragment.invalidReason = fragment.invalidReason || {};
            fragment.invalidReason.invalidU101DInsteadOfU1040 = true;
        }

        if (extractInfo.u104ECount) {
            fragment.invalidReason = fragment.invalidReason || {};
            fragment.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        return fragment;
    }

    private getPossibleDateFragment(matchedStr: string, extractInfo: DateOrPhoneExtractInfo): TextFragment | null {
        const normalizedStr = extractInfo.normalizedStr;
        const firstCp = normalizedStr.codePointAt(0) as number;

        if (extractInfo.plusSignIncluded ||
            extractInfo.hashEnded ||
            extractInfo.bracketsIncluded ||
            normalizedStr.length < 6 ||
            !(firstCp >= 0x1040 && firstCp <= 0x1049)) {
            return null;
        }

        let matched = this._dtDMY.test(normalizedStr);
        if (!matched) {
            matched = this._dtYMD.test(normalizedStr);
        }
        if (!matched) {
            matched = this._dtMDY.test(normalizedStr);
        }

        if (!matched &&
            extractInfo.digitCount === 8 &&
            !extractInfo.spaceIncluded &&
            !extractInfo.invisibleSpaceIncluded &&
            !extractInfo.separatorCount) {
            matched = this._dtYMDWithoutSpace.test(normalizedStr);
        }

        if (!matched) {
            return null;
        }

        return {
            matchedStr,
            fragmentType: FragmentType.PossibleDate,
            normalizedStr: extractInfo.normalizedStr
        };
    }

    private getPreAncientNumberFragment(input: string, firstCp: number): TextFragment | null {
        const ingaFragment = this.getNumberIngaFragment(input, firstCp);
        if (ingaFragment != null) {
            return ingaFragment;
        }

        const tinOrTaungFragment = this.getNumberTinOrTaungFragment(input, firstCp);
        if (tinOrTaungFragment != null) {
            return tinOrTaungFragment;
        }

        const hsethaFragment = this.getNumberHsethaFragment(input, firstCp);
        if (hsethaFragment != null) {
            return hsethaFragment;
        }

        if (firstCp >= 0x1040 && firstCp <= 0x1049 && input.length > 1) {
            const rightStr = input.substring(1);
            const r1stCp = rightStr.codePointAt(0);
            if (!r1stCp) {
                return null;
            }

            const suffixFragment = this.getAncientNumeralShortcutSuffixFragment(rightStr, r1stCp);
            if (suffixFragment != null) {
                const numberFragment: TextFragment = {
                    matchedStr: input[0] + suffixFragment.matchedStr,
                    normalizedStr: input[0] + suffixFragment.normalizedStr,
                    fragmentType: FragmentType.Number,
                    ancientWrittenForm: true,
                    measureWords: suffixFragment.measureWords
                };

                if (suffixFragment.spaceIncluded || suffixFragment.invisibleSpaceIncluded) {
                    numberFragment.spaceIncluded = true;
                    numberFragment.invalidReason = numberFragment.invalidReason || {};
                    numberFragment.invalidReason.invalidSpaceIncluded = true;
                    numberFragment.invalidReason.invalidUnicodeForm = true;
                }

                return numberFragment;

            }
        }

        return null;
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
        let spaceIncluded: boolean | undefined;
        let invisibleSpaceIncluded: boolean | undefined;

        if (input[4] !== '\u102B') {
            if (input.length < 6 || input[5] !== '\u102B') {
                return null;
            }
            const subStr = input.substring(matchedStr.length);
            const normalizedTextInfo = this.getNormalizedTextInfo(subStr, 2);
            if (normalizedTextInfo.normalizedStr !== '\u102B') {
                return null;
            }
            matchedStr += normalizedTextInfo.matchedStr;
            normalizedStr += normalizedTextInfo.normalizedStr;
            spaceIncluded = normalizedTextInfo.spaceIncluded;
            invisibleSpaceIncluded = normalizedTextInfo.invisibleSpaceIncluded;
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
            measureWords: ['\u1021\u1004\u103A\u1039\u1002\u102B']
        };

        if (spaceIncluded || invisibleSpaceIncluded) {
            numberFragment.spaceIncluded = true;
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

        let measureWords: string[];
        if (rightStr && rightStr.trimLeft().startsWith('\u1010\u1031\u102C\u1004\u103A\u1038')) {
            measureWords = ['\u1010\u1031\u102C\u1004\u103A\u1038'];
        } else if (rightStr && rightStr.trimLeft().startsWith('\u1010\u1004\u103A\u1038')) {
            measureWords = ['\u1010\u1004\u103A\u1038'];
        } else {
            measureWords = [
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
            measureWords
        };
    }

    /**
     * Get ancient `ဆယ်သား` number fragment - e.g. \u0028\u1041\u0029\u1040\u102D (၁)၀ိ - (၁)ဆယ်သား.
     */
    private getNumberHsethaFragment(input: string, firstCp: number): TextFragment | null {
        if (firstCp !== 0x0028 || input.length < 5) {
            return null;
        }

        const m = input.match(this._hsethaRegExp);
        if (m == null) {
            return null;
        }

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
            measureWords: ['\u1006\u101A\u103A\u101E\u102C\u1038']
        };

        if (numberExtractInfo.u104eCount) {
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidU104EInsteadOfU1044 = true;
        }

        if (normalizedTextInfo && (normalizedTextInfo.spaceIncluded || normalizedTextInfo.invisibleSpaceIncluded)) {
            numberFragment.spaceIncluded = true;
            numberFragment.invalidReason = numberFragment.invalidReason || {};
            numberFragment.invalidReason.invalidSpaceIncluded = true;
        }

        return numberFragment;
    }

    private getNumberBoxOrOrderListFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        let m: RegExpMatchArray | null;
        if (this.isOpeningCharInBox(firstCp)) {
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

        if (numberExtractInfo.spaceIncluded) {
            textFragment.spaceIncluded = true;
            textFragment.invalidReason = textFragment.invalidReason || {};
            textFragment.invalidReason.invalidSpaceIncluded = true;
        }

        if (numberExtractInfo.invisibleSpaceIncluded) {
            textFragment.spaceIncluded = true;
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

    private getNumberDigitGroupFragment(input: string): TextFragment | null {
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

        if (numberExtractInfo.spaceIncluded || numberExtractInfo.invisibleSpaceIncluded) {
            numberFragment.spaceIncluded = true;
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
            const ancientFragment = this.getPreAncientNumberFragment(rightStr, r1stCp);
            if (ancientFragment != null) {
                numberFragment.matchedStr += ancientFragment.matchedStr;
                numberFragment.normalizedStr += ancientFragment.normalizedStr;
                numberFragment.numberStr = numberFragment.numberStr || '';
                numberFragment.numberStr += ancientFragment.numberStr || '';
                numberFragment.ancientWrittenForm = true;
                numberFragment.measureWords = ancientFragment.measureWords;

                if (ancientFragment.spaceIncluded) {
                    numberFragment.spaceIncluded = true;
                }

                if (ancientFragment.invalidReason) {
                    numberFragment.invalidReason = ancientFragment.invalidReason;
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

        let measureWords: string[] | undefined;

        if (diacriticsFragment.normalizedStr === '\u103D\u1031') {
            // ရွေး
            measureWords = ['\u101B\u103D\u1031\u1038'];
        } else if (diacriticsFragment.normalizedStr === '\u102D') {
            // ကျပ် / စိတ် / မိုက်
            measureWords = [
                '\u1000\u103B\u1015\u103A',
                '\u1005\u102D\u1010\u103A',
                '\u1019\u102D\u102F\u1000\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u102C') {
            // ထွာ
            measureWords = ['\u1011\u103D\u102C'];
        } else if (diacriticsFragment.normalizedStr === '\u1032') {
            // ပဲ / စလယ် / ပယ်
            measureWords = [
                '\u1015\u1032',
                '\u1005\u101C\u101A\u103A',
                '\u1015\u101A\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u1030') {
            // မူး
            measureWords = ['\u1019\u1030\u1038'];
        } else if (diacriticsFragment.normalizedStr === '\u1036') {
            // လက်သစ် / မတ်
            measureWords = [
                '\u101C\u1000\u103A\u101E\u1005\u103A',
                '\u1019\u1010\u103A'
            ];
        } else if (diacriticsFragment.normalizedStr === '\u103B\u1000\u103A') {
            // လမျက်
            measureWords = ['\u101C\u1019\u103B\u1000\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u101A\u103A') {
            // လမယ်
            measureWords = ['\u101C\u1019\u101A\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u1000\u103A') {
            // ခွက်
            measureWords = ['\u1001\u103D\u1000\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103A') {
            // ပြည်
            measureWords = ['\u1015\u103C\u100A\u103A'];
        } else if (diacriticsFragment.normalizedStr === '\u103D\u1032') {
            // ခွဲ
            measureWords = ['\u1001\u103D\u1032'];
        } else if (diacriticsFragment.normalizedStr === '\u102B') {
            // ပိဿာ
            measureWords = ['\u1015\u102D\u103F\u102C'];
        } else if (diacriticsFragment.normalizedStr === '\u102B\u1038') {
            // ပြား / ပါး
            measureWords = [
                '\u1015\u103C\u102C\u1038',
                '\u1015\u102B\u1038'
            ];
        }

        if (!measureWords || !measureWords.length) {
            return null;
        }

        return {
            matchedStr: diacriticsFragment.matchedStr,
            normalizedStr: diacriticsFragment.normalizedStr,
            spaceIncluded: diacriticsFragment.spaceIncluded,
            invisibleSpaceIncluded: diacriticsFragment.invisibleSpaceIncluded,
            measureWords
        };
    }

    private getDiacriticsFragment(input: string): TextFragmentPartial {
        let matchedStr = input[0];
        let normalizedStr = input[0];
        let tmpSpace = '';
        let tmpInvisibleIncluded = false;
        let spaceIncluded = false;
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
                    spaceIncluded = true;
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
            spaceIncluded,
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
                numberExtractInfo.spaceIncluded = true;
                if (allowSpaceInNormalizedStr) {
                    numberExtractInfo.normalizedStr += '\u0020';
                }
            } else if (this._invisibleSpaceRegExp.test(c)) {
                numberExtractInfo.spaceIncluded = true;
                numberExtractInfo.invisibleSpaceIncluded = true;
            } else {
                numberExtractInfo.normalizedStr += c;
            }
        }

        return numberExtractInfo;
    }

    // tslint:disable-next-line: max-func-body-length
    private getDateOrPhoneExtractInfo(matchedStr: string): DateOrPhoneExtractInfo | null {
        const extractInfo: DateOrPhoneExtractInfo = {
            normalizedStr: '',
            digitCount: 0,
            possibleDigitCount: 0,
            u101DCount: 0,
            u104ECount: 0,
            dotCount: 0,
            slashCount: 0,
            separatorCount: 0
        };

        let curStr = matchedStr;
        const firstCp = curStr.codePointAt(0) as number;
        let startOfString = true;
        let prevIsDigit = false;
        let prevIsSpace = false;

        if (firstCp === 0x002B || firstCp === 0xFF0B) {
            extractInfo.plusSignIncluded = true;
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
                ++extractInfo.digitCount;
                ++extractInfo.possibleDigitCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x101D) {
                ++extractInfo.u101DCount;
                ++extractInfo.possibleDigitCount;
                extractInfo.normalizedStr += '\u1040';
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                extractInfo.normalizationReason.changeU101DToU1040 = true;
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x104E) {
                ++extractInfo.u104ECount;
                ++extractInfo.possibleDigitCount;
                extractInfo.normalizedStr += '\u1044';
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                extractInfo.normalizationReason.changeU104EToU1044 = true;
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x002A) {
                if (!prevIsDigit && !prevIsSpace && !startOfString) {
                    return null;
                }
                extractInfo.starIncluded = true;
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (cp === 0x0023) {
                if (!prevIsDigit && !prevIsSpace) {
                    return null;
                }
                extractInfo.hashEnded = true;
                extractInfo.normalizedStr += c;
                break;
            } else if (cp === 0x002E) {
                if (!prevIsDigit && !prevIsSpace) {
                    return null;
                }
                ++extractInfo.dotCount;
                ++extractInfo.separatorCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (cp === 0x002F) {
                if (!prevIsDigit && !prevIsSpace) {
                    return null;
                }
                ++extractInfo.slashCount;
                ++extractInfo.separatorCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (cp === 0x0028 || cp === 0xFF08 || cp === 0x005B || cp === 0xFF3B) {
                if (!this.hasCorrectClosingBracket(cp, curStr.substring(i + 1))) {
                    return null;
                }

                extractInfo.bracketsIncluded = true;
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            } else if (this._visibleSpaceRegExp.test(c)) {
                extractInfo.spaceIncluded = true;
                extractInfo.normalizedStr += ' ';
                if (cp !== 0x0020) {
                    extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                    extractInfo.normalizationReason.normalizeSpace = true;
                }
                prevIsDigit = false;
                prevIsSpace = true;
            } else if (this._invisibleSpaceRegExp.test(c)) {
                extractInfo.spaceIncluded = true;
                extractInfo.invisibleSpaceIncluded = true;
                extractInfo.normalizationReason = extractInfo.normalizationReason || {};
                extractInfo.normalizationReason.removeInvisibleSpace = true;
                prevIsDigit = false;
                prevIsSpace = true;
            } else {
                if (!prevIsDigit && !prevIsSpace) {
                    return null;
                }

                ++extractInfo.separatorCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
            }

            startOfString = false;
        }

        if (!extractInfo.digitCount) {
            return null;
        }

        if (extractInfo.dotCount === 1 &&
            extractInfo.dotCount === extractInfo.separatorCount &&
            !extractInfo.spaceIncluded &&
            !extractInfo.invisibleSpaceIncluded &&
            !extractInfo.plusSignIncluded &&
            !extractInfo.bracketsIncluded &&
            !extractInfo.starIncluded &&
            !extractInfo.hashEnded &&
            extractInfo.normalizedStr[0] !== '\u1040') {
            return null;
        }

        if (extractInfo.slashCount === 1 &&
            extractInfo.slashCount === extractInfo.separatorCount &&
            !extractInfo.plusSignIncluded &&
            extractInfo.digitCount < 7) {
            return null;
        }

        return extractInfo;
    }

    private getNormalizedTextInfo(str: string, upTo?: number, acceptAllOtherChars?: boolean): NormalizedTextInfo {
        let matchedStr = '';
        let normalizedStr = '';
        let tmpSpace = '';
        let tmpInvisibleIncluded = false;
        let spaceIncluded = false;
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
                    spaceIncluded = true;
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
            spaceIncluded,
            invisibleSpaceIncluded
        };
    }

    private isOpeningCharInBox(cp: number): boolean {
        if (cp === 0x0028 || cp === 0xFF08 || cp === 0xFF3B || cp === 0x005B) {
            return true;
        }

        return false;
    }

    private startsWithPossibleNumberOrBracket(cp: number, acceptU101DAndU104E: boolean): boolean {
        if ((cp >= 0x1040 && cp <= 0x1049) ||
            cp === 0x002B || cp === 0xFF0B ||
            cp === 0x0028 || cp === 0xFF08 ||
            cp === 0x005B || cp === 0xFF3B) {
            return true;
        }

        if (acceptU101DAndU104E && (cp === 0x101D || cp === 0x104E)) {
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
