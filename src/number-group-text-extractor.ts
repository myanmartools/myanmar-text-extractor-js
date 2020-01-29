import { ExtractInfo } from './extract-info';
import { TextExtractor } from './text-extractor';
import { TextFragment } from './text-fragment';

export class NumberGroupTextExtractor implements TextExtractor {
    // Spaces
    private readonly _visibleSpace = ' \u00A0\u1680\u2000-\u2009\u202F\u205F\u3000';
    private readonly _invisibleSpace = '\u00AD\u180E\u200A\u200B\u2060\uFEFF';
    private readonly _space = `${this._visibleSpace}${this._invisibleSpace}`;
    private readonly _visibleSpaceRegExp = new RegExp(`[${this._visibleSpace}]`);
    private readonly _containSpaceRegExp = new RegExp(`[${this._space}]`);

    // Number
    private readonly _possibleNumber = '\u1040-\u1049\u101D\u104E';

    // Decimal point
    private readonly _decimalPoint = '\u002E\u00B7\u02D9';

    // Thousand separator
    private readonly _thousandSeparator = '\u002C\u066B\u066C\u2396\u005F\u0027';
    private readonly _thousandSeparatorRegExp = new RegExp(`^[${this._thousandSeparator}]`);

    // Brackets
    private readonly _openingBracket = '(\\[\uFF08\uFF3B';
    private readonly _closingBracket = ')\\]\uFF09\uFF3D';

    // Number group
    private readonly _numberGroupRegExp = new RegExp(`^[${this._possibleNumber}]{1,3}(?:[${this._space}]?[${this._thousandSeparator}${this._space}][${this._space}]?[${this._possibleNumber}]{2,4})*(?:[${this._space}]?[${this._decimalPoint}][${this._space}]?[${this._possibleNumber}]+)?`);

    // Number group starts with 'ဝ' / '၎'
    private readonly _possibleNumberGroupStartsWithU101DOrU104ERegExp = new RegExp(`^[\u101D\u104E][${this._possibleNumber}]*[${this._thousandSeparator}${this._decimalPoint}]?[${this._possibleNumber}]*[\u1040-\u1049]`);

    // Number with hsettha (ဆယ်သား)
    private readonly _hsethaRegExp = new RegExp(`^[(\uFF08][${this._space}]?[\u1041-\u1049\u104E][${this._space}]?[)\uFF09][${this._space}]?\u1040\u102D`);

    // Number with brackets
    private readonly _numberBracketsRegExp = new RegExp(`^[${this._openingBracket}][${this._space}]?[\u101D\u1040-\u1049\u104E]+[${this._space}]?[${this._closingBracket}]`);

    // -/._
    private readonly _dtOrPhSeparator = '\\-/._~\u104A\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F\u2053\u223C\uFF5E';

    // Date
    private readonly _dtYear2DigitsGroup = `(?:[\u1041\u1042][${this._possibleNumber}])`;
    private readonly _dtYearGroup = `(?:[\u1041\u1042][${this._possibleNumber}]{3,3})`;
    private readonly _dtMonthGroup = '(?:\u1041[\u1040-\u1042\u101D]|[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1049\u104E])';
    private readonly _dtDayGroup = `(?:[\u1041-\u1042][${this._possibleNumber}]|\u1043[\u1040-\u1041\u101D]|[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1049\u104E])`;
    private readonly _dtHourGroup = `(?:[\u1040\u1041\u101D][${this._possibleNumber}]|\u1042[\u1040-\u1043\u101D]|[\u1041-\u1049\u104E])`;
    private readonly _dtMinuteSecondGroup = `(?:[\u1040-\u1045\u101D\u104E][${this._possibleNumber}]|[\u1041-\u1049\u104E])`;
    private readonly _dtTimeSeparatorGroup = `[${this._space}]?[:;\u1038][${this._space}]?`;
    private readonly _dtDateQuickRegExp = new RegExp(`^(?:[${this._possibleNumber}]{1,4})[${this._dtOrPhSeparator}${this._space}]*(?:[${this._possibleNumber}]{1,2})[${this._dtOrPhSeparator}${this._space}]*(?:[${this._possibleNumber}]{1,4})`);
    private readonly _dtDMYRegExp = new RegExp(`^${this._dtDayGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtMonthGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtYearGroup}`);
    private readonly _dtDMYWith2DigitYearRegExp = new RegExp(`^${this._dtDayGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtMonthGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtYear2DigitsGroup}`);
    private readonly _dtYMDRegExp = new RegExp(`^${this._dtYearGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtMonthGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtDayGroup}`);
    private readonly _dtMDYRegExp = new RegExp(`^${this._dtMonthGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtDayGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtYearGroup}`);
    private readonly _dtMDYWith2DigitYearRegExp = new RegExp(`^${this._dtMonthGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtDayGroup}[${this._dtOrPhSeparator}${this._space}]{1,3}${this._dtYear2DigitsGroup}`);
    private readonly _dtYMDIsoRegExp = new RegExp(`^(?:[\u1041\u1042][${this._possibleNumber}]{3,3})(?:[\u1040\u101D][\u1041-\u1049\u104E]|\u1041[\u1040-\u1042\u101D])(?:[\u1040\u101D][\u1041-\u1049\u104E]|[\u1041-\u1042][${this._possibleNumber}]|\u1043[\u1040-\u1041\u101D])`);
    private readonly _dtTimeRegExp = new RegExp(`^${this._dtHourGroup}(?:${this._dtTimeSeparatorGroup}${this._dtMinuteSecondGroup}){1,2}`);

