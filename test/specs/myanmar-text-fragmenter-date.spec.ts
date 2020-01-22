import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#date', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    describe('day-month-year', () => {
        // dd-MM-yyyy
        it(String.raw`should return date fragment when input '၀၁-၀၁-၂၀၂၀'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-'
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
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd/MM/yyyy',
                dateSeparator: '/'
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
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd.MM.yyyy',
                dateSeparator: '.'
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
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd_MM_yyyy',
                dateSeparator: '_'
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
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊'
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
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd~MM~yyyy',
                dateSeparator: '~'
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
                spaceDetected: true,
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' '
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // d/M/yyyy
        it(String.raw`should return date fragment when input '၃၁/၁/၂၀၂၀'`, () => {
            const input = '၃၁/၁/၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'd/M/yyyy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/MM/yy
        it(String.raw`should return date fragment when input '၃၁/၀၁/၂၀'`, () => {
            const input = '၃၁/၀၁/၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd/MM/yy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // d/M/yy
        it(String.raw`should return date fragment when input '၃၁/၁/၂၀'`, () => {
            const input = '၃၁/၁/၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'd/M/yy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with -
        it(String.raw`should return date fragment when input '၀၁-၀၁-၂၀၂၀-'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀-';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with /
        it(String.raw`should return date fragment when input '၀၁-၀၁-၂၀၂၀/'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀/';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with \u1000
        it(String.raw`should return date fragment when input '၀၁-၀၁-၂၀၂၀\u1000'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀\u1000';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('year-month-day', () => {
        // yyyy/MM/dd
        it(String.raw`should return date fragment when input '၂၀၂၀/၀၁/၃၁'`, () => {
            const input = '၂၀၂၀/၀၁/၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'yyyy/MM/dd',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy-MM-dd
        it(String.raw`should return date fragment when input '၂၀၂၀-၀၁-၃၁'`, () => {
            const input = '၂၀၂၀-၀၁-၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'yyyy-MM-dd',
                dateSeparator: '-'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy/M/d
        it(String.raw`should return date fragment when input '၂၀၂၀/၁/၃၁'`, () => {
            const input = '၂၀၂၀/၁/၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'yyyy/M/d',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy MM dd
        it(String.raw`should return date fragment when input '၂၀၂၀ ၀၁ ၃၁'`, () => {
            const input = '၂၀၂၀ ၀၁ ၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                spaceDetected: true,
                dateFormat: 'yyyy MM dd',
                dateSeparator: ' '
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyyMMdd
        it(String.raw`should return date fragment when input '၂၀၂၀၀၁၃၁'`, () => {
            const input = '၂၀၂၀၀၁၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'yyyyMMdd'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('month-day-year', () => {
        // MM/dd/yyyy
        it(String.raw`should return date fragment when input '၁၂/၃၁/၂၀၂၀'`, () => {
            const input = '၁၂/၃၁/၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'MM/dd/yyyy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // M/d/yyyy
        it(String.raw`should return date fragment when input '၁/၃၁/၂၀၂၀'`, () => {
            const input = '၁/၃၁/၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleDate,
                dateFormat: 'M/d/yyyy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('normalize', () => {
        // dd\u00A0MM\u00A0yyyy
        it(String.raw`should return date fragment when input '၃၁\u00A0၁၂\u00A0၂၀၂၀'`, () => {
            const input = '၃၁\u00A0၁၂\u00A0၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁ ၁၂ ၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceDetected: true,
                normalizationReason: {
                    normalizeSpace: true
                },
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' '
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd ၊ MM ၊ yyyy
        it(String.raw`should return date fragment when input '၃၁ ၊ ၁၂ ၊ ၂၀၂၀'`, () => {
            const input = '၃၁ ၊ ၁၂ ၊ ၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁၊၁၂၊၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceDetected: true,
                normalizationReason: {
                    removeSpace: true
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/ MM/ yyyy
        it(String.raw`should return date fragment when input '၃၁/ ၁၂/ ၂၀၂၀'`, () => {
            const input = '၃၁/ ၁၂/ ၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁/၁၂/၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceDetected: true,
                normalizationReason: {
                    removeSpace: true
                },
                dateFormat: 'dd/MM/yyyy',
                dateSeparator: '/'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('invalid', () => {
        // Invalid \U101D
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
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Invalid \U104E
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
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Invalid \U101D and \U104E
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
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊'
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Invalid space
        it(String.raw`should return date fragment with INVALID when input '၃၁\u200B၁၂\u200B၂၀၂၀'`, () => {
            const input = '၃၁\u200B၁၂\u200B၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၃၁ ၁၂ ၂၀၂၀',
                fragmentType: FragmentType.PossibleDate,
                spaceDetected: true,
                normalizationReason: {
                    normalizeSpace: true
                },
                invalidReason: {
                    invalidSpaceIncluded: true
                },
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' '
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        it(String.raw`should NOT return date fragment when input '၃၂-၁၂-၂၀၂၀'`, () => {
            const input = '၃၂-၁၂-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၃၀-၁၃-၂၀၂၀'`, () => {
            const input = '၃၀-၁၃-၂၀၂၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၃၀-၁၂-၃၀၀၀'`, () => {
            const input = '၃၀-၁၂-၃၀၀၀';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၂၀/၁/၃၁'`, () => {
            const input = '၂၀/၁/၃၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀၅'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀၅';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀\u101D'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀\u101D';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀\u104E'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀\u104E';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀#'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀#';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀$'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀$';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀%'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀%';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀+'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀+';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀@'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀@';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀\uFF0B'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀\uFF0B';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀!၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀!၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀/၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀/၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀:၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀:၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀>၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀>၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀?၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀?၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀[၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀[၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀_၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀_၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁-၀၁-၂၀၂၀|၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀|၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return date fragment when input '၀၁ ၀၁ ၂၀၂၀ ၁'`, () => {
            const input = '၀၁ ၀၁ ၂၀၂၀ ၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleDate).toBeTruthy();
        });
    });
});
