
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextFragmenter#getNextFragment#number', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return number fragment when input '၁'`, () => {
        const fragment = fragmenter.getNextFragment('၁') as TextFragment;

        expect(fragment.matchedStr).toBe('၁',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၁');
        expect(fragment.numberFragment).toBeTruthy();
    });

    it(String.raw`should return number fragment when input '၉'`, () => {
        const fragment = fragmenter.getNextFragment('၉') as TextFragment;

        expect(fragment.matchedStr).toBe('၉',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၉');
        expect(fragment.numberFragment).toBeTruthy();
    });

    it(String.raw`should return 'inga' number fragment when input 'င်္၁ါ'`, () => {
        const fragment = fragmenter.getNextFragment('င်္၁ါ') as TextFragment;

        expect(fragment.matchedStr).toBe('င်္၁ါ',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('င်္၁ါ');
        expect(fragment.numberFragment).toBeTruthy();
        expect(fragment.digitStr).toBe('၁');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['အင်္ဂါ']);
    });
});
