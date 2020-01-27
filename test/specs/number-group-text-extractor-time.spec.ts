import { NumberGroupTextExtractor } from '../../src/number-group-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#time', () => {
    let extractor: NumberGroupTextExtractor;

    beforeEach(() => {
        extractor = new NumberGroupTextExtractor();
    });

    describe('hour-minute-second', () => {
        // hh:mm:ss
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉'`, () => {
            const input = '၂၃:၅၉:၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm:ss
        it(String.raw`should return time fragment when input '၀၁:၀၁:၀၁'`, () => {
            const input = '၀၁:၀၁:၀၁';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return time fragment when input '၁:၁:၁'`, () => {
            const input = '၁:၁:၁';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return time fragment when input '၁:၁၀:၅၉'`, () => {
            const input = '၁:၁၀:၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with \u1000
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉\u1000'`, () => {
            const input = '၂၃:၅၉:၅၉\u1000';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with \u101D
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉\u101D'`, () => {
            const input = '၂၃:၅၉:၅၉\u101D';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with \u104E
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉\u104E'`, () => {
            const input = '၂၃:၅၉:၅၉\u104E';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with /
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉/'`, () => {
            const input = '၂၃:၅၉:၅၉/';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ?
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉?'`, () => {
            const input = '၂၃:၅၉:၅၉?';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with .
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉.'`, () => {
            const input = '၂၃:၅၉:၅၉.';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ,
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉,'`, () => {
            const input = '၂၃:၅၉:၅၉,';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with @
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉@'`, () => {
            const input = '၂၃:၅၉:၅၉@';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with #
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉#'`, () => {
            const input = '၂၃:၅၉:၅၉#';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with $
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉$'`, () => {
            const input = '၂၃:၅၉:၅၉$';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with %
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉%'`, () => {
            const input = '၂၃:၅၉:၅၉%';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with ၊
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉၊'`, () => {
            const input = '၂၃:၅၉:၅၉၊';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၂၃:၅၉:၅၉',
                normalizedStr: '၂၃:၅၉:၅၉',
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('hour-minute', () => {
        // hh:mm
        it(String.raw`should return time fragment when input '၂၃:၅၉'`, () => {
            const input = '၂၃:၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm
        it(String.raw`should return time fragment when input '၀၁:၀၅'`, () => {
            const input = '၀၁:၀၅';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m
        it(String.raw`should return time fragment when input '၁:၀၅'`, () => {
            const input = '၁:၀၅';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                possibleTime: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('normalize', () => {
        it(String.raw`should return time fragment when input '၁၂း၅၉း၅၉'`, () => {
            const input = '၁၂း၅၉း၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                normalizeReason: {
                    normalizeColon: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return time fragment when input '၁၂:၅၉;၅၉'`, () => {
            const input = '၁၂:၅၉;၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                normalizeReason: {
                    normalizeColon: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return time fragment when input '၁၂ : ၅၉: ၅၉'`, () => {
            const input = '၁၂ : ၅၉: ၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return time fragment when input '၁၂\u00A0:\u00A0၅၉:\u200B၅၉'`, () => {
            const input = '၁၂\u00A0:\u00A0၅၉:\u200B၅၉';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                possibleTime: true,
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        it(String.raw`should NOT return time fragment when input '၁၂:၅၉:၅၉၁'`, () => {
            const input = '၁၂:၅၉:၅၉၁';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return time fragment when input '၁၂:၅၉:၅၉\u101D၁'`, () => {
            const input = '၁၂:၅၉:၅၉\u101D၁';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return time fragment when input '၁၂:၅၉:၅၉\u104E၁'`, () => {
            const input = '၁၂:၅၉:၅၉\u104E၁';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return time fragment when input '၁၂:၅၉:၅၉.၁'`, () => {
            const input = '၁၂:၅၉:၅၉.၁';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return time fragment when input '၁၂;၅၉'`, () => {
            const input = '၁၂;၅၉';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });

        it(String.raw`should NOT return time fragment when input '\u104E:\u101D'`, () => {
            const input = '\u104E:\u101D';
            const actualFragment = extractor.extractNext(input);

            expect(actualFragment == null || !actualFragment.possibleTime).toBeTruthy();
        });
    });
});
