import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextExtractor } from '../../src/myanmar-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextExtractor#extractNext#phone-number', () => {
    let extractor: MyanmarTextExtractor;

    beforeEach(() => {
        extractor = new MyanmarTextExtractor();
    });

    describe('valid-international', () => {
        it(String.raw`should return phone number fragment when input '+၉၅၉'`, () => {
            const input = '+၉၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+၉၅ ၉'`, () => {
            const input = '+၉၅ ၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+၉ ၅ ၉'`, () => {
            const input = '+၉ ၅ ၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+(၉၅)၉'`, () => {
            const input = '+(၉၅)၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+(၉၅) ၉'`, () => {
            const input = '+(၉၅) ၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+[၉၅] ၉'`, () => {
            const input = '+[၉၅] ၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+၉၅.၉'`, () => {
            const input = '+၉၅.၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉'`, () => {
            const input = '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉'`, () => {
            const input = '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '+ ၉၅ . (၉) [၁၂၃] (၄၅၆) ၇၈၉'`, () => {
            const input = '+ ၉၅ . (၉) [၁၂၃] (၄၅၆) ၇၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('valid-local', () => {
        it(String.raw`should return phone number fragment when input '၉၉၉'`, () => {
            const input = '၉၉၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '၅၅၁၂၃'`, () => {
            const input = '၅၅၁၂၃';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return phone number fragment when input '၁ ၂၃၄ ၅၆၇'`, () => {
            const input = '၁ ၂၃၄ ၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('invalid', () => {
        it(String.raw`should return phone number fragment when input '+\u104E\u101D\u200B၁၂၃၄၅၆'`, () => {
            const input = '+\u104E\u101D\u200B၁၂၃၄၅၆';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '+၄၀၁၂၃၄၅၆',
                fragmentType: FragmentType.PossiblePhoneNumber,
                spaceDetected: true,
                normalizeReason: {
                    changeU101DToU1040: true,
                    changeU104EToU1044: true,
                    removeInvisibleSpace: true
                },
                invalidReason: {
                    invalidU101DInsteadOfU1040: true,
                    invalidU104EInsteadOfU1044: true,
                    invalidSpaceIncluded: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    // it(String.raw`should return number fragment with ERROR when input '၉၉\u101D'`, () => {
    //     const input = '၉၉\u101D';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၉၉၀',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၉၀',
    //         possiblePhoneNumber: true,
    //         error: {
    //             invalidU101DInsteadOfU1040: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '၉၉\u104E'`, () => {
    //     const input = '၉၉\u104E';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၉၉၄',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၉၄',
    //         possiblePhoneNumber: true,
    //         error: {
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '၉\u104E\u101D'`, () => {
    //     const input = '၉\u104E\u101D';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၉၄၀',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၄၀',
    //         possiblePhoneNumber: true,
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '\u101D၉၉'`, () => {
    //     const input = '\u101D၉၉';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၀၉၉',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၉၉',
    //         possiblePhoneNumber: true,
    //         error: {
    //             invalidU101DInsteadOfU1040: true
    //         }
    //     });
    // });
});
