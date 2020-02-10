import { NumberGroupTextExtractor } from '../../src/number-group-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#phone-number', () => {
    let extractor: NumberGroupTextExtractor;

    beforeEach(() => {
        extractor = new NumberGroupTextExtractor();
    });

    describe('international', () => {
        it(String.raw`should return fragment when input '+၉၅၉'`, () => {
            const input = '+၉၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅ ၉'`, () => {
            const input = '+၉၅ ၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉ ၅ ၉'`, () => {
            const input = '+၉ ၅ ၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+(၉၅)၉'`, () => {
            const input = '+(၉၅)၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+(၉၅) ၉'`, () => {
            const input = '+(၉၅) ၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+[၉၅] ၉'`, () => {
            const input = '+[၉၅] ၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅.၉'`, () => {
            const input = '+၉၅.၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉'`, () => {
            const input = '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉'`, () => {
            const input = '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+ ၉၅ . (၉) [၁၂၃] (၄၅၆) ၇၈၉'`, () => {
            const input = '+ ၉၅ . (၉) [၁၂၃] (၄၅၆) ၇၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၀၉၅၉'`, () => {
            const input = '၀၀၉၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၀၀)၉၅၉'`, () => {
            const input = '(၀၀)၉၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၀၉၅၉',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '\uFF0B၉၅၉'`, () => {
            const input = '\uFF0B၉၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '+၉၅၉',
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                normalizeReason: {
                    normalizePlusSign: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+\u104E\u101D\u200B၁၂၃၄၅၆'`, () => {
            const input = '+\u104E\u101D\u200B၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '+၄၀၁၂၃၄၅၆',
                possiblePhoneNumber: true,
                phoneNumberStr: '+၄၀၁၂၃၄၅၆',
                spaceIncluded: true,
                normalizeReason: {
                    changeU101DToU1040: true,
                    changeU104EToU1044: true,
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅\u00A0၉'`, () => {
            const input = '+၉၅\u00A0၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '+၉၅ ၉',
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    normalizeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '+၉၅\u200B၉'`, () => {
            const input = '+၉၅\u200B၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '+၉၅၉',
                possiblePhoneNumber: true,
                phoneNumberStr: '+၉၅၉',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('local', () => {
        it(String.raw`should return fragment when input '(၀၉)၁'`, () => {
            const input = '(၀၉)၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၉၁',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၀၉)၁၂၃၄၅၆'`, () => {
            const input = '(၀၉)၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၉၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၀၉) ၁၂၃၄၅၆'`, () => {
            const input = '(၀၉) ၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၉၁၂၃၄၅၆',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၀၉) ၁၂၃-၄၅၆'`, () => {
            const input = '(၀၉) ၁၂၃-၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၉၁၂၃၄၅၆',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '[၀၉]၁၂၃၄၅၆'`, () => {
            const input = '[၀၉]၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၉၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၉၉၉'`, () => {
            const input = '၉၉၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၅၅၁၂၃'`, () => {
            const input = '၅၅၁၂၃';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၁-၁၂၃၄၅၆'`, () => {
            const input = '၀၁-၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၁-၁၂၃-၄၅၆'`, () => {
            const input = '၀၁-၁၂၃-၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၁/၁၂၃၄၅၆'`, () => {
            const input = '၀၁/၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၁/၁၂၃-၄၅၆'`, () => {
            const input = '၀၁/၁၂၃-၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၁၂၃၄၅၆',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၀၁ / ၁၂၃၄၅၆'`, () => {
            const input = '၀၁ / ၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၁၂၃၄၅၆',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁_၂၃၄_၅၆၇'`, () => {
            const input = '၁_၂၃၄_၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇',
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                decimalSeparator: '_',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ ၂၃၄ ၅၆၇'`, () => {
            const input = '၁ ၂၃၄ ၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇',
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        it(String.raw`should return fragment when input '၉၉\u101D'`, () => {
            const input = '၉၉\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၉၉၀',
                possiblePhoneNumber: true,
                phoneNumberStr: '၉၉၀',
                decimal: true,
                decimalStr: '၉၉၀',
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u104E၉၉\u101D'`, () => {
            const input = '\u104E၉၉\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၄၉၉၀',
                possiblePhoneNumber: true,
                phoneNumberStr: '၄၉၉၀',
                decimal: true,
                decimalStr: '၄၉၉၀',
                normalizeReason: {
                    changeU101DToU1040: true,
                    changeU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('*-#', () => {
        it(String.raw`should return fragment when input '*၁၂၃#'`, () => {
            const input = '*၁၂၃#';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '*၁၂၃# \u101D'`, () => {
            const input = '*၁၂၃# \u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '*၁၂၃#',
                normalizedStr: '*၁၂၃#',
                possiblePhoneNumber: true,
                phoneNumberStr: '*၁၂၃#',
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '*၁၂၃ ၄၅၆# \u101D'`, () => {
            const input = '*၁၂၃ ၄၅၆# \u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '*၁၂၃ ၄၅၆#',
                normalizedStr: '*၁၂၃ ၄၅၆#',
                possiblePhoneNumber: true,
                phoneNumberStr: '*၁၂၃၄၅၆#',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        // \u104E
        it(String.raw`should NOT return fragment when input '၁၂၎င်း'`, () => {
            const input = '၁၂၎င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        // \u101D
        it(String.raw`should NOT return fragment when input '၁၂ဝိ'`, () => {
            const input = '၁၂ဝိ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        // \u101D
        it(String.raw`should NOT return fragment when input '၁၂-ဝိ'`, () => {
            const input = '၁၂-ဝိ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        // \u101D
        it(String.raw`should NOT return fragment when input '၁၂၃-ဝိ'`, () => {
            const input = '၁၂၃-ဝိ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '*၁၂၃'`, () => {
            const input = '*၁၂၃';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂ * ၃'`, () => {
            const input = '၁၂ * ၃';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂၃ ၄၉၆# ၁'`, () => {
            const input = '၁၂၃ ၄၉၆# ၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possiblePhoneNumber).toBeTruthy();
        });
    });
});
