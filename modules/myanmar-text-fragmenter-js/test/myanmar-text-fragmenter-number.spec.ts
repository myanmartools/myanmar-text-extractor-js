import { FragmentType } from '../src/fragment-type';
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextFragmenter#getNextFragment#number', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return number fragment when input '၀'`, () => {
        const input = '၀';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
    });

    it(String.raw`should return number fragment when input '၉'`, () => {
        const input = '၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
    });

    it(String.raw`should return 'အင်္ဂါ' number fragment when input 'င်္၁ါ'`, () => {
        const input = 'င်္၁ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['အင်္ဂါ']);
    });

    it(String.raw`should return 'တင်း' / 'တောင်း' number fragment when input 'င်္၁'`, () => {
        const input = 'င်္၁';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['တောင်း', 'တင်း']);
    });
});
