import { SingleLetterTextExtractor } from '../../src/single-letter-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('SingleLetterTextExtractor', () => {
    let extractor: SingleLetterTextExtractor;

    beforeEach(() => {
        extractor = new SingleLetterTextExtractor();
    });

    describe('single-char-alphabet', () => {
        it(String.raw`should return alphabet fragment when input 'ဤ'`, () => {
            const input = 'ဤ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဪ'`, () => {
            const input = 'ဪ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဤက'`, () => {
            const input = 'ဤက';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: 'ဤ',
                normalizedStr: 'ဤ',
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-char-input', () => {
        it(String.raw`should return alphabet fragment when input 'က'`, () => {
            const input = 'က';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'အ'`, () => {
            const input = 'အ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဣ'`, () => {
            const input = 'ဣ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဥ'`, () => {
            const input = 'ဥ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဧ'`, () => {
            const input = 'ဧ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဩ'`, () => {
            const input = 'ဩ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဿ'`, () => {
            const input = 'ဿ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input '၎'`, () => {
            const input = '၎';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('punctuation', () => {
        it(String.raw`should return punctuation fragment when input '၌'`, () => {
            const input = '၌';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                punctuation: true,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '၍'`, () => {
            const input = '၍';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                punctuation: true,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '၏'`, () => {
            const input = '၏';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                punctuation: true,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '၊'`, () => {
            const input = '၊';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '။'`, () => {
            const input = '။';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '၌က'`, () => {
            const input = '၌က';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၌',
                normalizedStr: '၌',
                punctuation: true,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return punctuation fragment when input '၊က'`, () => {
            const input = '၊က';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၊',
                normalizedStr: '၊',
                punctuation: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });
});
