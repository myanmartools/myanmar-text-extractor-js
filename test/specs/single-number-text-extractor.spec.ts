import { extractSingleNumber } from '../../src/single-number-text-extractor';
import { SingleNumberTextFragment } from '../../src/single-number-text-fragment';

describe('extractSingleLetter', () => {
    it(String.raw`should return 'SingleNumberTextFragment' when input '၀'`, () => {
        const input = '၀';

        const actualFragment = extractSingleNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: SingleNumberTextFragment = {
            category: 'single-number',
            matchedStr: input[0],
            decimalStr: '၀',
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleNumberTextFragment' when input '၉'`, () => {
        const input = '၉';

        const actualFragment = extractSingleNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: SingleNumberTextFragment = {
            category: 'single-number',
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
            trimedCurStrLength: input.trim().length
        });

        void expect(actualFragment).toBeNull();
    });
});
