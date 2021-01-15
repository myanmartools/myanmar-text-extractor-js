import { extractPunctuationLetter } from '../../src/punctuation-letter-text-extractor';
import { PunctuationLetterTextFragment } from '../../src/punctuation-letter-text-fragment';

describe('extractPunctuationLetter', () => {
    it(String.raw`should return 'PunctuationLetterTextFragment' when input '၌'`, () => {
        const input = '၌';

        const actualFragment = extractPunctuationLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: PunctuationLetterTextFragment = {
            category: 'punctuation-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'PunctuationSymbolTextFragment' when input '၍'`, () => {
        const input = '၍';

        const actualFragment = extractPunctuationLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: PunctuationLetterTextFragment = {
            category: 'punctuation-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'PunctuationSymbolTextFragment' when input '၏'`, () => {
        const input = '၏';

        const actualFragment = extractPunctuationLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: PunctuationLetterTextFragment = {
            category: 'punctuation-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input 'က'`, () => {
        const input = 'က';

        const actualFragment = extractPunctuationLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        void expect(actualFragment).toBeNull();
    });

    it(String.raw`should return 'PunctuationLetterTextFragment' when input '၌က'`, () => {
        const input = '၌က';

        const actualFragment = extractPunctuationLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: PunctuationLetterTextFragment = {
            category: 'punctuation-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });
});
