
import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
import { TextFragment } from '../src/text-fragment';

import { formatCodePoints } from './shared/format-code-points.spec';

describe('MyanmarTextFragmenter#getNextFragment', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    // ဤ -> ဤ
    it(String.raw`'\u1024' -> '\u1024'`, () => {
        const fragment = fragmenter.getNextFragment('\u1024') as TextFragment;

        expect(fragment.matchedString).toBe('\u1024',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ဪ -> ဪ
    it(String.raw`'\u102A' -> '\u102A'`, () => {
        const fragment = fragmenter.getNextFragment('\u102A') as TextFragment;

        expect(fragment.matchedString).toBe('\u102A',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ၊ -> ၊
    it(String.raw`'\u104A' -> '\u104A'`, () => {
        const fragment = fragmenter.getNextFragment('\u104A') as TextFragment;

        expect(fragment.matchedString).toBe('\u104A',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ။ -> ။
    it(String.raw`'\u104B' -> '\u104B'`, () => {
        const fragment = fragmenter.getNextFragment('\u104B') as TextFragment;

        expect(fragment.matchedString).toBe('\u104B',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ၌ -> ၌
    it(String.raw`'\u104C' -> '\u104C'`, () => {
        const fragment = fragmenter.getNextFragment('\u104C') as TextFragment;

        expect(fragment.matchedString).toBe('\u104C',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ၍ -> ၍
    it(String.raw`'\u104D' -> '\u104D'`, () => {
        const fragment = fragmenter.getNextFragment('\u104D') as TextFragment;

        expect(fragment.matchedString).toBe('\u104D',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ၏ -> ၏
    it(String.raw`'\u104F' -> '\u104F'`, () => {
        const fragment = fragmenter.getNextFragment('\u104F') as TextFragment;

        expect(fragment.matchedString).toBe('\u104F',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });

    // ဤက -> ဤ
    it(String.raw`'\u1024\u1000' -> '\u1024'`, () => {
        const fragment = fragmenter.getNextFragment('\u1024\u1000') as TextFragment;

        expect(fragment.matchedString).toBe('\u1024',
            `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
        expect(fragment.error).toBeFalsy();
    });
});
