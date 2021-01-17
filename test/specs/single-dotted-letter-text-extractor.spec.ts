import { extractSingleDottedLetter } from '../../src/single-dotted-letter-text-extractor';
import { SingleDottedLetterTextFragment } from '../../src/single-dotted-letter-text-fragment';

describe('extractSingleDottedLetter', () => {
    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဤ︀'`, () => {
        const input = 'ဤ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဪ︀'`, () => {
        const input = 'ဪ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'က︀'`, () => {
        const input = 'က︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'အ︀'`, () => {
        const input = 'အ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဣ︀'`, () => {
        const input = 'ဣ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဥ︀'`, () => {
        const input = 'ဥ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဦ︀'`, () => {
        const input = 'ဦ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဧ︀'`, () => {
        const input = 'ဧ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဩ︀'`, () => {
        const input = 'ဩ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'SingleDottedLetterTextFragment' when input: 'က︀', lastKnownWritingStyle: 'zg', lastKnownWritingStyleProbability > 0.5`,
        () => {
            const input = 'က︀';

            const actualFragment = extractSingleDottedLetter({
                totalTrimedInputLength: input.trim().length,
                curStr: input,
                firstCp: input.codePointAt(0) as number,
                trimedCurStrLength: input.trim().length,
                lastKnownWritingStyle: 'zg',
                lastKnownWritingStyleProbability: 0.55,
                fragments: [
                    {
                        matchedStr: 'က',
                        category: 'single-letter',
                        uniProbability: 0,
                        zgProbability: 0.5
                    }
                ]
            });

            const expactedFragment: SingleDottedLetterTextFragment = {
                category: 'single-dotted-letter',
                matchedStr: input.substring(0, 2),
                uniProbability: 0.5,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(
        String.raw`should return 'SingleDottedLetterTextFragment' when input: 'က︀', lastKnownWritingStyle: 'zg', lastKnownWritingStyleProbability <= 0.5`,
        () => {
            const input = 'က︀';

            const actualFragment = extractSingleDottedLetter({
                totalTrimedInputLength: input.trim().length,
                curStr: input,
                firstCp: input.codePointAt(0) as number,
                trimedCurStrLength: input.trim().length,
                lastKnownWritingStyle: 'zg',
                lastKnownWritingStyleProbability: 0.5,
                fragments: [
                    {
                        matchedStr: 'က',
                        category: 'single-letter',
                        uniProbability: 0,
                        zgProbability: 0.5
                    }
                ]
            });

            const expactedFragment: SingleDottedLetterTextFragment = {
                category: 'single-dotted-letter',
                matchedStr: input.substring(0, 2),
                uniProbability: 0.5,
                zgProbability: 0.48
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဿ︀'`, () => {
        const input = 'ဿ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input '၎︀'`, () => {
        const input = '၎︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.45,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input '၎︀', lastKnownWritingStyle: 'zg'`, () => {
        const input = '၎︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: 'zg',
            lastKnownWritingStyleProbability: 0.55,
            fragments: [
                {
                    matchedStr: 'က',
                    category: 'single-letter',
                    uniProbability: 0,
                    zgProbability: 0.55
                }
            ]
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.4,
            zgProbability: 0.6
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'SingleDottedLetterTextFragment' when input '၎︀', lastKnownWritingStyle: 'null',`,
        () => {
            const input = '၎︀';

            const actualFragment = extractSingleDottedLetter({
                totalTrimedInputLength: input.trim().length,
                curStr: input,
                firstCp: input.codePointAt(0) as number,
                trimedCurStrLength: input.trim().length,
                lastKnownWritingStyle: null,
                lastKnownWritingStyleProbability: 0,
                fragments: []
            });

            const expactedFragment: SingleDottedLetterTextFragment = {
                category: 'single-dotted-letter',
                matchedStr: input.substring(0, 2),
                uniProbability: 0.45,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(
        String.raw`should return 'SingleDottedLetterTextFragment' when input '၎︀', lastKnownWritingStyle: 'uni', lastKnownWritingStyleProbability > 0.5`,
        () => {
            const input = '၎︀';

            const actualFragment = extractSingleDottedLetter({
                totalTrimedInputLength: input.trim().length,
                curStr: input,
                firstCp: input.codePointAt(0) as number,
                trimedCurStrLength: input.trim().length,
                lastKnownWritingStyle: 'uni',
                lastKnownWritingStyleProbability: 0.55,
                fragments: [
                    {
                        matchedStr: 'က',
                        category: 'single-letter',
                        uniProbability: 0,
                        zgProbability: 0.55
                    }
                ]
            });

            const expactedFragment: SingleDottedLetterTextFragment = {
                category: 'single-dotted-letter',
                matchedStr: input.substring(0, 2),
                uniProbability: 0.48,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဤ︀က'`, () => {
        const input = 'ဤ︀က';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedLetterTextFragment' when input 'ဪ︀က'`, () => {
        const input = 'ဪ︀က';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: SingleDottedLetterTextFragment = {
            category: 'single-dotted-letter',
            matchedStr: input.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'က︀က︀'`, () => {
        const input = 'က︀က︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဣ︀ဣ︀'`, () => {
        const input = 'ဣ︀ဣ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဿ︀ဿ︀'`, () => {
        const input = 'ဿ︀ဿ︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input '၎︀၎︀'`, () => {
        const input = '၎︀၎︀';

        const actualFragment = extractSingleDottedLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        void expect(actualFragment).toBeNull();
    });
});
