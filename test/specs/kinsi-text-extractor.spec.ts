import { extracKinsiFragment } from '../../src/kinsi-text-extractor';
import { KinsiTextFragment } from '../../src/kinsi-text-fragment';

describe('extracKinsiFragment', () => {
    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ချိုင်း'`, () => {
        const input = 'င်္ချိုင်း';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'single-letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: input,
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });
});
