import { extractSingleLetter } from '../../src/single-letter-text-extractor';
import { SingleLetterTextFragment } from '../../src/single-letter-text-fragment';

describe('extractSingleLetter', () => {
    it(String.raw`should return 'SingleLetterTextFragment' when input 'ဤ'`, () => {
        const input = 'ဤ';

        const actualFragment = extractSingleLetter({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length
        });

        const expactedFragment: SingleLetterTextFragment = {
            category: 'single-letter',
            matchedStr: input[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });
});
