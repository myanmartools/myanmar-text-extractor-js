import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

import { formatCodePoints } from './../shared/format-code-points';

describe('MyanmarTextFragmenter#getNextFragment#number', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    it(String.raw`should return number fragment when input '၀'`, () => {
        const input = '၀';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၀'
        });
    });

    it(String.raw`should return number fragment when input '၉'`, () => {
        const input = '၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၉'
        });
    });

    it(String.raw`should return number fragment when input '၉၉၉'`, () => {
        const input = '၉၉၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၉၉၉'
        });
    });

    it(String.raw`should NOT return number fragment when input '\u101D'`, () => {
        const input = '\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should NOT return number fragment when input '\u104E'`, () => {
        const input = '\u104E';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should NOT return number fragment when input '\u101D\u101D'`, () => {
        const input = '\u101D\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should NOT return number fragment when input '\u104E\u104E'`, () => {
        const input = '\u104E\u104E';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should NOT return number fragment when input '\u104E\u101D'`, () => {
        const input = '\u104E\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should return number fragment with ERROR when input '၉၉\u101D'`, () => {
        const input = '၉၉\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၉၉၀',
            fragmentType: FragmentType.Number,
            digitStr: '၉၉၀',
            error: {
                invalidU101DInsteadOfU1040: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '၉၉\u104E'`, () => {
        const input = '၉၉\u104E';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၉၉၄',
            fragmentType: FragmentType.Number,
            digitStr: '၉၉၄',
            error: {
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '၉\u104E\u101D'`, () => {
        const input = '၉\u104E\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၉၄၀',
            fragmentType: FragmentType.Number,
            digitStr: '၉၄၀',
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '\u101D၉၉'`, () => {
        const input = '\u101D၉၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၀၉၉',
            fragmentType: FragmentType.Number,
            digitStr: '၀၉၉',
            error: {
                invalidU101DInsteadOfU1040: true
            }
        });
    });

    it(String.raw`should return number fragment when input with separator '၁,၉၉၉'`, () => {
        const input = '၁,၉၉၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၉၉၉',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should NOT return number fragment with when input '\u104E,\u104E\u104E\u101D'`, () => {
        const input = '\u104E,\u104E\u104E\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.fragmentType === FragmentType.Number).toBeFalsy();
    });

    it(String.raw`should return number fragment with ERROR when input '၁,၉\u104E\u101D'`, () => {
        const input = '၁,၉\u104E\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၉၄၀',
            fragmentType: FragmentType.Number,
            digitStr: '၁၉၄၀',
            digitSeparatorIncluded: true,
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁,၉၉၉.၀၂'`, () => {
        const input = '၁,၉၉၉.၀၂';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၉၉၉.၀၂',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return number fragment with ERROR when input '၁,၉\u104E\u101D.\u101D\u104E'`, () => {
        const input = '၁,၉\u104E\u101D.\u101D\u104E';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၉၄၀.၀၄',
            fragmentType: FragmentType.Number,
            digitStr: '၁၉၄၀.၀၄',
            digitSeparatorIncluded: true,
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁,၂၃၄,၅၆၇.၈၉'`, () => {
        const input = '၁,၂၃၄,၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    // \u066B
    it(String.raw`should return number fragment when input with separator and decimal dot '၁٫၂၃၄٫၅၆၇.၈၉'`, () => {
        const input = '၁٫၂၃၄٫၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    // \u066C
    it(String.raw`should return number fragment when input with separator and decimal dot '၁٬၂၃၄٬၅၆၇.၈၉'`, () => {
        const input = '၁٬၂၃၄٬၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    // \u2396
    it(String.raw`should return number fragment when input with separator and decimal dot '၁⎖၂၃၄⎖၅၆၇.၈၉'`, () => {
        const input = '၁⎖၂၃၄⎖၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    // \u0027
    it(String.raw`should return number fragment when input with separator and decimal dot "၁'၂၃၄'၅၆၇.၈၉"`, () => {
        const input = "၁'၂၃၄'၅၆၇.၈၉";
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: "၁'၂၃၄'၅၆၇.၈၉",
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    // \u005F
    it(String.raw`should return number fragment when input with separator and decimal dot '၁_၂၃၄_၅၆၇.၈၉'`, () => {
        const input = '၁_၂၃၄_၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁_၂၃၄_၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁ ၂၃၄ ၅၆၇'`, () => {
        const input = '၁ ၂၃၄ ၅၆၇';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇',
            spaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁ ၂၃၄ ၅၆၇.၈၉'`, () => {
        const input = '၁ ၂၃၄ ၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true,
            spaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁၂,၃၄,၅၆၇.၈၉'`, () => {
        const input = '၁၂,၃၄,၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁၂၃,၄၅၆၇.၈၉'`, () => {
        const input = '၁၂၃,၄၅၆၇.၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၃.၁၄၁၅၉၂၆၅၃၅'`, () => {
        const input = '၃.၁၄၁၅၉၂၆၅၃၅';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၃.၁၄၁၅၉၂၆၅၃၅',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with separator and decimal dot '၁,၂၃၄,၅၆၇·၈၉'`, () => {
        const input = '၁,၂၃၄,၅၆၇·၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            digitSeparatorIncluded: true
        });
    });

    it(String.raw`should return 'အင်္ဂါ' number fragment when input 'င်္၁ါ'`, () => {
        const input = 'င်္၁ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁',
            ancient: true,
            measureWords: ['အင်္ဂါ']
        });
    });

    it(String.raw`should return 'အင်္ဂါ' number fragment when input '၂င်္၀ါ'`, () => {
        const input = '၂င်္၀ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၂၀',
            ancient: true,
            measureWords: ['အင်္ဂါ']
        });
    });

    // invalid
    it(String.raw`should return 'အင်္ဂါ' number fragment when input with space 'င်္၁ ါ'`, () => {
        const input = 'င်္၁ ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: 'င်္၁ါ',
            fragmentType: FragmentType.Number,
            digitStr: '၁',
            ancient: true,
            measureWords: ['အင်္ဂါ'],
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true,
                invalidUnicodeForm: true
            }
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

    it(String.raw`should return 'ဆယ်သား' number fragment when input with \u101D '(၁)ဝိ'`, () => {
        const input = '(၁)ဝိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၁)၀ိ');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၁၀');
        expect(fragment.ancient).toBeTruthy();
        expect(fragment.measureWords).toEqual(['ဆယ်သား']);
        expect(fragment.error).toEqual({
            invalidU101DInsteadOfU1040: true
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
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with \u101D '(ဝ၁)'`, () => {
        const input = '(ဝ၁)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('(၀၁)');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၁');
        expect(fragment.error).toEqual({
            invalidU101DInsteadOfU1040: true
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
        expect(fragment.error).toEqual({
            invalidSpaceIncluded: true
        });
    });

    it(String.raw`should return number fragment when input with \u101D 'ဝ၁။'`, () => {
        const input = 'ဝ၁။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment.normalizedStr).toBe('၀၁။');
        expect(fragment.fragmentType).toEqual(FragmentType.Number);
        expect(fragment.digitStr).toBe('၀၁');
        expect(fragment.error).toEqual({
            invalidU101DInsteadOfU1040: true
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
