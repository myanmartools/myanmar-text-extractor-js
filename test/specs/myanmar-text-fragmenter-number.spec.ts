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
            numberStr: '၀'
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
            numberStr: '၉'
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

    it(String.raw`should return number fragment when input '၀၉'`, () => {
        const input = '၀၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၀၉'
        });
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

    it(String.raw`should return number fragment when input with separator '၁,၉၉၉'`, () => {
        const input = '၁,၉၉၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁၉၉၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၉၄၀',
            numberStrnumberSeparatorIncluded: true,
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
            numberStr: '၁၉၉၉.၀၂',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၉၄၀.၀၄',
            numberStrnumberSeparatorIncluded: true,
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true,
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၃.၁၄၁၅၉၂၆၅၃၅',
            numberStrnumberSeparatorIncluded: true
        });
    });

    // \u00B7
    it(String.raw`should return number fragment when input with separator and decimal dot '၁,၂၃၄,၅၆၇·၈၉'`, () => {
        const input = '၁,၂၃၄,၅၆၇·၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၁,၂၃၄,၅၆၇.၈၉',
            fragmentType: FragmentType.Number,
            numberStr: '၁၂၃၄၅၆၇.၈၉',
            numberStrnumberSeparatorIncluded: true
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
            numberStr: '၁',
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
            numberStr: '၂၀',
            ancient: true,
            measureWords: ['အင်္ဂါ']
        });
    });

    it(String.raw`should return 'အင်္ဂါ' number fragment when input '၁,၉၂င်္၀ါ'`, () => {
        const input = '၁,၉၂င်္၀ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁၉၂၀',
            ancient: true,
            measureWords: ['အင်္ဂါ'],
            numberStrnumberSeparatorIncluded: true
        });
    });

    // invalid space
    it(String.raw`should return 'အင်္ဂါ' number fragment with ERROR when input 'င်္၁ ါ'`, () => {
        const input = 'င်္၁ ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: 'င်္၁ါ',
            fragmentType: FragmentType.Number,
            numberStr: '၁',
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
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁',
            ancient: true,
            measureWords: ['တောင်း', 'တင်း']
        });
    });

    it(String.raw`should return 'ဆယ်သား' number fragment when input '(၁)၀ိ'`, () => {
        const input = '(၁)၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁၀',
            ancient: true,
            measureWords: ['ဆယ်သား']
        });
    });

    it(String.raw`should return 'ဆယ်သား' number fragment with ERROR when input '( ၁ ) ၀ိ'`, () => {
        const input = '( ၁ ) ၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၁)၀ိ',
            fragmentType: FragmentType.Number,
            numberStr: '၁၀',
            ancient: true,
            measureWords: ['ဆယ်သား'],
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true
            }
        });
    });

    it(String.raw`should return 'ဆယ်သား' number fragment with ERROR when input '(\u104E)၀ိ'`, () => {
        const input = '(\u104E)၀ိ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၄)၀ိ',
            fragmentType: FragmentType.Number,
            numberStr: '၄၀',
            ancient: true,
            measureWords: ['ဆယ်သား'],
            error: {
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment when input '(၁)'`, () => {
        const input = '(၁)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁'
        });
    });

    it(String.raw`should return number fragment when input '(၉၀)'`, () => {
        const input = '(၉၀)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၉၀'
        });
    });

    it(String.raw`should return number fragment when input '(၀၉)'`, () => {
        const input = '(၀၉)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၀၉'
        });
    });

    it(String.raw`should return number fragment with ERROR when input '( ၉ )'`, () => {
        const input = '( ၉ )';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၉)',
            fragmentType: FragmentType.Number,
            numberStr: '၉',
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input \u200B '(​၉​)'`, () => {
        const input = '(​၉​)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၉)',
            fragmentType: FragmentType.Number,
            numberStr: '၉',
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '(\u101D၁)'`, () => {
        const input = '(\u101D၁)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၀၁)',
            fragmentType: FragmentType.Number,
            numberStr: '၀၁',
            error: {
                invalidU101DInsteadOfU1040: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '(၉\u101D\u104E)'`, () => {
        const input = '(၉\u101D\u104E)';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '(၉၀၄)',
            fragmentType: FragmentType.Number,
            numberStr: '၉၀၄',
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    it(String.raw`should return number fragment when input '၁။'`, () => {
        const input = '၁။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၁'
        });
    });

    it(String.raw`should return number fragment when input '၉၊'`, () => {
        const input = '၉၊';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၉'
        });
    });

    it(String.raw`should return number fragment when input '၉၀။'`, () => {
        const input = '၉၀။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၉၀'
        });
    });

    it(String.raw`should return number fragment when input '၀၉။'`, () => {
        const input = '၀၉။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၀၉'
        });
    });

    it(String.raw`should return number fragmentwith ERROR when input '၀၉ ။'`, () => {
        const input = '၀၉ ။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၀၉။',
            fragmentType: FragmentType.Number,
            numberStr: '၀၉',
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input \u200B '၀၉​။'`, () => {
        const input = '၀၉​။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၀၉။',
            fragmentType: FragmentType.Number,
            numberStr: '၀၉',
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '\u101D၁။'`, () => {
        const input = '\u101D၁။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၀၁။',
            fragmentType: FragmentType.Number,
            numberStr: '၀၁',
            error: {
                invalidU101DInsteadOfU1040: true
            }
        });
    });

    it(String.raw`should return number fragment with ERROR when input '၉\u101D\u104E။'`, () => {
        const input = '၉\u101D\u104E။';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၉၀၄။',
            fragmentType: FragmentType.Number,
            numberStr: '၉၀၄',
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });

    // Phone numbers
    //
    it(String.raw`should return phone number fragment when input '+၉၅၉'`, () => {
        const input = '+၉၅၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+၉၅ ၉'`, () => {
        const input = '+၉၅ ၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+၉ ၅ ၉'`, () => {
        const input = '+၉ ၅ ၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+(၉၅)၉'`, () => {
        const input = '+(၉၅)၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+(၉၅) ၉'`, () => {
        const input = '+(၉၅) ၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+[၉၅] ၉'`, () => {
        const input = '+[၉၅] ၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+၉၅.၉'`, () => {
        const input = '+၉၅.၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉'`, () => {
        const input = '+၉၅ (၉) ၁၂၃ ၄၅၆၇၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉'`, () => {
        const input = '+၉၅ (၉) ၁၂၃-၄၅၆-၇၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment when input '+ ၉၅ . (၉) [၁၂၃]-(၄၅၆)-၇၈၉'`, () => {
        const input = '+ ၉၅ . (၉) [၁၂၃]-(၄၅၆)-၇၈၉';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '+၉၅၉၁၂၃၄၅၆၇၈၉',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            numberStrnumberSeparatorIncluded: true
        });
    });

    it(String.raw`should return phone number fragment with ERROR when input '+\u104E\u101D\u200B၁၂၃၄၅၆'`, () => {
        const input = '+\u104E\u101D\u200B၁၂၃၄၅၆';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '+၄၀၁၂၃၄၅၆',
            fragmentType: FragmentType.Number,
            numberStr: '+၄၀၁၂၃၄၅၆',
            possiblePhoneNumber: true,
            plusSignIncluded: true,
            spaceIncluded: true,
            error: {
                invalidSpaceIncluded: true,
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
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
            numberStr: '၉၉၉',
            possiblePhoneNumber: true
        });
    });

    it(String.raw`should return phone number fragment when input '၅၅၁၂၃'`, () => {
        const input = '၅၅၁၂၃';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            numberStr: '၅၅၁၂၃',
            possiblePhoneNumber: true
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
            numberStr: '၁၂၃၄၅၆၇',
            spaceIncluded: true,
            possiblePhoneNumber: true
        });
    });

    it(String.raw`should return number fragment with ERROR when input '၉၉\u101D'`, () => {
        const input = '၉၉\u101D';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: '၉၉၀',
            fragmentType: FragmentType.Number,
            numberStr: '၉၉၀',
            possiblePhoneNumber: true,
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
            numberStr: '၉၉၄',
            possiblePhoneNumber: true,
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
            numberStr: '၉၄၀',
            possiblePhoneNumber: true,
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
            numberStr: '၀၉၉',
            possiblePhoneNumber: true,
            error: {
                invalidU101DInsteadOfU1040: true
            }
        });
    });
});