    // Phone Number
    private readonly _phPlus = '+\uFF0B';
    private readonly _phStar = '*';
    private readonly _phHash = '#';
    private readonly _phSeparator = `${this._dtOrPhSeparator}${this._openingBracket}${this._closingBracket}`;
    private readonly _phRegExp = new RegExp(`^[${this._phPlus}]?(?:[${this._phSeparator}${this._space}${this._phStar}]*[${this._possibleNumber}]){3,}${this._phHash}?`);

    // Diacritics and AThet
    private readonly _diacriticsAndAThetRegExp = new RegExp(`^(?:(?:[\u102B-\u103E]*([${this._space}])?[\u1000-\u1021]\u103A)|(?:[\u102B-\u103E]+))`);

    extractNext(input: string, firstCp?: number): TextFragment | null {
        firstCp = firstCp == null ? input.codePointAt(0) : firstCp;
        if (!firstCp) {
            return null;
        }

        const inputLen = input.length;
        const isStartsWithNumber = firstCp >= 0x1040 && firstCp <= 0x1049;
        const isStartsWithPossibleNumber = !isStartsWithNumber && (firstCp === 0x101D || firstCp === 0x104E);

        if (isStartsWithNumber || isStartsWithPossibleNumber) {
            if (inputLen === 1) {
                return isStartsWithNumber ? {
                    matchedStr: input,
                    normalizedStr: input,
                    number: true,
                    numberStr: input
                } : null;
            }

            if (inputLen > 5) {
                const dateFragment = this.getDateFragment(input);
                if (dateFragment != null) {
                    return dateFragment;
                }
            }

            if (inputLen > 2) {
                const timeFragment = this.getTimeFragment(input);
                if (timeFragment != null) {
                    return timeFragment;
                }

                const phoneNumberFragment = this.getPhoneNumberFragment(input);
                if (phoneNumberFragment != null) {
                    return phoneNumberFragment;
                }
            }

            return this.getNumberGroupFragment(input);
        }

        // င (အင်္ဂါ / တင်း / တောင်း)
        if (inputLen > 3 && firstCp === 0x1004) {
            const ingaTinOrTaungAncientNumberFragment = this.getIngaTinOrTaungAncientNumberFragment(input, firstCp);
            if (ingaTinOrTaungAncientNumberFragment != null) {
                return ingaTinOrTaungAncientNumberFragment;
            }
        }

        // * + ＋
        if (inputLen > 3 && (firstCp === 0x002A || firstCp === 0x002B || firstCp === 0xFF0B)) {
            const phoneNumberFragment = this.getPhoneNumberFragment(input);
            if (phoneNumberFragment != null) {
                return phoneNumberFragment;
            }
        }

        // ( [ （ ［
        if (inputLen > 2 && (firstCp === 0x0028 || firstCp === 0x005B || firstCp === 0xFF08 || firstCp === 0xFF3B)) {
            const openingBracketsNumberFragment = this.getOpeningBracketsNumberFragment(input, firstCp);
            if (openingBracketsNumberFragment != null) {
                return openingBracketsNumberFragment;
            }
        }

        return null;
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

        const newMatchedStr = this.getMatchedStrWithU101DAndU104EEndCheck(matchedStr, rightStr);
        if (matchedStr.length !== newMatchedStr.length) {
            return null;
        }

        if (!this.isRightStrSafeForDateOrPhoneNumber(rightStr)) {
            return null;
        }

        const extractInfo = this.getDateExtractInfo(matchedStr, monthStart);
        if (extractInfo == null) {
            return null;
        }

        if (extractInfo.spaceIncluded && rightStr.length > 1 && (this._containSpaceRegExp.test(rightStr[0]))) {
            const rightStr2 = rightStr.substring(1);
            if (this.isRightStrPossibleNumber(rightStr2)) {
                return null;
            }
        }

        const fragment: TextFragment = {
            ...extractInfo,
            possibleDate: true
        };

        if (extractInfo.numberStr) {
            fragment.number = true;
        }

        return fragment;
    }

