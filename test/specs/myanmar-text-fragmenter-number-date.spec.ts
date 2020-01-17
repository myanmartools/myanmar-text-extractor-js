import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#number#date', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    // dd၊MM၊yyyy
    it(String.raw`should return date fragment when input '၀၁၊၀၁၊၂၀၂၀'`, () => {
        const input = '၀၁၊၀၁၊၂၀၂၀';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleDate,
            separatorIncluded: true
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // dd၊MM၊yyyy
    it(String.raw`should return date fragment when input '၃၁၊၁၂၊၂၀၂၀'`, () => {
        const input = '၃၁၊၁၂၊၂၀၂၀';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.PossibleDate,
            separatorIncluded: true
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // NOT
    it(String.raw`should NOT return date fragment when input '၃၂၊၁၂၊၂၀၂၀'`, () => {
        const input = '၃၂၊၁၂၊၂၀၂၀';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeFalsy();
    });

    it(String.raw`should return date fragment when input '၁၇ ၊ ၁ ၊ ၂၀၂၀'`, () => {
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
