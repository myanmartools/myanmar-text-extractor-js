import { extractSingleDottedNumber } from '../../src/single-dotted-number-text-extractor';
import { SingleDottedNumberTextFragment } from '../../src/single-dotted-number-text-fragment';

describe('extractSingleDottedNumber', () => {
    it(String.raw`should return 'SingleDottedNumberTextFragment' when input '၀︀'`, () => {
        const input = '၀︀';

        const actualFragment = extractSingleDottedNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleDottedNumberTextFragment = {
            category: 'single-dotted-number',
            matchedStr: input.substring(0, 2),
            decimalStr: '၀',
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'SingleDottedNumberTextFragment' when input '၉︀'`, () => {
        const input = '၉︀';

        const actualFragment = extractSingleDottedNumber({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: SingleDottedNumberTextFragment = {
            category: 'single-dotted-number',
            matchedStr: input.substring(0, 2),
            decimalStr: '၉',
            uniProbability: 0.6,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'null' when input '၁︀၁︀'`, () => {
        const input = '၁︀၁︀';

        const actualFragment = extractSingleDottedNumber({
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