    private getTimeFragment(input: string): TextFragment | null {
        const m = input.match(this._dtTimeRegExp);

        if (m == null) {
            return null;
        }

        let matchedStr = m[0];
        const rightStr = input.substring(matchedStr.length);

        matchedStr = this.getMatchedStrWithU101DAndU104EEndCheck(matchedStr, rightStr);
        if (!matchedStr) {
            return null;
        }

        if (rightStr && !this.isRightStrSafeForTime(rightStr)) {
            return null;
        }

        const extractInfo = this.getTimeExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        return {
            ...extractInfo,
            possibleTime: true
        };
    }

    private getPhoneNumberFragment(input: string): TextFragment | null {
        const m = input.match(this._phRegExp);
        if (m == null) {
            return null;
        }

        let matchedStr = m[0];
        const rightStr = input.substring(matchedStr.length);

        matchedStr = this.getMatchedStrWithU101DAndU104EEndCheck(matchedStr, rightStr);
        if (!matchedStr) {
            return null;
        }

        if (!this.isRightStrSafeForDateOrPhoneNumber(rightStr)) {
            return null;
        }

        const extractInfo = this.getPhoneNumberExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        if (extractInfo.spaceIncluded && rightStr.length > 1 && (this._containSpaceRegExp.test(rightStr[0]))) {
            const rightStr2 = rightStr.substring(1);
            if (this.isRightStrPossibleNumber(rightStr2)) {
                return null;
            }
        }

        const fragment: TextFragment = {
            ...extractInfo,
            possiblePhoneNumber: true
        };

        if (extractInfo.numberStr) {
            fragment.number = true;
        }

        return fragment;
    }

    private getOpeningBracketsNumberFragment(input: string, firstCp: number): TextFragment | null {
        if (input.length > 4 && (firstCp === 0x0028 || firstCp === 0xFF08)) {
            const hsethaFragment = this.getNumberHsethaFragment(input);
            if (hsethaFragment != null) {
                return hsethaFragment;
            }
        }

        if (input.length > 4) {
            const phoneNumberFragment = this.getPhoneNumberFragment(input);
            if (phoneNumberFragment != null) {
                return phoneNumberFragment;
            }
        }

        const m = input.match(this._numberBracketsRegExp);

        if (m == null) {
            return null;
        }

        let matchedStr = m[0];
        const rightStr = input.substring(matchedStr.length);
        matchedStr = this.getMatchedStrWithU101DAndU104EEndCheck(matchedStr, rightStr);
        if (!matchedStr) {
            return null;
        }

        const extractInfo = this.getBracketsNumberExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        return {
            ...extractInfo,
            number: true
        };
    }

    private getIngaTinOrTaungAncientNumberFragment(input: string, firstCp: number): TextFragment | null {
        const ingaFragment = this.getNumberIngaFragment(input, firstCp);
        if (ingaFragment != null) {
            return ingaFragment;
        }

        return this.getNumberTinOrTaungFragment(input, firstCp);
    }

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

        if (input[4] !== '\u102B') {
            if (input.length < 6 || input[5] !== '\u102B' || !this._containSpaceRegExp.test(input[4])) {
                return null;
            }

            matchedStr += input[4] + input[5];
            normalizedStr += input[5];
            spaceIncluded = true;
        } else {
            matchedStr += input[4];
            normalizedStr += input[4];
        }

        const rightStr = input.substring(matchedStr.length);
        const right1stCp = rightStr ? rightStr.codePointAt(0) : undefined;
        if (right1stCp && right1stCp >= 0x102B && right1stCp <= 0x103E) {
            return null;
        }

