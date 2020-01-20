import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

import { formatCodePoints } from './../shared/format-code-points';

describe('MyanmarTextFragmenter#getNextFragment#number#phone', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

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
            spaceDetected: true
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
            spaceDetected: true
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
            spaceDetected: true,
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
            spaceDetected: true,
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
            spaceDetected: true,
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
            spaceDetected: true,
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
            spaceDetected: true,
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
            spaceDetected: true,
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
            spaceDetected: true,
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
