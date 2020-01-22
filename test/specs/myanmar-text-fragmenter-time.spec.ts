import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#time', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    // hh:mm:ss
    it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉'`, () => {
        const input = '၂၃:၅၉:၅၉';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleTime
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // hh:mm
    it(String.raw`should return time fragment when input '၂၃:၅၉'`, () => {
        const input = '၂၃:၅၉';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleTime
        };

        expect(actualFragment).toEqual(expactedFragment);
    });
});
