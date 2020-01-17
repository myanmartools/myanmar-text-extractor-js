import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#number#date', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return date number fragment when input '၁၇၊၁၊၂၀၂၀'`, () => {
        const input = '၁၇၊၁၊၂၀၂၀';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleDate,
            separatorIncluded: true
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return date number fragment when input '၁၇ ၊ ၁ ၊ ၂၀၂၀'`, () => {
        const input = '၁၇ ၊ ၁ ၊ ၂၀၂၀';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleDate,
            spaceIncluded: true,
            separatorIncluded: true
        };

        expect(actualFragment).toEqual(expactedFragment);
    });
});
