import { NumberGroupTextExtractor } from '../../src/number-group-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#decimal', () => {
    let extractor: NumberGroupTextExtractor;

    beforeEach(() => {
        extractor = new NumberGroupTextExtractor();
    });

    describe('decimal', () => {
        it(String.raw`should return fragment when input '၀၉'`, () => {
            const input = '၀၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀'`, () => {
            const input = '၁၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀'`, () => {
            const input = '၁၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀'`, () => {
            const input = '၁၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀၀၀၀'`, () => {
            const input = '၁၀၀၀၀၀၀၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၉၈၇၆၅၄၃၂၁၀'`, () => {
            const input = '၉၈၇၆၅၄၃၂၁၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                possiblePhoneNumber: true,
                phoneNumberStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ၊
        it(String.raw`should return fragment when input '၁၊'`, () => {
            const input = '၁၊';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁',
                normalizedStr: '၁',
                decimal: true,
                decimalStr: '၁'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with .
        it(String.raw`should return fragment when input '၁.'`, () => {
            const input = '၁.';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁',
                normalizedStr: '၁',
                decimal: true,
                decimalStr: '၁'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with .
        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀၀.'`, () => {
            const input = '၁၀၀၀၀၀၀၀.';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁၀၀၀၀၀၀၀',
                normalizedStr: '၁၀၀၀၀၀၀၀',
                decimal: true,
                decimalStr: '၁၀၀၀၀၀၀၀',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၀၀၀၀၀၀၀'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with က
        it(String.raw`should return fragment when input '၁၀က'`, () => {
            const input = '၁၀က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁၀',
                normalizedStr: '၁၀',
                decimal: true,
                decimalStr: '၁၀'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ၎င်း
        it(String.raw`should return fragment when input '၁၎င်း'`, () => {
            const input = '၁၎င်း';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁',
                normalizedStr: '၁',
                decimal: true,
                decimalStr: '၁'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '၁\u104E'`, () => {
            const input = '၁\u104E';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၄',
                decimal: true,
                decimalStr: '၁၄',
                normalizeReason: {
                    changeU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၉\u101D'`, () => {
            const input = '၁၉\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၉၀',
                decimal: true,
                decimalStr: '၁၉၀',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၉၀',
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u101D၁၉'`, () => {
            const input = '\u101D၁၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၀၁၉',
                decimal: true,
                decimalStr: '၀၁၉',
                possiblePhoneNumber: true,
                phoneNumberStr: '၀၁၉',
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Not
        //
        it(String.raw`should NOT return fragment with when input '၁'`, () => {
            const input = '၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        it(String.raw`should NOT return fragment with when input '\u104E\u101D'`, () => {
            const input = '\u101D\u104E';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });

        it(String.raw`should NOT return fragment with when input '\u104E၄င်း'`, () => {
            const input = '\u104E၄င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });

        it(String.raw`should NOT return fragment with when input '\u104E\u101D၀ု'`, () => {
            const input = '\u104E\u101D၀ု';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });
    });

    describe('decimal-with-separator', () => {
        it(String.raw`should return fragment when input '၁,၀၀'`, () => {
            const input = '၁,၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၀၀',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၀၀၀'`, () => {
            const input = '၁,၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၀၀၀',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၂၃၄,၅၆၇'`, () => {
            const input = '၁,၂၃၄,၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁⎖၂၃၄⎖၅၆၇'`, () => {
            const input = '၁⎖၂၃၄⎖၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: '⎖',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u066C
        it(String.raw`should return fragment when input '၁٬၂၃၄٬၅၆၇'`, () => {
            const input = '၁٬၂၃၄٬၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: '٬',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input "၁'၂၃၄'၅၆၇"`, () => {
            const input = "၁'၂၃၄'၅၆၇";
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: "'",
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂,၃၄,၅၆၇'`, () => {
            const input = '၁၂,၃၄,၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂၃,၄၅၆၇'`, () => {
            const input = '၁၂၃,၄၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                thousandSeparator: ',',
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
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇',
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
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇',
                thousandSeparator: '_',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '၁, ၀၀၀'`, () => {
            const input = '၁, ၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၀၀၀',
                decimal: true,
                decimalStr: '၁၀၀၀',
                thousandSeparator: ',',
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁\u00A0၂၃၄\u00A0၅၆၇'`, () => {
            const input = '၁\u00A0၂၃၄\u00A0၅၆၇';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁ ၂၃၄ ၅၆၇',
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇',
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    normalizeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,\u200B၀၀၀'`, () => {
            const input = '၁,\u200B၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၀၀၀',
                decimal: true,
                decimalStr: '၁၀၀၀',
                thousandSeparator: ',',
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ , ၀၀၀'`, () => {
            const input = '၁ , ၀၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၀၀၀',
                decimal: true,
                decimalStr: '၁၀၀၀',
                thousandSeparator: ',',
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၉\u104E\u101D'`, () => {
            const input = '၁,၉\u104E\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၉၄၀',
                decimal: true,
                decimalStr: '၁၉၄၀',
                thousandSeparator: ',',
                separatorIncluded: true,
                normalizeReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၉\u104E\u101D.\u101D\u104E'`, () => {
            const input = '၁,၉\u104E\u101D.\u101D\u104E';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၉၄၀.၀၄',
                decimal: true,
                decimalStr: '၁၉၄၀.၀၄',
                thousandSeparator: ',',
                separatorIncluded: true,
                normalizeReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Not
        //
        it(String.raw`should NOT return fragment with when input '\u104E,\u104E\u104E\u101D'`, () => {
            const input = '\u104E,\u104E\u104E\u101D';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });
    });

    describe('decimal-with-point', () => {
        it(String.raw`should return fragment when input '၁.၂'`, () => {
            const input = '၁.၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၃.၁၄၁၅၉၂၆၅၃၅'`, () => {
            const input = '၃.၁၄၁၅၉၂၆၅၃၅';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၃.၁၄၁၅၉၂၆၅၃၅',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀.၀၂'`, () => {
            const input = '၁၀.၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀.၀၂'`, () => {
            const input = '၁၀၀.၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀.၀၂'`, () => {
            const input = '၁၀၀၀.၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၀၀၀၀၀၀.၀၀၂'`, () => {
            const input = '၁၀၀၀၀၀၀.၀၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: input,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('decimal-with-separator-and-point', () => {
        it(String.raw`should return fragment when input '၁,၉၉၉.၀၂'`, () => {
            const input = '၁,၉၉၉.၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၉၉၉.၀၂',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၂၃၄,၅၆၇.၈၉'`, () => {
            const input = '၁,၂၃၄,၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁⎖၂၃၄⎖၅၆၇.၈၉'`, () => {
            const input = '၁⎖၂၃၄⎖၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: '⎖',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁٬၂၃၄٬၅၆၇.၈၉'`, () => {
            const input = '၁٬၂၃၄٬၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: '٬',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input "၁'၂၃၄'၅၆၇.၈၉"`, () => {
            const input = "၁'၂၃၄'၅၆၇.၈၉";
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: "'",
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁_၂၃၄_၅၆၇.၈၉'`, () => {
            const input = '၁_၂၃၄_၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: '_',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇၈၉',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ ၂၃၄ ၅၆၇.၈၉'`, () => {
            const input = '၁ ၂၃၄ ၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                possiblePhoneNumber: true,
                phoneNumberStr: '၁၂၃၄၅၆၇၈၉',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂,၃၄,၅၆၇.၈၉'`, () => {
            const input = '၁၂,၃၄,၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂၃,၄၅၆၇.၈၉'`, () => {
            const input = '၁၂၃,၄၅၆၇.၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: ',',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '၁,၉၉၉ . ၀၂'`, () => {
            const input = '၁,၉၉၉ . ၀၂';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၉၉၉.၀၂',
                decimal: true,
                decimalStr: '၁၉၉၉.၀၂',
                thousandSeparator: ',',
                separatorIncluded: true,
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၂၃၄,၅၆၇\u00B7၈၉'`, () => {
            const input = '၁,၂၃၄,၅၆၇\u00B7၈၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
                decimal: true,
                decimalStr: '၁၂၃၄၅၆၇.၈၉',
                thousandSeparator: ',',
                separatorIncluded: true,
                normalizeReason: {
                    normalizeDecimalPoint: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('inga-tin-taung-ancient-number', () => {
        it(String.raw`should return fragment when input 'င်္၁ါ'`, () => {
            const input = 'င်္၁ါ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁င်္၀ါ'`, () => {
            const input = '၁င်္၀ါ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁,၉၂င်္၀ါ'`, () => {
            const input = '၁,၉၂င်္၀ါ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၉၂၀',
                thousandSeparator: ',',
                separatorIncluded: true,
                ancientWrittenForm: true,
                ancientMeasureWords: ['အင်္ဂါ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'င်္၁'`, () => {
            const input = 'င်္၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['တောင်း', 'တင်း']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '( ၁ ) ၀ိ'`, () => {
            const input = '( ၁ ) ၀ိ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၁)၀ိ',
                decimal: true,
                decimalStr: '၁၀',
                ancientWrittenForm: true,
                spaceIncluded: true,
                ancientMeasureWords: ['ဆယ်သား'],
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(\u104E)၀ိ'`, () => {
            const input = '(\u104E)၀ိ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၄)၀ိ',
                decimal: true,
                decimalStr: '၄၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ဆယ်သား'],
                normalizeReason: {
                    changeU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Not
        //
        it(String.raw`should NOT return ancient fragment when input 'င်္၁ာ'`, () => {
            const input = 'င်္၁ာ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input 'င်္၁ါ့'`, () => {
            const input = 'င်္၁ါ့';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input 'င်္ဝါ' \u101D)`, () => {
            const input = 'င်္ဝါ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input 'င\u1039၁၁၁'`, () => {
            const input = 'င\u1039၁၁၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input 'င်၁၁၁'`, () => {
            const input = 'င်၁၁၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });
    });

    describe('other-ancient-number-shortcuts', () => {
        it(String.raw`should return fragment when input '၁ွေ'`, () => {
            const input = '၁ွေ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ရွေး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ွေး'`, () => {
            const input = '၁ွေး';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ရွေး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ိ'`, () => {
            const input = '၁ိ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ကျပ်',
                    'စိတ်',
                    'မိုက်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ွာ'`, () => {
            const input = '၁ွာ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ထွာ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ဲ'`, () => {
            const input = '၁ဲ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ပဲ',
                    'စလယ်',
                    'ပယ်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ူ'`, () => {
            const input = '၁ူ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['မူး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ူး'`, () => {
            const input = '၁ူး';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['မူး']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ံ'`, () => {
            const input = '၁ံ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'လက်သစ်',
                    'မတ်'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁်'`, () => {
            const input = '၁်';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ပြည်']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ွဲ'`, () => {
            const input = '၁ွဲ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ခွဲ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ါ'`, () => {
            const input = '၁ါ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ပိဿာ']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ါး'`, () => {
            const input = '၁ါး';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ပြား',
                    'ပါး'
                ]
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ျက်'`, () => {
            const input = '၁ျက်';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['လမျက်']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ယ်'`, () => {
            const input = '၁ယ်';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['လမယ်']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁ွက်'`, () => {
            const input = '၁ွက်';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ခွက်']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '၁ွ က်'`, () => {
            const input = '၁ွ က်';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁ွက်',
                decimal: true,
                decimalStr: '၁',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ခွက်'],
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ဝိ (\u101D)
        it(String.raw`should return fragment when input '၁ဝိ' (\u101D)`, () => {
            const input = '၁ဝိ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၀ိ',
                decimal: true,
                decimalStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ကျပ်',
                    'စိတ်',
                    'မိုက်'
                ],
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ဝိ (\u101D\u104B)
        it(String.raw`should return fragment when input '၁ဝိ။' (\u101D\u104B)`, () => {
            const input = '၁ဝိ။';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၁ဝိ',
                normalizedStr: '၁၀ိ',
                decimal: true,
                decimalStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: [
                    'ကျပ်',
                    'စိတ်',
                    'မိုက်'
                ],
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // NOT
        //
        it(String.raw`should NOT return ancient fragment when input '၁ဝိက' (\u101D\u1000)`, () => {
            const input = '၁ဝိက';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input '၁ဝိ၏' (\u101D\u104F)`, () => {
            const input = '၁ဝိ၏';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input '၁ဝိꩠ' (\u101D\uAA60)`, () => {
            const input = '၁ဝိꩠ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input '၁ဝိꧠ' (\u101D\uA9E0)`, () => {
            const input = '၁ဝိꧠ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });
    });

    describe('hsettha', () => {
        it(String.raw`should return fragment when input '(၁)၀ိ'`, () => {
            const input = '(၁)၀ိ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁၀',
                ancientWrittenForm: true,
                ancientMeasureWords: ['ဆယ်သား']
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Not
        //
        it(String.raw`should NOT return ancient fragment when input '(၁)၀ို'`, () => {
            const input = '(၁)၀ို';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });

        it(String.raw`should NOT return ancient fragment when input '(၁\uFF09၀ိ'`, () => {
            const input = '(၁\uFF09၀ိ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.ancientMeasureWords).toBeTruthy();
        });
    });

    describe('brackets', () => {
        it(String.raw`should return fragment when input '(၁)'`, () => {
            const input = '(၁)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၁'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၉၀)'`, () => {
            const input = '(၉၀)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၉၀'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၀၉)'`, () => {
            const input = '(၀၉)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၀၉'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၉၉၉)'`, () => {
            const input = '(၉၉၉)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                decimal: true,
                decimalStr: '၉၉၉'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '( ၁ )'`, () => {
            const input = '( ၁ )';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၁)',
                decimal: true,
                decimalStr: '၁',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(\u200B၁\u200B)'`, () => {
            const input = '(\u200B၁\u200B)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၁)',
                decimal: true,
                decimalStr: '၁',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(၉\u101D)'`, () => {
            const input = '(၉\u101D)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၉၀)',
                decimal: true,
                decimalStr: '၉၀',
                normalizeReason: {
                    changeU101DToU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '(\u104E၉\u101D)'`, () => {
            const input = '(\u104E၉\u101D)';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '(၄၉၀)',
                decimal: true,
                decimalStr: '၄၉၀',
                normalizeReason: {
                    changeU101DToU1040: true,
                    changeU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Not
        //
        it(String.raw`should NOT return fragment when input '(ဝ)'`, () => {
            const input = '(ဝ)';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '(၁၁'`, () => {
            const input = '(၁၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || fragment.fragmentType !== FragmentType.Number).toBeTruthy();
        });
    });
});
