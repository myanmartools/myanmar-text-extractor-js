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

    it(String.raw`should return 'အင်္ဂါ' number fragment when input with space 'င်္၁ ါ'`, () => {
        const input = 'င်္၁ ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('င်္၁ါ');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['အင်္ဂါ']);
        expect(fragment.spaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true,
            invalidUnicodeForm: true
        });
    });

    it(String.raw`should return 'အင်္ဂါ' number fragment when input with space 'င်္၁​ါ'`, () => {
        const input = 'င်္၁​ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('င်္၁ါ');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['အင်္ဂါ']);
        expect(fragment.invisibleSpaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true,
            invalidUnicodeForm: true
        });
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

    it(String.raw`should return 'ဆယ်သား' number fragment when input '(၁)၀ိ'`, () => {
        const input = '(၁)၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁၀');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['ဆယ်သား']);
    });

    it(String.raw`should return 'ဆယ်သား' number fragment when input with space '( ၁ ) ၀ိ'`, () => {
        const input = '( ၁ ) ၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၁)၀ိ');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁၀');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['ဆယ်သား']);
        expect(fragment.spaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return 'ဆယ်သား' number fragment when input with \u104E '(၎)၀ိ'`, () => {
        const input = '(၎)၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၄)၀ိ');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၄၀');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['ဆယ်သား']);
        expect(fragment.error).toEqual({
            invalidU104EInsteadOfU1044: true
        });
    });

    it(String.raw`should return number fragment when input '(၁)'`, () => {
        const input = '(၁)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
    });

    it(String.raw`should return number fragment when input '(၉၀)'`, () => {
        const input = '(၉၀)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉၀');
    });

    it(String.raw`should return number fragment when input '(၀၉)'`, () => {
        const input = '(၀၉)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၉');
    });

    it(String.raw`should return number fragment when input with space '( ၉ )'`, () => {
        const input = '( ၉ )';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၉)');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉');
        expect(fragment.spaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with space \u200B '(​၉​)'`, () => {
        const input = '(​၉​)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၉)');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉');
        expect(fragment.invisibleSpaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with \u101D and \u104E '(၉ဝ၎)'`, () => {
        const input = '(၉ဝ၎)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၉၀၄)');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉၀၄');
        expect(fragment.error).toEqual({
            invalidU101DInsteadOfU1040: true,
            invalidU104EInsteadOfU1044: true
        });
    });

    it(String.raw`should return number fragment when input '၁။'`, () => {
        const input = '၁။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁');
    });

    it(String.raw`should return number fragment when input '၉၊'`, () => {
        const input = '၉၊';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉');
    });

    it(String.raw`should return number fragment when input '၄)'`, () => {
        const input = '၄)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၄');
    });

    it(String.raw`should return number fragment when input '၉၀။'`, () => {
        const input = '၉၀။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉၀');
    });

    it(String.raw`should return number fragment when input '၀၉။'`, () => {
        const input = '၀၉။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe(input);
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၉');
    });

    it(String.raw`should return number fragment when input with space '၀၉ ။'`, () => {
        const input = '၀၉ ။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၀၉။');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၉');
        expect(fragment.spaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with space \u200B '၀၉​။'`, () => {
        const input = '၀၉​။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၀၉။');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၉');
        expect(fragment.invisibleSpaceIncluded).toBeTruthy();
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with \u101D and \u104E '၉ဝ၎။'`, () => {
        const input = '၉ဝ၎။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၉၀၄။');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၉၀၄');
        expect(fragment.error).toEqual({
            invalidU101DInsteadOfU1040: true,
            invalidU104EInsteadOfU1044: true
        });
    });

});
