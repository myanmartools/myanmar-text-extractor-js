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

        // Normalize
        it(String.raw`should return number fragment when input '၁၉\u101D'`, () => {
            const input = '၁၉\u101D';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၉၀',
                number: true,
                numberStr: '၁၉၀',
                possiblePhoneNumber: true,
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

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

        // Normalize
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
        it(String.raw`should return number fragment when input 'င်္၁ါ'`, () => {
            const input = 'င်္၁ါ';
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

        it(String.raw`should return number fragment when input '၁င်္၀ါ'`, () => {
            const input = '၁င်္၀ါ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁,၉၂င်္၀ါ'`, () => {
            const input = '၁,၉၂င်္၀ါ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၉၂၀',
                numberSeparator: ',',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input 'င်္၁'`, () => {
            const input = 'င်္၁';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['တောင်း', 'တင်း']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        it(String.raw`should return number fragment when input '( ၁ ) ၀ိ'`, () => {
            const input = '( ၁ ) ၀ိ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၁)၀ိ',
                number: true,
                numberStr: '၁၀',
                ancientWrittenForm: true,
                spaceIncluded: true,
                ancientMeasureWords: ['ဆယ်သား'],
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(\u104E)၀ိ'`, () => {
            const input = '(\u104E)၀ိ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၄)၀ိ',
                number: true,
                numberStr: '၄၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ဆယ်သား'],
                normalizeReason: {
                    changeU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('other-ancient-number-shortcuts', () => {
        it(String.raw`should return number fragment when input '၁ွေ'`, () => {
            const input = '၁ွေ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ရွေး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ွေး'`, () => {
            const input = '၁ွေး';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ရွေး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ိ'`, () => {
            const input = '၁ိ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ကျပ်',
                    'စိတ်',
                    'မိုက်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ွာ'`, () => {
            const input = '၁ွာ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ထွာ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ဲ'`, () => {
            const input = '၁ဲ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ပဲ',
                    'စလယ်',
                    'ပယ်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ူ'`, () => {
            const input = '၁ူ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['မူး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ူး'`, () => {
            const input = '၁ူး';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['မူး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ံ'`, () => {
            const input = '၁ံ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'လက်သစ်',
                    'မတ်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁်'`, () => {
            const input = '၁်';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ပြည်']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ွဲ'`, () => {
            const input = '၁ွဲ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ခွဲ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ါ'`, () => {
            const input = '၁ါ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ပိဿာ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '၁ါး'`, () => {
            const input = '၁ါး';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ပြား',
                    'ပါး'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // it(String.raw`should return number fragment when input '၁ျက်'`, () => {
        //     const input = '၁ျက်';
        //     const actualFragment = extractor.extractNext(input) as TextFragment;
        //     const expactedFragment: TextFragment = {
        //         matchedStr: input,
        //         normalizedStr: input,
        //         number: true,
        //         numberStr: '၁',
        //         ancientWrittenForm: true,
        //         ancientMeasureWords: ['လမျက်']
        //     };

        //     expect(actualFragment).toEqual(expactedFragment);
        // });

        // it(String.raw`should return number fragment when input '၁ယ်'`, () => {
        //     const input = '၁ယ်';
        //     const actualFragment = extractor.extractNext(input) as TextFragment;
        //     const expactedFragment: TextFragment = {
        //         matchedStr: input,
        //         normalizedStr: input,
        //         number: true,
        //         numberStr: '၁',
        //         ancientWrittenForm: true,
        //         ancientMeasureWords: ['လမယ်']
        //     };

        //     expect(actualFragment).toEqual(expactedFragment);
        // });

        // it(String.raw`should return number fragment when input '၁ွက်'`, () => {
        //     const input = '၁ွက်';
        //     const actualFragment = extractor.extractNext(input) as TextFragment;
        //     const expactedFragment: TextFragment = {
        //         matchedStr: input,
        //         normalizedStr: input,
        //         number: true,
        //         numberStr: '၁',
        //         ancientWrittenForm: true,
        //         ancientMeasureWords: ['ခွက်']
        //     };

        //     expect(actualFragment).toEqual(expactedFragment);
        // });


    });

    describe('hsettha', () => {
        it(String.raw`should return number fragment when input '(၁)၀ိ'`, () => {
            const input = '(၁)၀ိ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ဆယ်သား']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('brackets', () => {
        it(String.raw`should return number fragment when input '(၁)'`, () => {
            const input = '(၁)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၁'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(၉၀)'`, () => {
            const input = '(၉၀)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၉၀'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(၀၉)'`, () => {
            const input = '(၀၉)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၀၉'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(၉၉၉)'`, () => {
            const input = '(၉၉၉)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                number: true,
                numberStr: '၉၉၉'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return number fragment when input '( ၁ )'`, () => {
            const input = '( ၁ )';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၁)',
                number: true,
                numberStr: '၁',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(\u200B၁\u200B)'`, () => {
            const input = '(\u200B၁\u200B)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၁)',
                number: true,
                numberStr: '၁',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(၉\u101D)'`, () => {
            const input = '(၉\u101D)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၉၀)',
                number: true,
                numberStr: '၉၀',
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return number fragment when input '(\u104E၉\u101D)'`, () => {
            const input = '(\u104E၉\u101D)';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '(၄၉၀)',
                number: true,
                numberStr: '၄၉၀',
                normalizeReason: {
                    changeU101DToU1040: true,
                    changeU104EToU1044: true
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
});
