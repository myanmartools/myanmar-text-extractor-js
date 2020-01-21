import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#punctuation', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    // ၌
    it(String.raw`should return alphabet fragment when input '\u104C'`, () => {
        const input = '\u104C';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၍
    it(String.raw`should return alphabet fragment when input '\u104D'`, () => {
        const input = '\u104D';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၏
    it(String.raw`should return alphabet fragment when input '\u104F'`, () => {
        const input = '\u104F';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၊
    it(String.raw`should return alphabet fragment when input '\u104A'`, () => {
        const input = '\u104A';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ။
    it(String.raw`should return alphabet fragment when input '\u104B'`, () => {
        const input = '\u104B';
        const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });
});
