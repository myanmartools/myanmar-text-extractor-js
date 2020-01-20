import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#number#date', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    describe('valid', () => {
        // dd-MM-yyyy
        it(String.raw`should return date fragment when input '၀၁-၀၁-၂၀၂၀'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/MM/yyyy
        it(String.raw`should return date fragment when input '၀၁/၀၁/၂၀၂၀'`, () => {
            const input = '၀၁/၀၁/၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd.MM.yyyy
        it(String.raw`should return date fragment when input '၀၁.၀၁.၂၀၂၀'`, () => {
            const input = '၀၁.၀၁.၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd_MM_yyyy
        it(String.raw`should return date fragment when input '၀၁_၀၁_၂၀၂၀'`, () => {
            const input = '၀၁_၀၁_၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd၊MM၊yyyy
        it(String.raw`should return date fragment when input '၀၁၊၀၁၊၂၀၂၀'`, () => {
            const input = '၀၁၊၀၁၊၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd~MM~yyyy
        it(String.raw`should return date fragment when input '၀၁~၀၁~၂၀၂၀'`, () => {
            const input = '၀၁~၀၁~၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd MM yyyy
        it(String.raw`should return date fragment when input '၃၁ ၁၂ ၂၀၂၀'`, () => {
            const input = '၃၁ ၁၂ ၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                spaceIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // d/M/yyyy
        it(String.raw`should return date fragment when input '၁/၁/၂၀၂၀'`, () => {
            const input = '၁/၁/၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('normalize', () => {
        // dd ၊ MM ၊ yyyy
        it(String.raw`should return date fragment when input '၃၁ ၊ ၁၂ ၊ ၂၀၂၀'`, () => {
            const input = '၃၁ ၊ ၁၂ ၊ ၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁၊၁၂၊၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceIncluded: true,
                normalizationReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd / MM / yyyy
        it(String.raw`should return date fragment when input '၃၁ / ၁၂ / ၂၀၂၀'`, () => {
            const input = '၃၁ / ၁၂ / ၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁/၁၂/၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceIncluded: true,
                normalizationReason: {
                    removeSpace: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('invalid', () => {
        // dd၊MM၊yyyy(INVALID \U101D)
        it(String.raw`should return date fragment with INVALID when input '၃၁၊၁၂၊၂၀၂\u101D'`, () => {
            const input = '၃၁၊၁၂၊၂၀၂\u101D';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁၊၁၂၊၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                normalizationReason: {
                    changeU101DToU1040: true
                },
                invalidReason: {
                    invalidU101DInsteadOfU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd၊MM၊yyyy (INVALID \U104E)
        it(String.raw`should return date fragment with INVALID when input '၁\u104E၊၁၂၊၂၀၂၀'`, () => {
            const input = '၁\u104E၊၁၂၊၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၄၊၁၂၊၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                normalizationReason: {
                    changeU104EToU1044: true
                },
                invalidReason: {
                    invalidU104EInsteadOfU1044: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd၊MM၊yyyy (INVALID \U101D and \U104E)
        it(String.raw`should return date fragment with INVALID when input '၁\u104E၊၁၂၊၂\u101D၂\u101D'`, () => {
            const input = '၁\u104E၊၁၂၊၂\u101D၂\u101D';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၄၊၁၂၊၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                normalizationReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                },
                invalidReason: {
                    invalidU104EInsteadOfU1044: true,
                    invalidU101DInsteadOfU1040: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyyMMdd
        it(String.raw`should return date fragment when input '၂၀၂၀၀၁၀၁'`, () => {
            const input = '၂၀၂၀၀၁၀၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy-MM-dd
        it(String.raw`should return date fragment when input '၂၀၂၀-၀၁-၀၁'`, () => {
            const input = '၂၀၂၀-၀၁-၀၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        // NOT #1
        it(String.raw`should NOT return date fragment when input '၃၂-၁၂-၂၀၂၀'`, () => {
            const input = '၃၂-၁၂-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeFalsy();
        });

        // NOT #2
        it(String.raw`should NOT return date fragment when input '၃၀-၁၃-၂၀၂၀'`, () => {
            const input = '၃၀-၁၃-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeFalsy();
        });

        // NOT #3
        it(String.raw`should NOT return date fragment when input '၃၀-၁၂-၃၀၀၀'`, () => {
            const input = '၃၀-၁၂-၃၀၀၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeFalsy();
        });
    });
});
