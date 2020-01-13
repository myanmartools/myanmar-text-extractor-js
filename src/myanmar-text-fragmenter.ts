import { FragmentType } from './fragment-type';
import { TextFragment } from './text-fragment';

interface NormalizedTextInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;
}

interface NumberExtractInfo {
    normalizedStr: string;
    digitStr: string;
    digitCount: number;
    u101dCount: number;
    u104eCount: number;
    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;
    digitSeparatorIncluded?: boolean;
}

interface TextFragmentPartial {
    matchedStr: string;
    normalizedStr: string;

    spaceIncluded?: boolean;
    invisibleSpaceIncluded?: boolean;

    digitStr?: string;
    measureWords?: string[];
    numberOrderList?: boolean;
}

const rSpace = '\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF';
const rVisibleSpace = '\u0020\u00A0\u1680\u2000-\u2009\u202F\u205F\u3000';
// \u002E\u00B7\u02D9
const rDigitSeparator1 = `\u002C\u066B\u066C\u2396\u005F\u0027${rVisibleSpace}`;

export class MyanmarTextFragmenter {
    // private readonly _options: TextFragmenterOptions;
    private readonly _hsethaRegExp = new RegExp(`^[(][${rSpace}]?[\u1041-\u1049\u104E][${rSpace}]?[)][${rSpace}]?[\u101D\u1040]\u102D`);
    private readonly _numberParenthesisRegExp = new RegExp(`^[(][${rSpace}]?[\u101D\u1040-\u1049\u104E]+[${rSpace}]?[)]`);
    private readonly _orderListRegExp = new RegExp(`^[\u101D\u1040-\u1049\u104E]+[${rSpace}]?[)\u104A\u104B]`);
    private readonly _numberGroup1Regex = new RegExp(`^[\u1040-\u1049\u101D\u104E]{1,3}([${rDigitSeparator1}][\u1040-\u1049\u101D\u104E]{2,4})*([\u002E\u00B7][\u1040-\u1049\u101D\u104E]+)?`);

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
        const firstC = input[0];
        const firstCp = firstC.codePointAt(0);
        if (!firstCp) {
            return null;
        }

        // ဤ / ဪ
        if (firstCp === 0x1024 || firstCp === 0x102A) {
            return {
                matchedStr: firstC,
                normalizedStr: firstC,
                fragmentType: FragmentType.Text,
                uncombinableLetter: true,
                syllableIncluded: true
            };
        }

        // ၌ / ၍ / ၏
        if (firstCp === 0x104C || firstCp === 0x104D || firstCp === 0x104F) {
            return {
                matchedStr: firstC,
                normalizedStr: firstC,
                fragmentType: FragmentType.Punctuation,
                uncombinableLetter: true,
                syllableIncluded: true
            };
        }

        // ၊ / ။
        if (firstCp === 0x104A || firstCp === 0x104B) {
            return {
                matchedStr: firstC,
                normalizedStr: firstC,
                fragmentType: FragmentType.Punctuation,
                uncombinableLetter: true
            };
        }

        const numberFragment = this.getNumberFragment(input, firstCp, prevFragments);
        if (numberFragment != null) {
            return numberFragment;
        }

