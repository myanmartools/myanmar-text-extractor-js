import { extractSingleNumber } from '../../src/single-number-text-extractor';
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

describe('extractSingleNumber', () => {
    it(String.raw`should return 'number' text fragment when input '၀'`, () => {
        const input = '၀';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleNumber(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'number',
            matchedStr: curStr[0],
            decimalStr: '၀',
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'number' text fragment when input '၉'`, () => {
        const input = '၉';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleNumber(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'number',
            matchedStr: input[0],
            decimalStr: '၉',
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input '၁၁'`, () => {
        const input = '၁၁';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractSingleNumber(extractorInput);

        void expect(actualFragment).toBeNull();
    });
});
