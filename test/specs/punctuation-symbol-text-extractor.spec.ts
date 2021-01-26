import { extractPunctuationSymbol } from '../../src/punctuation-symbol-text-extractor';
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

describe('extractPunctuationSymbol', () => {
    it(String.raw`should return 'punctuation-symbol' text fragment when input '၊'`, () => {
        const input = '၊';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractPunctuationSymbol(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'punctuation-symbol',
            matchedStr: curStr[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'punctuation-symbol' text fragment when input '။'`, () => {
        const input = '။';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractPunctuationSymbol(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'punctuation-symbol',
            matchedStr: curStr[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'punctuation-symbol' text fragment when input '၊က'`, () => {
        const input = '၊က';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractPunctuationSymbol(extractorInput);

        const expactedFragment: TextFragment = {
            category: 'punctuation-symbol',
            matchedStr: curStr[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'က'`, () => {
        const input = 'က';
        const curStr = input;

        const extractorInput = prepareDefaultInput(input, curStr);

        const actualFragment = extractPunctuationSymbol(extractorInput);

        void expect(actualFragment).toBeNull();
    });
});
