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
            separatorIncluded: true
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
            separatorIncluded: true,
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
            separatorIncluded: true
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
            separatorIncluded: true,
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true,
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            separatorIncluded: true
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
            digitStr: '၁၂၃၄၅၆၇.၈၉',
            separatorIncluded: true
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

    it(String.raw`should return 'အင်္ဂါ' number fragment when input '၁,၉၂င်္၀ါ'`, () => {
        const input = '၁,၉၂င်္၀ါ';
        const fragment = fragmenter.getNextFragment(input) as TextFragment;

        expect(fragment.matchedStr).toBe(input,
            `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁၉၂၀',
            ancient: true,
            measureWords: ['အင်္ဂါ'],
            separatorIncluded: true
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
        expect(fragment).toEqual({
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Number,
            digitStr: '၁',
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
            digitStr: '၁၀',
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
            digitStr: '၁၀',
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
            digitStr: '၄၀',
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
            digitStr: '၁'
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
            digitStr: '၉၀'
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
            digitStr: '၀၉'
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
            digitStr: '၉',
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
            digitStr: '၉',
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
            digitStr: '၀၁',
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
            digitStr: '၉၀၄',
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
            digitStr: '၁'
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
            digitStr: '၉'
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
            digitStr: '၉၀'
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
            digitStr: '၀၉'
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
            digitStr: '၀၉',
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
            digitStr: '၀၉',
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
            digitStr: '၀၁',
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
            digitStr: '၉၀၄',
            error: {
                invalidU101DInsteadOfU1040: true,
                invalidU104EInsteadOfU1044: true
            }
        });
    });
});
