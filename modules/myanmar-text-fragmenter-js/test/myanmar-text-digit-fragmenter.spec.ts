
import { MyanmarTextDigitFragmenter } from '../src/myanmar-text-digit-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextDigitFragmenter#getNextDigitFragment', () => {
    let fragmenter: MyanmarTextDigitFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextDigitFragmenter();
    });

    it(String.raw`'\u1040' -> '\u1040'`, () => {
        const fragment = fragmenter.getNextDigitFragment('\u1040') as TextFragment;

        expect(fragment.matchedStr).toBe('\u1040',
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.error).toBeFalsy();
    });
});
