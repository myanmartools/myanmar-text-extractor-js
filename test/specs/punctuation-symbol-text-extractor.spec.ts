import { extractPunctuationSymbol } from '../../src/punctuation-symbol-text-extractor';
import { PunctuationSymbolTextFragment } from '../../src/punctuation-symbol-text-fragment';

describe('extractPunctuationSymbol', () => {
    it(String.raw`should return 'PunctuationSymbolTextFragment' when input '၊'`, () => {
        const input = '၊';

        const actualFragment = extractPunctuationSymbol({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: PunctuationSymbolTextFragment = {
            category: 'punctuation-symbol',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'PunctuationSymbolTextFragment' when input '။'`, () => {
        const input = '။';

        const actualFragment = extractPunctuationSymbol({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: PunctuationSymbolTextFragment = {
            category: 'punctuation-symbol',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'PunctuationSymbolTextFragment' when input '၊က'`, () => {
        const input = '၊က';

        const actualFragment = extractPunctuationSymbol({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: []
        });

        const expactedFragment: PunctuationSymbolTextFragment = {
            category: 'punctuation-symbol',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'က'`, () => {
        const input = 'က';

        const actualFragment = extractPunctuationSymbol({
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
