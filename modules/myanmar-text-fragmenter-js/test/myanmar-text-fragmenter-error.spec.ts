
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

// tslint:disable: no-non-null-assertion

describe('MyanmarTextFragmenter#getNextFragment#error', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    // 'ါက' -> 'ါ'
    it(String.raw`'\u102B\u1000' -> '\u102B'`, () => {
        const fragment = fragmenter.getNextFragment('\u102B\u1000') as TextFragment;

        expect(fragment.matchedString).toBe('\u102B',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeTruthy();
        expect(fragment.error!.invalidStart).toBeTruthy();
        expect(fragment.error!.invalidUnicodeOrder).toBeTruthy();
    });

    // 'ှက' -> 'ှ'
    it(String.raw`'\u103E\u1000' -> '\u103E'`, () => {
        const fragment = fragmenter.getNextFragment('\u103E\u1000') as TextFragment;

        expect(fragment.matchedString).toBe('\u103E',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeTruthy();
        expect(fragment.error!.invalidStart).toBeTruthy();
        expect(fragment.error!.invalidUnicodeOrder).toBeTruthy();
    });
});
