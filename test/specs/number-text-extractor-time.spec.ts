import { NumberTextExtractor } from '../../src/number-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#time', () => {
    let extractor: NumberTextExtractor;

    beforeEach(() => {
        extractor = new NumberTextExtractor();
    });

    describe('iso-time', () => {
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉.၀၀၀၀၀၀၀Z'`, () => {
            const input = '၂၃:၅၉:၅၉.၀၀၀၀၀၀၀Z';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉.၀၀၀၀၀၀၀+၀၀:၀၀'`, () => {
            const input = '၂၃:၅၉:၅၉.၀၀၀၀၀၀၀+၀၀:၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉Z'`, () => {
            const input = '၂၃:၅၉:၅၉Z';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉+၀၀:၀၀'`, () => {
            const input = '၂၃:၅၉:၅၉+၀၀:၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉+၀၆:၃၀'`, () => {
            const input = '၂၃:၅၉:၅၉+၀၆:၃၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉-၀၅:၀၀'`, () => {
            const input = '၂၃:၅၉:၅၉-၀၅:၀၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with .ဝင်း
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉.ဝင်း'`, () => {
            const input = '၂၃:၅၉:၅၉.ဝင်း';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('hour-minute-second', () => {
        // hh:mm:ss
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉'`, () => {
            const input = '၂၃:၅၉:၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm:ss
        it(String.raw`should return fragment when input '၀၁:၀၁:၀၁'`, () => {
            const input = '၀၁:၀၁:၀၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return fragment when input '၁:၁:၁'`, () => {
            const input = '၁:၁:၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return fragment when input '၁:၁၀:၅၉'`, () => {
            const input = '၁:၁၀:၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with \u1000
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉\u1000'`, () => {
            const input = '၂၃:၅၉:၅၉\u1000';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with \u101D
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉\u101D'`, () => {
            const input = '၂၃:၅၉:၅၉\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with \u104E
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉\u104E'`, () => {
            const input = '၂၃:၅၉:၅၉\u104E';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with :
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉:'`, () => {
            const input = '၂၃:၅၉:၅၉:';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with 'း' (\u1038)
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉\u1038'`, () => {
            const input = '၂၃:၅၉:၅၉\u1038';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with _
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉_'`, () => {
            const input = '၂၃:၅၉:၅၉_';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with /
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉/'`, () => {
            const input = '၂၃:၅၉:၅၉/';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with ?
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉?'`, () => {
            const input = '၂၃:၅၉:၅၉?';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with .
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉.'`, () => {
            const input = '၂၃:၅၉:၅၉.';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with ,
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉,'`, () => {
            const input = '၂၃:၅၉:၅၉,';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with @
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉@'`, () => {
            const input = '၂၃:၅၉:၅၉@';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with #
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉#'`, () => {
            const input = '၂၃:၅၉:၅၉#';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with $
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉$'`, () => {
            const input = '၂၃:၅၉:၅၉$';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with %
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉%'`, () => {
            const input = '၂၃:၅၉:၅၉%';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with ၊
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၉၊'`, () => {
            const input = '၂၃:၅၉:၅၉၊';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with ၎င်း
        it(String.raw`should return fragment when input '၂၃:၅၉:၅၎င်း'`, () => {
            const input = '၂၃:၅၉:၅၎င်း';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅',
                normalizedStr: '၂၃:၅၉:၅',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // End with ဝဲ (\u101D)
        it(String.raw`should return fragment when input '၂၃:၅၉:၅ဝဲ' (\u101D)`, () => {
            const input = '၂၃:၅၉:၅ဝဲ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၂၃:၅၉:၅',
                normalizedStr: '၂၃:၅၉:၅',
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input '၁၂း၅၉း၅၉'`, () => {
            const input = '၁၂း၅၉း၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true,
                normalizeReason: {
                    normalizeColon: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂:၅၉;၅၉'`, () => {
            const input = '၁၂:၅၉;၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                separatorIncluded: true,
                normalizeReason: {
                    normalizeColon: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂ : ၅၉: ၅၉'`, () => {
            const input = '၁၂ : ၅၉: ၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၁၂\u00A0:\u00A0၅၉:\u200B၅၉'`, () => {
            const input = '၁၂\u00A0:\u00A0၅၉:\u200B၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                spaceIncluded: true,
                separatorIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၂\u101D:\u104E၉:၅၉'`, () => {
            const input = '၂\u101D:\u104E၉:၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၂၀:၄၉:၅၉',
                possibleTime: true,
                separatorIncluded: true,
                normalizeReason: {
                    swapU101DToU1040: true,
                    swapU104EToU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('hour-minute', () => {
        // hh:mm
        it(String.raw`should return fragment when input '၂၃:၅၉'`, () => {
            const input = '၂၃:၅၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm
        it(String.raw`should return fragment when input '၀၁:၀၅'`, () => {
            const input = '၀၁:၀၅';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m
        it(String.raw`should return fragment when input '၁:၀၅'`, () => {
            const input = '၁:၀၅';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        // Invalid end
        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၅၉၁'`, () => {
            const input = '၁၂:၅၉:၅၉၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        // Invalid end
        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၅၉\u101D၁'`, () => {
            const input = '၁၂:၅၉:၅၉\u101D၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        // Invalid end
        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၅၉\u104E၁'`, () => {
            const input = '၁၂:၅၉:၅၉\u104E၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);

            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        // Invalid end
        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၅၉_၁'`, () => {
            const input = '၁၂:၅၉:၅၉_၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၅၉ိ'`, () => {
            const input = '၁၂:၅၉:၅၉ိ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂:၅၉:၎င်း'`, () => {
            const input = '၁၂:၅၉:၎င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂:၅၉:\u101D၎င်း'`, () => {
            const input = '၁၂:၅၉:\u101D၎င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁:\u101D၎င်း'`, () => {
            const input = '၀၁:\u101D၎င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂:ဝု'`, () => {
            const input = '၁၂:ဝု';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၁၂;၅၉'`, () => {
            const input = '၁၂;၅၉';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '\u104E:\u101D'`, () => {
            const input = '\u104E:\u101D';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleTime).toBeTruthy();
        });
    });
});
