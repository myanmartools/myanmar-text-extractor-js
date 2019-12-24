
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextFragmenter#getNextFragment', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return fragement '\u1024' when input '\u1024'`, () => {
        const fragment = fragmenter.getNextFragment('\u1024') as TextFragment;

        expect(fragment.matchedString).toBe('\u1024',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.standaloneLetter).toBeTruthy();
        expect(fragment.spaceIncluded).toBeFalsy();
    });
});
