import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextExtractor } from '../../src/myanmar-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextExtractor#extractNext#number', () => {
    let extractor: MyanmarTextExtractor;

    beforeEach(() => {
        extractor = new MyanmarTextExtractor();
    });

    describe('single-char-input', () => {
        it(String.raw`should return number fragment when input '၀'`, () => {
            const input = '၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၅'`, () => {
            const input = '၅';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ၉
        it(String.raw`should return number fragment when input '၉'`, () => {
            const input = '၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('inga-tin-taung-ancient-number', () => {
        // င်္၁ါ
        it(String.raw`should return number fragment when input '\u1004\u103A\u1039\u1041\u102B'`, () => {
            const input = '\u1004\u103A\u1039\u1041\u102B';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('number-group', () => {
        it(String.raw`should return number fragment when input '၁၀'`, () => {
            const input = '၁၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၀၀'`, () => {
            const input = '၁,၀၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၀၀',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၀၀၀'`, () => {
            const input = '၁,၀၀၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၀၀၀',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၉၉၉.၀၂'`, () => {
            const input = '၁,၉၉၉.၀၂';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၉၉၉.၀၂',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၂၃၄,၅၆၇.၈၉'`, () => {
            const input = '၁,၂၃၄,၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁⎖၂၃၄⎖၅၆၇.၈၉'`, () => {
            const input = '၁⎖၂၃၄⎖၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: '⎖'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁٬၂၃၄٬၅၆၇.၈၉'`, () => {
            const input = '၁٬၂၃၄٬၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: '٬'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input "၁'၂၃၄'၅၆၇.၈၉"`, () => {
            const input = "၁'၂၃၄'၅၆၇.၈၉";
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: "'"
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁_၂၃၄_၅၆၇.၈၉'`, () => {
            const input = '၁_၂၃၄_၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: '_'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ ၂၃၄ ၅၆၇.၈၉'`, () => {
            const input = '၁ ၂၃၄ ၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                spaceDetected: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၂,၃၄,၅၆၇.၈၉'`, () => {
            const input = '၁၂,၃၄,၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၂၃,၄၅၆၇.၈၉'`, () => {
            const input = '၁၂၃,၄၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၃.၁၄၁၅၉၂၆၅၃၅'`, () => {
            const input = '၃.၁၄၁၅၉၂၆၅၃၅';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Number,
                numberStr: '၃.၁၄၁၅၉၂၆၅၃၅'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၂၃၄,၅၆၇\u00B7၈၉'`, () => {
            const input = '၁,၂၃၄,၅၆၇\u00B7၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
                fragmentType: FragmentType.Number,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: ',',
                normalizeReason: {
                    normalizeDecimalPoint: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });


    // it(String.raw`should NOT return number fragment with when input '\u104E,\u104E\u104E\u101D'`, () => {
    //     const input = '\u104E,\u104E\u104E\u101D';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    // });

    // it(String.raw`should return number fragment with ERROR when input '၁,၉\u104E\u101D'`, () => {
    //     const input = '၁,၉\u104E\u101D';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၁,၉၄၀',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁၉၄၀',
    //         numberStrnumberSeparatorIncluded: true,
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '၁,၉\u104E\u101D.\u101D\u104E'`, () => {
    //     const input = '၁,၉\u104E\u101D.\u101D\u104E';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၁,၉၄၀.၀၄',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁၉၄၀.၀၄',
    //         numberStrnumberSeparatorIncluded: true,
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });


    // it(String.raw`should return 'အင်္ဂါ' number fragment when input 'င်္၁ါ'`, () => {
    //     const input = 'င်္၁ါ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁',
    //         ancient: true,
    //         ancientMeasureWords: ['အင်္ဂါ']
    //     });
    // });

    // it(String.raw`should return 'အင်္ဂါ' number fragment when input '၂င်္၀ါ'`, () => {
    //     const input = '၂င်္၀ါ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၂၀',
    //         ancient: true,
    //         ancientMeasureWords: ['အင်္ဂါ']
    //     });
    // });

    // it(String.raw`should return 'အင်္ဂါ' number fragment when input '၁,၉၂င်္၀ါ'`, () => {
    //     const input = '၁,၉၂င်္၀ါ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁၉၂၀',
    //         ancient: true,
    //         ancientMeasureWords: ['အင်္ဂါ'],
    //         numberStrnumberSeparatorIncluded: true
    //     });
    // });

    // // invalid space
    // it(String.raw`should return 'အင်္ဂါ' number fragment with ERROR when input 'င်္၁ ါ'`, () => {
    //     const input = 'င်္၁ ါ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: 'င်္၁ါ',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁',
    //         ancient: true,
    //         ancientMeasureWords: ['အင်္ဂါ'],
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true,
    //             invalidUnicodeForm: true
    //         }
    //     });
    // });

    // it(String.raw`should return 'တင်း' / 'တောင်း' number fragment when input 'င်္၁'`, () => {
    //     const input = 'င်္၁';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁',
    //         ancient: true,
    //         ancientMeasureWords: ['တောင်း', 'တင်း']
    //     });
    // });

    // it(String.raw`should return 'ဆယ်သား' number fragment when input '(၁)၀ိ'`, () => {
    //     const input = '(၁)၀ိ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁၀',
    //         ancient: true,
    //         ancientMeasureWords: ['ဆယ်သား']
    //     });
    // });

    // it(String.raw`should return 'ဆယ်သား' number fragment with ERROR when input '( ၁ ) ၀ိ'`, () => {
    //     const input = '( ၁ ) ၀ိ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၁)၀ိ',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁၀',
    //         ancient: true,
    //         ancientMeasureWords: ['ဆယ်သား'],
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true
    //         }
    //     });
    // });

    // it(String.raw`should return 'ဆယ်သား' number fragment with ERROR when input '(\u104E)၀ိ'`, () => {
    //     const input = '(\u104E)၀ိ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၄)၀ိ',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၄၀',
    //         ancient: true,
    //         ancientMeasureWords: ['ဆယ်သား'],
    //         error: {
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment when input '(၁)'`, () => {
    //     const input = '(၁)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁'
    //     });
    // });

    // it(String.raw`should return number fragment when input '(၉၀)'`, () => {
    //     const input = '(၉၀)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၀'
    //     });
    // });

    // it(String.raw`should return number fragment when input '(၀၉)'`, () => {
    //     const input = '(၀၉)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၉'
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '( ၉ )'`, () => {
    //     const input = '( ၉ )';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၉)',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉',
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input \u200B '(​၉​)'`, () => {
    //     const input = '(​၉​)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၉)',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉',
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '(\u101D၁)'`, () => {
    //     const input = '(\u101D၁)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၀၁)',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၁',
    //         error: {
    //             invalidU101DInsteadOfU1040: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '(၉\u101D\u104E)'`, () => {
    //     const input = '(၉\u101D\u104E)';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '(၉၀၄)',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၀၄',
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment when input '၁။'`, () => {
    //     const input = '၁။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၁'
    //     });
    // });

    // it(String.raw`should return number fragment when input '၉၊'`, () => {
    //     const input = '၉၊';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉'
    //     });
    // });

    // it(String.raw`should return number fragment when input '၉၀။'`, () => {
    //     const input = '၉၀။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၀'
    //     });
    // });

    // it(String.raw`should return number fragment when input '၀၉။'`, () => {
    //     const input = '၀၉။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၉'
    //     });
    // });

    // it(String.raw`should return number fragmentwith ERROR when input '၀၉ ။'`, () => {
    //     const input = '၀၉ ။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၀၉။',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၉',
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input \u200B '၀၉​။'`, () => {
    //     const input = '၀၉​။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၀၉။',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၉',
    //         spaceDetected: true,
    //         error: {
    //             invalidSpaceIncluded: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '\u101D၁။'`, () => {
    //     const input = '\u101D၁။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၀၁။',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၀၁',
    //         error: {
    //             invalidU101DInsteadOfU1040: true
    //         }
    //     });
    // });

    // it(String.raw`should return number fragment with ERROR when input '၉\u101D\u104E။'`, () => {
    //     const input = '၉\u101D\u104E။';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: '၉၀၄။',
    //         fragmentType: FragmentType.Number,
    //         numberStr: '၉၀၄',
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });
});