        return {
            matchedStr: '',
            normalizedStr: '',
            fragmentType: FragmentType.Unknown
        };
    }

    private getNumberFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        const preAncientNumberFragment = this.getPreAncientNumberFragment(input, firstCp);
        if (preAncientNumberFragment != null) {
            return preAncientNumberFragment;
        }

        if (firstCp === 0x0028 && input.length > 2) {
            return this.getNumberParenthesisOrOrderListFragment(input, firstCp, prevFragments);
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
                digitStr: input
            };
        }

        const orderListFragment = this.getNumberParenthesisOrOrderListFragment(input, firstCp, prevFragments);
        if (orderListFragment != null) {
            return orderListFragment;
        }

        return this.getNumberDigitGroupFragment(input);
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
                    ancient: true,
                    measureWords: suffixFragment.measureWords
                };

                if (suffixFragment.spaceIncluded || suffixFragment.invisibleSpaceIncluded) {
                    numberFragment.spaceIncluded = true;
                    numberFragment.error = numberFragment.error || {};
                    numberFragment.error.invalidSpaceIncluded = true;
                    numberFragment.error.invalidUnicodeForm = true;
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
            ancient: true,
            digitStr: c4,
            // အင်္ဂါ
            measureWords: ['\u1021\u1004\u103A\u1039\u1002\u102B']
        };

        if (spaceIncluded || invisibleSpaceIncluded) {
            numberFragment.spaceIncluded = true;
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidSpaceIncluded = true;
            numberFragment.error.invalidUnicodeForm = true;
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
            ancient: true,
            digitStr: c4,
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

        const numberExtractInfo = this.extractNumberInfo(normalizedStr);
        normalizedStr = numberExtractInfo.normalizedStr;

        if (numberExtractInfo.u101dCount &&
            (normalizedStr.length !== matchedStr.length || (rFirstCp && rFirstCp >= 0x1000 && rFirstCp <= 0x104E))) {
            return null;
        }

        const numberFragment: TextFragment = {
            matchedStr,
            normalizedStr,
            fragmentType: FragmentType.Number,
            ancient: true,
            digitStr: numberExtractInfo.digitStr,
            // ဆယ်သား
            measureWords: ['\u1006\u101A\u103A\u101E\u102C\u1038']
        };

        if (numberExtractInfo.u101dCount) {
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidU101DInsteadOfU1040 = true;
        }

        if (numberExtractInfo.u104eCount) {
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidU104EInsteadOfU1044 = true;
        }

        if (normalizedTextInfo && (normalizedTextInfo.spaceIncluded || normalizedTextInfo.invisibleSpaceIncluded)) {
            numberFragment.spaceIncluded = true;
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidSpaceIncluded = true;
        }

        return numberFragment;
    }

    private getNumberParenthesisOrOrderListFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        let m: RegExpMatchArray | null;
        if (firstCp === 0x0028) {
            m = input.match(this._numberParenthesisRegExp);
        } else {
            m = input.match(this._orderListRegExp);
        }

        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        const numberExtractInfo = this.extractNumberInfo(matchedStr);

        if (numberExtractInfo.u101dCount && !numberExtractInfo.digitCount) {
            return null;
        }

        if (numberExtractInfo.u104eCount && numberExtractInfo.digitStr === '\u1044') {
            if (!prevFragments) {
                return null;
            }

            let foundMatch = false;
            for (let i = prevFragments.length - 1; i === 0; i--) {
                const prevFragment = prevFragments[i];
                if (prevFragment.fragmentType !== FragmentType.Number) {
                    continue;
                }

                if (prevFragment.digitStr === '\u1043') {
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
            digitStr: numberExtractInfo.digitStr
        };

        if (numberExtractInfo.spaceIncluded) {
            textFragment.spaceIncluded = true;
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidSpaceIncluded = true;
        }

        if (numberExtractInfo.invisibleSpaceIncluded) {
            textFragment.spaceIncluded = true;
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidSpaceIncluded = true;
        }

        if (numberExtractInfo.u101dCount) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU101DInsteadOfU1040 = true;
        }

        if (numberExtractInfo.u104eCount) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU104EInsteadOfU1044 = true;
        }

        return textFragment;
    }

    private getNumberDigitGroupFragment(input: string): TextFragment | null {
        const m1 = input.match(this._numberGroup1Regex);
        if (m1 == null) {
            return null;
        }

        const matchedStr = m1[0];
        const numberExtractInfo = this.extractNumberInfo(matchedStr, true);
        if (!numberExtractInfo.digitCount) {
            return null;
        }

        const numberFragment: TextFragment = {
            matchedStr,
            fragmentType: FragmentType.Number,
            normalizedStr: numberExtractInfo.normalizedStr,
            digitStr: numberExtractInfo.digitStr
        };

        if (numberExtractInfo.digitSeparatorIncluded) {
            numberFragment.digitSeparatorIncluded = true;
        }

        if (numberExtractInfo.spaceIncluded || numberExtractInfo.invisibleSpaceIncluded) {
            numberFragment.spaceIncluded = true;
            if (numberExtractInfo.invisibleSpaceIncluded) {
                numberFragment.error = numberFragment.error || {};
                numberFragment.error.invalidSpaceIncluded = true;
            }
        }

        if (numberExtractInfo.u101dCount) {
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidU101DInsteadOfU1040 = true;
        }

        if (numberExtractInfo.u104eCount) {
            numberFragment.error = numberFragment.error || {};
            numberFragment.error.invalidU104EInsteadOfU1044 = true;
        }

        const rightStr = input.substring(matchedStr.length);
        const r1stCp = rightStr.length > 0 ? rightStr.codePointAt(0) : undefined;
        if (r1stCp) {
            const ancientFragment = this.getPreAncientNumberFragment(rightStr, r1stCp);
            if (ancientFragment != null) {
                numberFragment.matchedStr += ancientFragment.matchedStr;
                numberFragment.normalizedStr += ancientFragment.normalizedStr;
                numberFragment.digitStr = numberFragment.digitStr || '';
                numberFragment.digitStr += ancientFragment.digitStr || '';
                numberFragment.ancient = true;
                numberFragment.measureWords = ancientFragment.measureWords;

                if (ancientFragment.spaceIncluded) {
                    numberFragment.spaceIncluded = true;
                }

                if (ancientFragment.error) {
                    numberFragment.error = ancientFragment.error;
                }
            }
        }

        return numberFragment;
    }

    private extractNumberInfo(matchedStr: string, allowSpaceInNormalizedStr?: boolean): NumberExtractInfo {
        const extractNumberInfo: NumberExtractInfo = {
            normalizedStr: '',
            digitStr: '',
            digitCount: 0,
            u101dCount: 0,
            u104eCount: 0
        };

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;
            if (cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || (cp >= 0x2000 && cp <= 0x2009) ||
                cp === 0x202F || cp === 0x205F || cp === 0x3000) {
                extractNumberInfo.spaceIncluded = true;
                if (allowSpaceInNormalizedStr) {
                    extractNumberInfo.normalizedStr += '\u0020';
                }

                continue;
            }

            if (cp === 0x180E || cp === 0x200A || cp === 0x200B || cp === 0xFEFF) {
                extractNumberInfo.spaceIncluded = true;
                extractNumberInfo.invisibleSpaceIncluded = true;
                continue;
            }

            if (cp >= 0x1040 && cp <= 0x1049) {
                ++extractNumberInfo.digitCount;
                extractNumberInfo.digitStr += c;
                extractNumberInfo.normalizedStr += c;
            } else if (cp === 0x002C || cp === 0x066B || cp === 0x066C || cp === 0x2396) {
                // , ٫ ٬ ⎖
                extractNumberInfo.digitSeparatorIncluded = true;
                extractNumberInfo.normalizedStr += '\u002C';
            } else if (cp === 0x0027) {
                // '
                extractNumberInfo.digitSeparatorIncluded = true;
                extractNumberInfo.normalizedStr += c;
            } else if (cp === 0x005F) {
                // _
                extractNumberInfo.digitSeparatorIncluded = true;
                extractNumberInfo.normalizedStr += c;
            } else if (cp === 0x002E || cp === 0x00B7) {
                // . ·
                extractNumberInfo.digitSeparatorIncluded = true;
                extractNumberInfo.digitStr += '\u002E';
                extractNumberInfo.normalizedStr += '\u002E';
            } else if (cp === 0x101D) {
                ++extractNumberInfo.u101dCount;
                extractNumberInfo.digitStr += '\u1040';
                extractNumberInfo.normalizedStr += '\u1040';
            } else if (cp === 0x104E) {
                ++extractNumberInfo.u104eCount;
                extractNumberInfo.digitStr += '\u1044';
                extractNumberInfo.normalizedStr += '\u1044';
            } else {
                extractNumberInfo.normalizedStr += c;
            }
        }

        return extractNumberInfo;
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

            if (cp === 0x180E || cp === 0x200A || cp === 0x200B || cp === 0xFEFF) {
                if (tmpSpace) {
                    break;
                }

                tmpInvisibleIncluded = true;
                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || (cp >= 0x2000 && cp <= 0x2009) ||
                cp === 0x202F || cp === 0x205F || cp === 0x3000) {
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

    private getNormalizedTextInfo(str: string, upTo?: number, allChars?: boolean): NormalizedTextInfo {
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

            if (cp === 0x180E || cp === 0x200A || cp === 0x200B || cp === 0xFEFF) {
                if (tmpSpace) {
                    break;
                }

                tmpInvisibleIncluded = true;
                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || (cp >= 0x2000 && cp <= 0x2009) ||
                cp === 0x202F || cp === 0x205F || cp === 0x3000) {
                if (tmpSpace) {
                    break;
                }

                tmpSpace += c;
                curStr = curStr.substring(1);
                continue;
            }

            if (allChars ||
                (cp >= 0x1000 && cp <= 0x1021) ||
                (cp >= 0x1023 && cp <= 0x1027) ||
                (cp >= 0x1029 && cp <= 0x1049) ||
                cp === 0x104E) {
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
