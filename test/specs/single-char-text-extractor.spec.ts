import { SingleCharTextExtractor } from '../../src/single-char-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('SingleCharTextExtractor', () => {
    let extractor: SingleCharTextExtractor;

    beforeEach(() => {
        extractor = new SingleCharTextExtractor();
    });

    describe('not', () => {
        it(String.raw`should NOT return fragment when input 'ဢ'`, () => {
            const input = 'ဢ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        it(String.raw`should NOT return fragment when input 'ဨ'`, () => {
            const input = 'ဨ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        it(String.raw`should NOT return fragment when input diacritic symbol 'ဳ'`, () => {
            const input = 'ဳ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        it(String.raw`should NOT return fragment when input diacritic symbol 'ဴ'`, () => {
            const input = 'ဴ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        it(String.raw`should NOT return fragment when input diacritic symbol 'ဵ'`, () => {
            const input = 'ဵ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \u1050
        it(String.raw`should NOT return fragment when input 'ၐ'`, () => {
            const input = 'ၐ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \u109F
        it(String.raw`should NOT return fragment when input '႟'`, () => {
            const input = '႟';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \uAA60 (Myanmar Extended-A)
        it(String.raw`should NOT return fragment when input 'ꩠ'`, () => {
            const input = 'ꩠ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \uAA7F (Myanmar Extended-A)
        it(String.raw`should NOT return fragment when input 'ꩿ'`, () => {
            const input = 'ꩿ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \uA9E0 (Myanmar Extended-B)
        it(String.raw`should NOT return fragment when input 'ꧠ'`, () => {
            const input = 'ꧠ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // \uA9FE (Myanmar Extended-B)
        it(String.raw`should NOT return fragment when input 'ꧾ'`, () => {
            const input = 'ꧾ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });

        // More than one char
        it(String.raw`should NOT return fragment when input 'ကြ'`, () => {
            const input = 'ကြ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment).toBeFalsy();
        });
    });

    describe('single-letter-without-diacritics', () => {
        it(String.raw`should return fragment when input 'ဤ'`, () => {
            const input = 'ဤ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဪ'`, () => {
            const input = 'ဪ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဤက'`, () => {
            const input = 'ဤက';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: 'ဤ',
                normalizedStr: 'ဤ'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-letter-input', () => {
        it(String.raw`should return fragment when input 'က'`, () => {
            const input = 'က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'အ'`, () => {
            const input = 'အ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဣ'`, () => {
            const input = 'ဣ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဥ'`, () => {
            const input = 'ဥ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဧ'`, () => {
            const input = 'ဧ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဩ'`, () => {
            const input = 'ဩ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input 'ဿ'`, () => {
            const input = 'ဿ';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၎'`, () => {
            const input = '၎';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-number-input', () => {
        it(String.raw`should return fragment when input '၀'`, () => {
            const input = '၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                digitOrNumberGroup: true,
                digitStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၉'`, () => {
            const input = '၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                digitOrNumberGroup: true,
                digitStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-diacritic-symbol-input', () => {
        it(String.raw`should return fragment when input '\u102B'`, () => {
            const input = '\u102B';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                diacritic: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u1031'`, () => {
            const input = '\u1031';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                diacritic: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u1036'`, () => {
            const input = '\u1036';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                diacritic: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u1039'`, () => {
            const input = '\u1039';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                diacritic: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '\u103E'`, () => {
            const input = '\u103E';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                diacritic: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('letter-punctuation', () => {
        it(String.raw`should return fragment when input '၌'`, () => {
            const input = '၌';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၍'`, () => {
            const input = '၍';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၏'`, () => {
            const input = '၏';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၌က'`, () => {
            const input = '၌က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: '၌',
                normalizedStr: '၌',
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('symbol-punctuation', () => {
        it(String.raw`should return fragment when input '၊'`, () => {
            const input = '၊';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '။'`, () => {
            const input = '။';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return fragment when input '၊က'`, () => {
            const input = '၊က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Symbol,
                matchedStr: '၊',
                normalizedStr: '၊',
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });
});
