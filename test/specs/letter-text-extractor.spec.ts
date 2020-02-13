import { LetterTextExtractor } from '../../src/letter-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('LetterTextExtractor', () => {
    let extractor: LetterTextExtractor;

    beforeEach(() => {
        extractor = new LetterTextExtractor({
            analyzeAndNormalize: true
        });
    });

    describe('diacritic', () => {
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

        it(String.raw`should return fragment when input 'ကါ '`, () => {
            const input = 'ကါ ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကါ၊'`, () => {
            const input = 'ကါ၊';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကါ။'`, () => {
            const input = 'ကါ။';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကါ.'`, () => {
            const input = 'ကါ.';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကါa'`, () => {
            const input = 'ကါa';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကါက'`, () => {
            const input = 'ကါက';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကါ',
                normalizedStr: 'ကါ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကေက'`, () => {
            const input = 'ကေက';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကေ',
                normalizedStr: 'ကေ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကြက'`, () => {
            const input = 'ကြက';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကြ',
                normalizedStr: 'ကြ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကိုက'`, () => {
            const input = 'ကိုက';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကို',
                normalizedStr: 'ကို'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကျွေးက'`, () => {
            const input = 'ကျွေးက';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကျွေး',
                normalizedStr: 'ကျွေး'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'က်က'`, () => {
            const input = 'က်က';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'က်',
                normalizedStr: 'က်'
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
    });

    describe('diacritic-normalize', () => {
        // Space
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

        // Space
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

        // Space
        it(String.raw`should return fragment when input 'က ိ ု ့'`, () => {
            const input = 'က ိ ု ့';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: 'ကို့',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u1040
        it(String.raw`should return fragment when input '၀ိုး' (\u1040)`, () => {
            const input = '၀ိုး';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: 'ဝိုး',
                normalizeReason: {
                    swapU1040ToU101D: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u1040 and space
        it(String.raw`should return fragment when input '၀ ံ' (\u1040)`, () => {
            const input = '၀ ံ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: 'ဝံ',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true,
                    swapU1040ToU101D: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u1044
        it(String.raw`should return fragment when input '၄င်' (\u1044)`, () => {
            const input = '၄င်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: '၎င်',
                normalizeReason: {
                    swapU1044ToU104E: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u1044 and space
        it(String.raw`should return fragment when input '၄ င ်' (\u1044)`, () => {
            const input = '၄ င ်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: '၎င်',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true,
                    swapU1044ToU104E: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('athet', () => {
        it(String.raw`should return fragment when input 'ကက်က'`, () => {
            const input = 'ကက်က';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကက်',
                normalizedStr: 'ကက်'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကြွက်က'`, () => {
            const input = 'ကြွက်က';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ကြွက်',
                normalizedStr: 'ကြွက်'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('athet-normalize', () => {
        it(String.raw`should return fragment when input 'က က်က'`, () => {
            const input = 'က က်က';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'က က်',
                normalizedStr: 'ကက်',
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('diacritic-and-athet', () => {
        it(String.raw`should return fragment when input 'ကွက်'`, () => {
            const input = 'ကွက်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'နိုင်'`, () => {
            const input = 'နိုင်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

    });

    describe('diacritic-and-athet-on-single-consonant', () => {
        it(String.raw`should return fragment when input 'ကျွန်ုပ်'`, () => {
            const input = 'ကျွန်ုပ်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ယောက်ျား'`, () => {
            const input = 'ယောက်ျား';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \u101A\u1031\u102C\u1000\u103B\u103A\u102C\u1038
        it(String.raw`should return fragment when input 'ယောကျ်ား'`, () => {
            const input = 'ယောကျ်ား';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'လက်ျာ'`, () => {
            const input = 'လက်ျာ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('kinsi', () => {
        it(String.raw`should return fragment when input 'အင်္ဂါ'`, () => {
            const input = 'အင်္ဂါ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'သင်္ကြန်'`, () => {
            const input = 'သင်္ကြန်';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('pahsin', () => {
        it(String.raw`should return fragment when input 'သက္က'`, () => {
            const input = 'သက္က';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ကမ္ဘာ'`, () => {
            const input = 'ကမ္ဘာ';
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
