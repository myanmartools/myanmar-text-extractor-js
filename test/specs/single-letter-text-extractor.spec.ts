import { extractSingleLetter } from '../../src/single-letter-text-extractor';
import { SingleLetterTextFragment } from '../../src/single-letter-text-fragment';

describe('extractSingleLetter', () => {
    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဤ'`, () => {
        const input = 'ဤ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဪ'`, () => {
        const input = 'ဪ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'က'`, () => {
        const input = 'က';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'အ'`, () => {
        const input = 'အ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဣ'`, () => {
        const input = 'ဣ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဥ'`, () => {
        const input = 'ဥ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဦ'`, () => {
        const input = 'ဦ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဧ'`, () => {
        const input = 'ဧ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဩ'`, () => {
        const input = 'ဩ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဿ'`, () => {
        const input = 'ဿ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input '၎'`, () => {
        const input = '၎';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.45,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input '၎', lastKnownWritingStyle: 'zg'`, () => {
        const input = '၎';

        const actualFragment = extractSingleLetter({
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
            ],
            leftStr: 'က'
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.3,
            zgProbability: 0.9
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'SingleLetterTextFragment' when input '၎', lastKnownWritingStyle: 'uni', lastKnownWritingStyleProbability > 0.5`,
        () => {
            const input = '၎';

            const actualFragment = extractSingleLetter({
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
                ],
                leftStr: 'က'
            });

            const expactedFragment: SingleLetterTextFragment = {
                category: 'single-letter',
                matchedStr: input[0],
                uniProbability: 0.48,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(String.raw`should return 'SingleLetterTextFragment' when input '၎', lastKnownWritingStyle = 'null'`, () => {
        const input = '၎';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.45,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဤက'`, () => {
        const input = 'ဤက';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'ကက'`, () => {
        const input = 'ကက';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဣက'`, () => {
        const input = 'ဣက';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဿက'`, () => {
        const input = 'ဿက';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input '၎က'`, () => {
        const input = '၎က';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        void expect(actualFragment).toBeNull();
    });
});
