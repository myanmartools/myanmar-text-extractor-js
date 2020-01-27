import { NumberGroupTextExtractor } from '../../src/number-group-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#number', () => {
    let extractor: NumberGroupTextExtractor;

    beforeEach(() => {
        extractor = new NumberGroupTextExtractor();
    });

    describe('single-number-input', () => {
        it(String.raw`should return number fragment when input '၀'`, () => {
            const input = '၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
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
                number: true,
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
                number: true,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('number-group', () => {
        it(String.raw`should return number fragment when input '၀၉'`, () => {
            const input = '၀၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၀'`, () => {
            const input = '၁၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၀၀'`, () => {
            const input = '၁၀၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: input,
                possiblePhoneNumber: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၀၀၀'`, () => {
            const input = '၁၀၀၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: input,
                possiblePhoneNumber: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with က
        it(String.raw`should return number fragment when input '၁၀၀၀က'`, () => {
            const input = '၁၀၀၀က';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၁၀၀၀',
                normalizedStr: '၁၀၀၀',
                number: true,
                numberStr: '၁၀၀၀',
                possiblePhoneNumber: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('number-group-with-separator', () => {
        it(String.raw`should return number fragment when input '၁,၀၀'`, () => {
            const input = '၁,၀၀';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
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
                number: true,
                numberStr: '၁၀၀၀',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၂၃၄,၅၆၇'`, () => {
            const input = '၁,၂၃၄,၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁⎖၂၃၄⎖၅၆၇'`, () => {
            const input = '၁⎖၂၃၄⎖၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: '⎖'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u066C
        it(String.raw`should return number fragment when input '၁٬၂၃၄٬၅၆၇'`, () => {
            const input = '၁٬၂၃၄٬၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: '٬'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input "၁'၂၃၄'၅၆၇"`, () => {
            const input = "၁'၂၃၄'၅၆၇";
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: "'"
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၂,၃၄,၅၆၇'`, () => {
            const input = '၁၂,၃၄,၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၂၃,၄၅၆၇'`, () => {
            const input = '၁၂၃,၄၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: ','
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ ၂၃၄ ၅၆၇'`, () => {
            const input = '၁ ၂၃၄ ၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                spaceIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁_၂၃၄_၅၆၇'`, () => {
            const input = '၁_၂၃၄_၅၆၇';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possiblePhoneNumber: true,
                number: true,
                numberStr: '၁၂၃၄၅၆၇',
                numberSeparator: '_'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('number-group-with-decimal-point', () => {
        it(String.raw`should return number fragment when input '၁,၉၉၉.၀၂'`, () => {
            const input = '၁,၉၉၉.၀၂';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
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
                number: true,
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
                number: true,
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
                number: true,
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
                number: true,
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
                number: true,
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
                number: true,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                spaceIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁၂,၃၄,၅၆၇.၈၉'`, () => {
            const input = '၁၂,၃၄,၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
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
                number: true,
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
                number: true,
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
                number: true,
                numberStr: '၁၂၃၄၅၆၇.၈၉',
                numberSeparator: ',',
                normalizeReason: {
                    normalizeDecimalPoint: true
                }
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
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('normalize', () => {
        it(String.raw`should return number fragment when input '၁,၉\u104E\u101D'`, () => {
            const input = '၁,၉\u104E\u101D';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁,၉၄၀',
                number: true,
                numberStr: '၁၉၄၀',
                numberSeparator: ',',
                normalizeReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၉\u104E\u101D.\u101D\u104E'`, () => {
            const input = '၁,၉\u104E\u101D.\u101D\u104E';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁,၉၄၀.၀၄',
                number: true,
                numberStr: '၁၉၄၀.၀၄',
                numberSeparator: ',',
                normalizeReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        it(String.raw`should NOT return number fragment with when input '\u104E'`, () => {
            const input = '\u104E';
            const fragment = extractor.extractNext(input);

            expect(fragment == null || !fragment.number).toBeTruthy();
        });

        it(String.raw`should NOT return number fragment with when input '\u101D'`, () => {
            const input = '\u101D';
            const fragment = extractor.extractNext(input);

            expect(fragment == null || !fragment.number).toBeTruthy();
        });

        it(String.raw`should NOT return number fragment with when input '\u104E\u101D'`, () => {
            const input = '\u101D\u104E';
            const fragment = extractor.extractNext(input);

            expect(fragment == null || !fragment.number).toBeTruthy();
        });

        it(String.raw`should NOT return number fragment with when input '\u104E,\u104E\u104E\u101D'`, () => {
            const input = '\u104E,\u104E\u104E\u101D';
            const fragment = extractor.extractNext(input);

            expect(fragment == null || !fragment.number).toBeTruthy();
        });
    });

    // it(String.raw`should return 'အင်္ဂါ' number fragment when input 'င်္၁ါ'`, () => {
    //     const input = 'င်္၁ါ';
    //     const fragment = extractor.extractNext(input) as TextFragment;

    //     expect(fragment.matchedStr).toBe(input,
    //         `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
    //     expect(fragment).toEqual({
    //         matchedStr: input,
    //         normalizedStr: input,
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
    //         numberStr: '၁',
    //         ancient: true,
    //         ancientMeasureWords: ['အင်္ဂါ'],
    //         spaceIncluded: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
    //         numberStr: '၁၀',
    //         ancient: true,
    //         ancientMeasureWords: ['ဆယ်သား'],
    //         spaceIncluded: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
    //         numberStr: '၉',
    //         spaceIncluded: true,
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
    //         number: true,
    //         numberStr: '၉',
    //         spaceIncluded: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
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
    //         number: true,
    //         numberStr: '၀၉',
    //         spaceIncluded: true,
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
    //         number: true,
    //         numberStr: '၀၉',
    //         spaceIncluded: true,
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
    //         number: true,
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
    //         number: true,
    //         numberStr: '၉၀၄',
    //         error: {
    //             invalidU101DInsteadOfU1040: true,
    //             invalidU104EInsteadOfU1044: true
    //         }
    //     });
    // });
});