        const numberFragment: TextFragment = {
            matchedStr,
            normalizedStr,
            numberStr: c4,
            number: true,
            ancientWrittenForm: true,
            // အင်္ဂါ
            ancientMeasureWords: ['\u1021\u1004\u103A\u1039\u1002\u102B']
        };

        if (spaceIncluded) {
            numberFragment.spaceIncluded = true;

            numberFragment.normalizeReason = numberFragment.normalizeReason || {};
            numberFragment.normalizeReason.removeSpace = true;
        }

        return numberFragment;
    }

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
            number: true,
            ancientWrittenForm: true,
            numberStr: c4,
            // အင်္ဂါ
            ancientMeasureWords
        };
    }

    private getNumberHsethaFragment(input: string): TextFragment | null {
        const m = input.match(this._hsethaRegExp);
        if (m == null) {
            return null;
        }

        const matchedStr = m[0];

        const rightStr = input.substring(matchedStr.length);
        const right1stCp = rightStr ? rightStr.codePointAt(0) : undefined;
        if (right1stCp && right1stCp >= 0x102B && right1stCp <= 0x103E) {
            return null;
        }

        const extractInfo = this.getBracketsNumberExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        return {
            ...extractInfo,
            number: true,
            ancientWrittenForm: true,
            // ဆယ်သား
            ancientMeasureWords: ['\u1006\u101A\u103A\u101E\u102C\u1038']
        };
    }

    private getNumberGroupFragment(input: string): TextFragment | null {
        const m = input.match(this._numberGroupRegExp);
        if (m == null) {
            return null;
        }

        let matchedStr = m[0];
        const rightStr = input.substring(matchedStr.length);
        matchedStr = this.getMatchedStrWithU101DAndU104EEndCheck(matchedStr, rightStr);
        if (!matchedStr) {
            return null;
        }

        const extractInfo = this.getNumberGroupExtractInfo(matchedStr);
        if (extractInfo == null) {
            return null;
        }

        const numberFragment: TextFragment = {
            ...extractInfo,
            number: true
        };


        this.mergeAncientNumeralShortcutSuffixFragment(input, numberFragment);

        return numberFragment;
    }

    // tslint:disable-next-line: max-func-body-length
    private mergeAncientNumeralShortcutSuffixFragment(input: string, numberFragment: TextFragment): void {
        const rightStr = input.substring(numberFragment.matchedStr.length);
        if (!rightStr) {
            return;
        }

        const right1stCp = rightStr.codePointAt(0);
        if (!right1stCp) {
            return;
        }

        const ingaTinOrTaungAncientNumberFragment = this.getIngaTinOrTaungAncientNumberFragment(rightStr, right1stCp);
        if (ingaTinOrTaungAncientNumberFragment != null) {
            numberFragment.matchedStr += ingaTinOrTaungAncientNumberFragment.matchedStr;
            numberFragment.normalizedStr += ingaTinOrTaungAncientNumberFragment.normalizedStr;
            numberFragment.numberStr += ingaTinOrTaungAncientNumberFragment.numberStr || '';
            numberFragment.ancientWrittenForm = true;
            numberFragment.ancientMeasureWords = ingaTinOrTaungAncientNumberFragment.ancientMeasureWords;

            if (ingaTinOrTaungAncientNumberFragment.spaceIncluded) {
                numberFragment.spaceIncluded = true;
            }

            if (ingaTinOrTaungAncientNumberFragment.normalizeReason) {
                numberFragment.normalizeReason = {
                    ...numberFragment.normalizeReason,
                    ...ingaTinOrTaungAncientNumberFragment.normalizeReason
                };
            }

            return;
        }

        const diacriticsOrAThetMatch = rightStr.match(this._diacriticsAndAThetRegExp);
        if (diacriticsOrAThetMatch == null) {
            return;
        }

        const diacriticsOrAThetMatchedStr = diacriticsOrAThetMatch[0];
        const spaceIncluded = diacriticsOrAThetMatch[1] ? true : false;
        const diacriticsOrAThetNormalizedStr = spaceIncluded ?
            diacriticsOrAThetMatchedStr.replace(this._containSpaceRegExp, '') : diacriticsOrAThetMatchedStr;

        let ancientMeasureWords: string[] | undefined;

        if (diacriticsOrAThetNormalizedStr === '\u103D\u1031\u1038' || diacriticsOrAThetNormalizedStr === '\u103D\u1031') {
            // ရွေး
            ancientMeasureWords = ['\u101B\u103D\u1031\u1038'];
        } else if (diacriticsOrAThetNormalizedStr === '\u102D') {
            // ကျပ် / စိတ် / မိုက်
            ancientMeasureWords = [
                '\u1000\u103B\u1015\u103A',
                '\u1005\u102D\u1010\u103A',
                '\u1019\u102D\u102F\u1000\u103A'
            ];
        } else if (diacriticsOrAThetNormalizedStr === '\u103D\u102C') {
            // ထွာ
            ancientMeasureWords = ['\u1011\u103D\u102C'];
        } else if (diacriticsOrAThetNormalizedStr === '\u1032') {
            // ပဲ / စလယ် / ပယ်
            ancientMeasureWords = [
                '\u1015\u1032',
                '\u1005\u101C\u101A\u103A',
                '\u1015\u101A\u103A'
            ];
        } else if (diacriticsOrAThetNormalizedStr === '\u1030\u1038' || diacriticsOrAThetNormalizedStr === '\u1030') {
            // မူး
            ancientMeasureWords = ['\u1019\u1030\u1038'];
        } else if (diacriticsOrAThetNormalizedStr === '\u1036') {
            // လက်သစ် / မတ်
            ancientMeasureWords = [
                '\u101C\u1000\u103A\u101E\u1005\u103A',
                '\u1019\u1010\u103A'
            ];
        } else if (diacriticsOrAThetNormalizedStr === '\u103B\u1000\u103A') {
            // လမျက်
            ancientMeasureWords = ['\u101C\u1019\u103B\u1000\u103A'];
        } else if (diacriticsOrAThetNormalizedStr === '\u101A\u103A') {
            // လမယ်
            ancientMeasureWords = ['\u101C\u1019\u101A\u103A'];
        } else if (diacriticsOrAThetNormalizedStr === '\u103D\u1000\u103A') {
            // ခွက်
            ancientMeasureWords = ['\u1001\u103D\u1000\u103A'];
        } else if (diacriticsOrAThetNormalizedStr === '\u103A') {
            // ပြည်
            ancientMeasureWords = ['\u1015\u103C\u100A\u103A'];
        } else if (diacriticsOrAThetNormalizedStr === '\u103D\u1032') {
            // ခွဲ
            ancientMeasureWords = ['\u1001\u103D\u1032'];
        } else if (diacriticsOrAThetNormalizedStr === '\u102B') {
            // ပိဿာ
            ancientMeasureWords = ['\u1015\u102D\u103F\u102C'];
        } else if (diacriticsOrAThetNormalizedStr === '\u102B\u1038') {
            // ပြား / ပါး
            ancientMeasureWords = [
                '\u1015\u103C\u102C\u1038',
                '\u1015\u102B\u1038'
            ];
        }

        if (!ancientMeasureWords || !ancientMeasureWords.length) {
            return;
        }

        numberFragment.matchedStr += diacriticsOrAThetMatchedStr;
        numberFragment.normalizedStr += diacriticsOrAThetNormalizedStr;
        numberFragment.ancientWrittenForm = true;
        numberFragment.ancientMeasureWords = ancientMeasureWords;

        if (spaceIncluded) {
            numberFragment.spaceIncluded = true;
            numberFragment.normalizeReason = numberFragment.normalizeReason || {};
            numberFragment.normalizeReason.removeSpace = true;
        }
    }

    // tslint:disable-next-line: max-func-body-length
    private getDateExtractInfo(matchedStr: string, monthStart?: boolean): ExtractInfo | null {
        const extractInfo: ExtractInfo = {
            matchedStr,
            normalizedStr: ''
        };

        let prevIsDigit = false;
        let prevIsSpace = false;
        let prevIsSeparator = false;
        let dateSeparator: string | undefined;
        let digitCount = 0;

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                extractInfo.normalizedStr += c;
                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (cp === 0x101D || cp === 0x104E) {
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};

                if (cp === 0x101D) {
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.normalizeReason.changeU101DToU1040 = true;
                } else {
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.normalizeReason.changeU104EToU1044 = true;
                }

                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (this._containSpaceRegExp.test(c)) {
                if (prevIsSpace) {
                    return null;
                }

                extractInfo.spaceIncluded = true;

                if (prevIsSeparator) {
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.removeSpace = true;
                } else {
                    extractInfo.normalizedStr += ' ';

                    if (cp !== 0x0020) {
                        extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                        extractInfo.normalizeReason.normalizeSpace = true;
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
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.removeSpace = true;
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
        } else if (extractInfo.spaceIncluded) {
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
            extractInfo.numberStr = extractInfo.normalizedStr;
        }

        return extractInfo;
    }

    private getTimeExtractInfo(matchedStr: string): ExtractInfo | null {
        const extractInfo: ExtractInfo = {
            matchedStr,
            normalizedStr: ''
        };

        let digitCount = 0;
        let colonSeparatorCount = 0;

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                extractInfo.normalizedStr += c;
            } else if (cp === 0x101D || cp === 0x104E) {
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};

                if (cp === 0x101D) {
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.normalizeReason.changeU101DToU1040 = true;
                } else {
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.normalizeReason.changeU104EToU1044 = true;
                }
            } else if (this._containSpaceRegExp.test(c)) {
                extractInfo.spaceIncluded = true;

                extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                extractInfo.normalizeReason.removeSpace = true;
            } else {
                extractInfo.normalizedStr += ':';
                if (cp === 0x003A) {
                    ++colonSeparatorCount;
                } else {
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.normalizeColon = true;

                    if (cp === 0x1038) {
                        ++colonSeparatorCount;
                    }
                }
            }
        }

        if (!digitCount || !colonSeparatorCount) {
            return null;
        }

        return extractInfo;
    }

    // tslint:disable-next-line: max-func-body-length
    private getPhoneNumberExtractInfo(matchedStr: string): ExtractInfo | null {
        const extractInfo: ExtractInfo = {
            matchedStr,
            normalizedStr: ''
        };

        let numberStr = '';
        let numberGroup = true;
        let numberSeparator = '';
        let curStr = matchedStr;
        let startOfString = true;
        let prevIsDigit = false;
        let prevIsSpace = false;
        let digitCount = 0;
        let possibleDigitCount = 0;
        let dotCount = 0;
        let slashCount = 0;

        if (curStr[0] === '+' || curStr[0] === '\uFF0B') {
            extractInfo.normalizedStr += '+';
            if (curStr[0] !== '+') {
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                extractInfo.normalizeReason.normalizePlusSign = true;
            }

            curStr = curStr.substring(1);
            startOfString = false;
            numberGroup = false;
        }

        for (let i = 0; i < curStr.length; i++) {
            const c = curStr[i];
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                ++possibleDigitCount;
                extractInfo.normalizedStr += c;
                numberStr += c;
                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x101D || cp === 0x104E) {
                ++possibleDigitCount;
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                if (cp === 0x101D) {
                    extractInfo.normalizedStr += '\u1040';
                    numberStr += '\u1040';
                    extractInfo.normalizeReason.changeU101DToU1040 = true;
                } else {
                    extractInfo.normalizedStr += '\u1044';
                    numberStr += '\u1044';
                    extractInfo.normalizeReason.changeU104EToU1044 = true;
                }

                prevIsDigit = true;
                prevIsSpace = false;
            } else if (cp === 0x002A) {
                if (!prevIsDigit && !startOfString) {
                    return null;
                }

                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
                numberGroup = false;
            } else if (cp === 0x0023) {
                if (!prevIsDigit) {
                    return null;
                }

                extractInfo.normalizedStr += c;
                numberGroup = false;
                break;
            } else if (cp === 0x0028 || cp === 0x005B || cp === 0xFF08 || cp === 0xFF3B) {
                if (!this.hasCorrectClosingBracket(cp, curStr.substring(i + 1))) {
                    return null;
                }

                extractInfo.normalizedStr += c;
                prevIsDigit = false;
                prevIsSpace = false;
                numberGroup = false;
            } else if (this._containSpaceRegExp.test(c)) {
                if (prevIsSpace) {
                    return null;
                }

                extractInfo.spaceIncluded = true;
                if (this._visibleSpaceRegExp.test(c)) {
                    extractInfo.normalizedStr += ' ';
                    if (cp !== 0x0020) {
                        extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                        extractInfo.normalizeReason.normalizeSpace = true;
                    }
                } else {
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.removeSpace = true;
                }

                prevIsDigit = false;
                prevIsSpace = true;
            } else {
                if (!prevIsDigit && !prevIsSpace && !startOfString) {
                    return null;
                }

                if (this._thousandSeparatorRegExp.test(c)) {
                    if (numberSeparator && numberSeparator !== c) {
                        numberGroup = false;
                    } else {
                        numberSeparator = c;
                    }

                    extractInfo.normalizedStr += c;
                } else if (cp === 0x002E || cp === 0x00B7 || cp === 0x02D9) {
                    ++dotCount;
                    if (dotCount > 1) {
                        numberGroup = false;
                    } else {
                        numberStr += '.';
                    }

                    extractInfo.normalizedStr += '.';

                    if (cp !== 0x002E) {
                        extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                        extractInfo.normalizeReason.normalizeDecimalPoint = true;
                    }
                } else {
                    if (cp === 0x002F) {
                        ++slashCount;
                    }

                    numberGroup = false;
                    extractInfo.normalizedStr += c;
                }

                prevIsDigit = false;
                prevIsSpace = false;
            }

            startOfString = false;
        }

        if (!digitCount) {
            return null;
        }

        if (extractInfo.normalizedStr[0] === '*' && extractInfo.normalizedStr[extractInfo.normalizedStr.length - 1] !== '#') {
            return null;
        }

        if (numberGroup) {
            extractInfo.numberStr = numberStr;
            if (numberSeparator) {
                extractInfo.numberSeparator = numberSeparator;
            }
        }

        if (dotCount === 1 && extractInfo.normalizedStr[0] !== '+' &&
            extractInfo.normalizedStr[0] !== '*' &&
            extractInfo.normalizedStr[0] !== '\u1040') {
            return null;
        }

        if (slashCount === 1 && possibleDigitCount + 1 === extractInfo.normalizedStr.length &&
            possibleDigitCount < 8 && extractInfo.normalizedStr[0] !== '\u1040') {
            return null;
        }

        return extractInfo;
    }

    // tslint:disable-next-line: max-func-body-length
    private getNumberGroupExtractInfo(matchedStr: string): ExtractInfo | null {
        const extractInfo: ExtractInfo = {
            matchedStr,
            normalizedStr: '',
            numberStr: ''
        };

        let prevIsDigit = false;
        let prevIsSpace = false;
        let prevIsSeparator = false;
        let numberSeparator = '';
        let digitCount = 0;
        let tmpSpace = '';

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                extractInfo.numberStr += c;
                if (tmpSpace) {
                    extractInfo.spaceIncluded = true;
                    extractInfo.normalizedStr += ' ' + c;
                    if (tmpSpace !== ' ') {
                        extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                        extractInfo.normalizeReason.normalizeSpace = true;
                    }

                    tmpSpace = '';
                } else {
                    extractInfo.normalizedStr += c;
                }

                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (cp === 0x101D || cp === 0x104E) {
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};

                if (cp === 0x101D) {
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.numberStr += '\u1040';
                    extractInfo.normalizeReason.changeU101DToU1040 = true;
                } else {
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.numberStr += '\u1044';
                    extractInfo.normalizeReason.changeU104EToU1044 = true;
                }

                prevIsDigit = true;
                prevIsSpace = false;
                prevIsSeparator = false;
            } else if (this._containSpaceRegExp.test(c)) {
                if (prevIsSpace) {
                    return null;
                }

                extractInfo.spaceIncluded = true;

                if (prevIsSeparator) {
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.removeSpace = true;
                    tmpSpace = '';
                } else {
                    tmpSpace = c;
                }

                prevIsDigit = false;
                prevIsSpace = true;
                prevIsSeparator = false;
            } else {
                if (prevIsSeparator || (!prevIsDigit && !prevIsSpace && numberSeparator && c !== numberSeparator)) {
                    return null;
                }

                if (prevIsSpace) {
                    tmpSpace = '';
                    extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                    extractInfo.normalizeReason.removeSpace = true;
                }

                if (cp === 0x002E || cp === 0x00B7 || cp === 0x02D9) {
                    extractInfo.numberStr += '.';
                    extractInfo.normalizedStr += '.';

                    if (cp !== 0x002E) {
                        extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                        extractInfo.normalizeReason.normalizeDecimalPoint = true;
                    }
                } else {
                    extractInfo.normalizedStr += c;
                    numberSeparator = c;
                }

                prevIsDigit = false;
                prevIsSpace = false;
                prevIsSeparator = true;
            }
        }

        if (!digitCount) {
            return null;
        }

        if (numberSeparator) {
            extractInfo.numberSeparator = numberSeparator;
        }

        return extractInfo;
    }

    private getBracketsNumberExtractInfo(matchedStr: string): ExtractInfo | null {
        const extractInfo: ExtractInfo = {
            matchedStr,
            normalizedStr: '',
            numberStr: ''
        };

        let digitCount = 0;

        for (let i = 0; i < matchedStr.length; i++) {
            const c = matchedStr[i];
            const cp = c.codePointAt(0) as number;

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++digitCount;
                extractInfo.normalizedStr += c;
                extractInfo.numberStr += c;
            } else if (cp === 0x101D || cp === 0x104E) {
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                if (cp === 0x101D) {
                    extractInfo.normalizedStr += '\u1040';
                    extractInfo.numberStr += '\u1040';
                    extractInfo.normalizeReason.changeU101DToU1040 = true;
                } else {
                    extractInfo.normalizedStr += '\u1044';
                    extractInfo.numberStr += '\u1044';
                    extractInfo.normalizeReason.changeU104EToU1044 = true;
                }
            } else if (cp === 0x0028 || cp === 0x005B || cp === 0xFF08 || cp === 0xFF3B) {
                if (!this.hasCorrectClosingBracket(cp, matchedStr.substring(i + 1))) {
                    return null;
                }

                extractInfo.normalizedStr += c;
            } else if (this._containSpaceRegExp.test(c)) {
                extractInfo.spaceIncluded = true;
                extractInfo.normalizeReason = extractInfo.normalizeReason || {};
                extractInfo.normalizeReason.removeSpace = true;
            } else {
                extractInfo.normalizedStr += c;
            }
        }

        if (!digitCount) {
            return null;
        }

        return extractInfo;
    }

    private getMatchedStrWithU101DAndU104EEndCheck(matchedStr: string, rightStr: string): string {
        if (!rightStr) {
            return matchedStr;
        }

        const lastC = matchedStr[matchedStr.length - 1];
        if ((lastC === '\u101D' || lastC === '\u104E') && this._diacriticsAndAThetRegExp.test(rightStr)) {
            return matchedStr.substring(0, matchedStr.length - 1);
        }

        return matchedStr;
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

        if (this.isRightStrPossibleNumber(rightStr)) {
            return false;
        }

        const cp = rightStr.codePointAt(0);

        if (!cp) {
            return true;
        }

        // # $ % + @ ＋
        if ((cp >= 0x0023 && cp <= 0x0025) || cp === 0x002B || cp === 0x0040 || cp === 0xFF0B) {
            return false;
        }

        if (rightStr.length > 1 && ((cp >= 0x0021 && cp <= 0x002F) ||
            cp === 0x003A || (cp >= 0x003C && cp <= 0x003F) ||
            (cp >= 0x005B && cp <= 0x005F) || cp === 0x0060 ||
            (cp >= 0x007B && cp <= 0x007E))) {
            const rightStr2 = rightStr.substring(1);
            if (this.isRightStrPossibleNumber(rightStr2)) {
                return false;
            }
        }

        return true;
    }

    private isRightStrSafeForTime(rightStr: string): boolean {
        if (!rightStr) {
            return true;
        }

        if (this.isRightStrPossibleNumber(rightStr)) {
            return false;
        }

        const cp = rightStr.codePointAt(0);

        if (!cp) {
            return true;
        }

        if (rightStr.length > 1 && (cp === 0x0021 ||
            (cp >= 0x0023 && cp <= 0x0027) ||
            (cp >= 0x002A && cp <= 0x002F) ||
            (cp >= 0x003A && cp <= 0x003F) ||
            cp === 0x005C || cp === 0x005E || cp === 0x005F ||
            cp === 0x0060 || cp === 0x007C || cp === 0x007E)) {
            const rightStr2 = rightStr.substring(1);
            if (this.isRightStrPossibleNumber(rightStr2)) {
                return false;
            }
        }

        return true;
    }

    private isRightStrPossibleNumber(rightStr: string): boolean {
        if (!rightStr) {
            return false;
        }

        const cp = rightStr.codePointAt(0);
        if (!cp) {
            return false;
        }

        if (cp >= 0x1040 && cp <= 0x1049) {
            return true;
        }

        if (rightStr.length > 1 && (cp === 0x101D || cp === 0x104E) &&
            this._possibleNumberGroupStartsWithU101DOrU104ERegExp.test(rightStr)) {
            return true;
        }

        return false;
    }
}
