
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextFragmenter#getNextFragment#digit', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return digit fragment when input '\u1040'`, () => {
        const fragment = fragmenter.getNextFragment('\u1040') as TextFragment;

        expect(fragment.matchedStr).toBe('\u1040',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.numberFragment).toBeTruthy();
        expect(fragment.error).toBeFalsy();
    });

    it(String.raw`should return digit fragment when input '\u1049'`, () => {
        const fragment = fragmenter.getNextFragment('\u1049') as TextFragment;

        expect(fragment.matchedStr).toBe('\u1049',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.numberFragment).toBeTruthy();
        expect(fragment.error).toBeFalsy();
    });

    it(String.raw`should return digit fragment with order list when input '(\u1041)'`, () => {
        const fragment = fragmenter.getNextFragment('(\u1041)') as TextFragment;

        expect(fragment.matchedStr).toBe('(\u1041)',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.numberFragment).toBeTruthy();
        expect(fragment.numberOrderList).toBeTruthy();
        expect(fragment.orderListDigitStr).toEqual('\u1041');
        expect(fragment.error).toBeFalsy();
    });
});
