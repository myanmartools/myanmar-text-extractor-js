import { LetterTextExtractor } from '../../src/letter-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('LetterTextExtractor', () => {
    let extractor: LetterTextExtractor;

    beforeEach(() => {
        extractor = new LetterTextExtractor();
    });

    describe('with-diacritics', () => {
        it(String.raw`should return fragment when input 'ကါ'`, () => {
            const input = 'ကါ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကျ'`, () => {
            const input = 'ကျ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကြ'`, () => {
            const input = 'ကြ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကွ'`, () => {
            const input = 'ကွ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကေ'`, () => {
            const input = 'ကေ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကှ'`, () => {
            const input = 'ကှ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကွှ'`, () => {
            const input = 'ကွှ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကို'`, () => {
            const input = 'ကို';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကျွေး'`, () => {
            const input = 'ကျွေး';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'က်'`, () => {
            const input = 'က်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u1000\u1039'`, () => {
            const input = '\u1000\u1039';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        it(String.raw`should return fragment when input 'က ာ'`, () => {
            const input = 'က ာ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: 'ကာ',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကု ့'`, () => {
            const input = 'ကု ့';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: 'ကု့',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('with-athet', () => {
        it(String.raw`should return fragment when input 'ကက်'`, () => {
            const input = 'ကက်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });
});
