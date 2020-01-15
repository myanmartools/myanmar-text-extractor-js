import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#temp', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return fragment'`, () => {
        const input = '(၁)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁'
        });
    });
});
