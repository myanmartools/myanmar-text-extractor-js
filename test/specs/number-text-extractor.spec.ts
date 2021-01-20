import { extractSingleNumber } from '../../src/number-text-extractor';
import { NumberTextFragment } from '../../src/number-text-fragment';

describe('extractSingleNumber', () => {
    it(String.raw`should return 'NumberTextFragment' when input '၀'`, () => {
        const input = '၀';

        const actualFragment = extractSingleNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: NumberTextFragment = {
            category: 'number',
            matchedStr: input[0],
            decimalStr: '၀',
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'NumberTextFragment' when input '၉'`, () => {
        const input = '၉';

        const actualFragment = extractSingleNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: NumberTextFragment = {
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

        const actualFragment = extractSingleNumber({
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
