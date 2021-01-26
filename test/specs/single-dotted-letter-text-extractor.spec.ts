import { extractSingleDottedLetter } from '../../src/single-dotted-letter-text-extractor';
import { TextFragment } from '../../src/text-fragment';
import { TextExtractorInputInternal } from '../../src/text-extractor-input-internal';

function prepareDefaultInput(input: string, curStr: string): TextExtractorInputInternal {
    return {
        totalTrimedInputLength: input.trim().length,
        curStr,
        firstCp: curStr.codePointAt(0) as number,
        curStrRightTrimedLength: curStr.trimEnd().length,
        prevMMWritingStyle: null,
        prevMMWritingStyleProbability: 0,
        leftStr: ''
    };
}

describe('extractSingleDottedLetter', () => {
    it(String.raw`should return 'dotted-letter' text fragment when input 'ဤ︀'`, () => {
        const input = 'ဤ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဪ︀'`, () => {
        const input = 'ဪ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'က︀'`, () => {
        const input = 'က︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'အ︀'`, () => {
        const input = 'အ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဣ︀'`, () => {
        const input = 'ဣ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဥ︀'`, () => {
        const input = 'ဥ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဦ︀'`, () => {
        const input = 'ဦ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဧ︀'`, () => {
        const input = 'ဧ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဩ︀'`, () => {
        const input = 'ဩ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'dotted-letter' text fragment when input: 'က︀', prevMMWritingStyle: 'zg', prevMMWritingStyleProbability > 0.5`,
        () => {
            const input = 'က︀';
            const curStr = input;

            const extractorInput = prepareDefaultInput(input, curStr);
            extractorInput.prevMMWritingStyle = 'zg';
            extractorInput.prevMMWritingStyleProbability = 0.55;

            const actualFragment = extractSingleDottedLetter(extractorInput);

            const expactedFragment: TextFragment = {
                category: 'dotted-letter',
                matchedStr: curStr.substring(0, 2),
                uniProbability: 0.5,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(
        String.raw`should return 'dotted-letter' text fragment when input: 'က︀', prevMMWritingStyle: 'zg', prevMMWritingStyleProbability <= 0.5`,
        () => {
            const input = 'က︀';
            const curStr = input;

            const extractorInput = prepareDefaultInput(input, curStr);
            extractorInput.prevMMWritingStyle = 'zg';
            extractorInput.prevMMWritingStyleProbability = 0.5;

            const actualFragment = extractSingleDottedLetter(extractorInput);

            const expactedFragment: TextFragment = {
                category: 'dotted-letter',
                matchedStr: curStr.substring(0, 2),
                uniProbability: 0.5,
                zgProbability: 0.48
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဿ︀'`, () => {
        const input = 'ဿ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input '၎︀'`, () => {
        const input = '၎︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.45,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input '၎︀', prevMMWritingStyle: 'zg'`, () => {
        const input = '၎︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);
        extractorInput.prevMMWritingStyle = 'zg';
        extractorInput.prevMMWritingStyleProbability = 0.35;

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.4,
            zgProbability: 0.6
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input '၎︀', prevMMWritingStyle: 'null',`, () => {
        const input = '၎︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.45,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'dotted-letter' text fragment when input '၎︀', prevMMWritingStyle: 'uni', prevMMWritingStyleProbability > 0.5`,
        () => {
            const input = '၎︀';
            const curStr = input;

            const extractorInput = prepareDefaultInput(input, curStr);
            extractorInput.prevMMWritingStyle = 'uni';
            extractorInput.prevMMWritingStyleProbability = 0.55;

            const actualFragment = extractSingleDottedLetter(extractorInput);

            const expactedFragment: TextFragment = {
                category: 'dotted-letter',
                matchedStr: curStr.substring(0, 2),
                uniProbability: 0.48,
                zgProbability: 0.5
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဤ︀က'`, () => {
        const input = 'ဤ︀က';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'dotted-letter' text fragment when input 'ဪ︀က'`, () => {
        const input = 'ဪ︀က';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'dotted-letter',
            matchedStr: curStr.substring(0, 2),
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'က︀က︀'`, () => {
        const input = 'က︀က︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဣ︀ဣ︀'`, () => {
        const input = 'ဣ︀ဣ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input 'ဿ︀ဿ︀'`, () => {
        const input = 'ဿ︀ဿ︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'null' when input '၎︀၎︀'`, () => {
        const input = '၎︀၎︀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleDottedLetter(extractorInput);

        void expect(actualFragment).toBeNull();
    });
});
