import { NumberTextExtractor } from '../../src/number-text-extractor';
import { TextFragment, FragmentType } from '../../src/text-fragment';

describe('NumberGroupTextExtractor#date', () => {
    let extractor: NumberTextExtractor;

    beforeEach(() => {
        extractor = new NumberTextExtractor();
    });

    describe('day-month-year', () => {
        // dd-MM-yyyy
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd-MM-yyyy
        it(String.raw`should return fragment when input '၀၁-၀၁-၉၉၉၉'`, () => {
            const input = '၀၁-၀၁-၉၉၉၉';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/MM/yyyy
        it(String.raw`should return fragment when input '၀၁/၀၁/၂၀၂၀'`, () => {
            const input = '၀၁/၀၁/၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd/MM/yyyy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd.MM.yyyy
        it(String.raw`should return fragment when input '၀၁.၀၁.၂၀၂၀'`, () => {
            const input = '၀၁.၀၁.၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd.MM.yyyy',
                dateSeparator: '.',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd_MM_yyyy
        it(String.raw`should return fragment when input '၀၁_၀၁_၂၀၂၀'`, () => {
            const input = '၀၁_၀၁_၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd_MM_yyyy',
                dateSeparator: '_',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd၊MM၊yyyy
        it(String.raw`should return fragment when input '၀၁၊၀၁၊၂၀၂၀'`, () => {
            const input = '၀၁၊၀၁၊၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd~MM~yyyy
        it(String.raw`should return fragment when input '၀၁~၀၁~၂၀၂၀'`, () => {
            const input = '၀၁~၀၁~၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd~MM~yyyy',
                dateSeparator: '~',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd MM yyyy
        it(String.raw`should return fragment when input '၃၁ ၁၂ ၂၀၂၀'`, () => {
            const input = '၃၁ ၁၂ ၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                spaceIncluded: true,
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' ',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // d/M/yyyy
        it(String.raw`should return fragment when input '၃၁/၁/၂၀၂၀'`, () => {
            const input = '၃၁/၁/၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'd/M/yyyy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/MM/yy
        it(String.raw`should return fragment when input '၃၁/၀၁/၂၀'`, () => {
            const input = '၃၁/၀၁/၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'dd/MM/yy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // d/M/yy
        it(String.raw`should return fragment when input '၃၁/၁/၂၀'`, () => {
            const input = '၃၁/၁/၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'd/M/yy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with က၁
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀က၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀က၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with -
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀-'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀-';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with -က
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀-က'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀-က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with /
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀/'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀/';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with @
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀@'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀@';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with @က
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀@က'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀@က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with က
        it(String.raw`should return fragment when input '၀၁-၀၁-၂၀၂၀က'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁-၀၁-၂၀၂၀',
                normalizedStr: '၀၁-၀၁-၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd-MM-yyyy',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Ends with space + က
        it(String.raw`should return fragment when input '၀၁ ၀၁ ၂၀၂၀ က'`, () => {
            const input = '၀၁ ၀၁ ၂၀၂၀ က';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: '၀၁ ၀၁ ၂၀၂၀',
                normalizedStr: '၀၁ ၀၁ ၂၀၂၀',
                possibleDate: true,
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' ',
                spaceIncluded: true,
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Normalize
        //
        // dd\u00A0MM\u00A0yyyy
        it(String.raw`should return fragment when input '၃၁\u00A0၁၂\u00A0၂၀၂၀'`, () => {
            const input = '၃၁\u00A0၁၂\u00A0၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၃၁ ၁၂ ၂၀၂၀',
                possibleDate: true,
                spaceIncluded: true,
                normalizeReason: {
                    normalizeSpace: true
                },
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' ',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd ၊ MM ၊ yyyy
        it(String.raw`should return fragment when input '၃၁ ၊ ၁၂ ၊ ၂၀၂၀'`, () => {
            const input = '၃၁ ၊ ၁၂ ၊ ၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၃၁၊၁၂၊၂၀၂၀',
                possibleDate: true,
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // dd/ MM/ yyyy
        it(String.raw`should return fragment when input '၃၁/ ၁၂/ ၂၀၂၀'`, () => {
            const input = '၃၁/ ၁၂/ ၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၃၁/၁၂/၂၀၂၀',
                possibleDate: true,
                spaceIncluded: true,
                normalizeReason: {
                    removeSpace: true
                },
                dateFormat: 'dd/MM/yyyy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \U101D
        it(String.raw`should return fragment when input '၃၁၊၁၂၊၂၀၂\u101D'`, () => {
            const input = '၃၁၊၁၂၊၂၀၂\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၃၁၊၁၂၊၂၀၂၀',
                possibleDate: true,
                normalizeReason: {
                    changeU101DToU1040: true
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \U104E
        it(String.raw`should return fragment when input '၁\u104E၊၁၂၊၂၀၂၀'`, () => {
            const input = '၁\u104E၊၁၂၊၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၄၊၁၂၊၂၀၂၀',
                possibleDate: true,
                normalizeReason: {
                    changeU104EToU1044: true
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // \U101D and \U104E
        it(String.raw`should return fragment when input '၁\u104E၊၁၂၊၂\u101D၂\u101D'`, () => {
            const input = '၁\u104E၊၁၂၊၂\u101D၂\u101D';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၁၄၊၁၂၊၂၀၂၀',
                possibleDate: true,
                normalizeReason: {
                    changeU104EToU1044: true,
                    changeU101DToU1040: true
                },
                dateFormat: 'dd၊MM၊yyyy',
                dateSeparator: '၊',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // Space (\u200B)
        it(String.raw`should return fragment when input '၃၁\u200B၁၂\u200B၂၀၂၀'`, () => {
            const input = '၃၁\u200B၁၂\u200B၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: '၃၁ ၁၂ ၂၀၂၀',
                possibleDate: true,
                spaceIncluded: true,
                normalizeReason: {
                    normalizeSpace: true
                },
                dateFormat: 'dd MM yyyy',
                dateSeparator: ' ',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('year-month-day', () => {
        // yyyy/MM/dd
        it(String.raw`should return fragment when input '၂၀၂၀/၀၁/၃၁'`, () => {
            const input = '၂၀၂၀/၀၁/၃၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'yyyy/MM/dd',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy-MM-dd
        it(String.raw`should return fragment when input '၂၀၂၀-၀၁-၃၁'`, () => {
            const input = '၂၀၂၀-၀၁-၃၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'yyyy-MM-dd',
                dateSeparator: '-',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy/M/d
        it(String.raw`should return fragment when input '၂၀၂၀/၁/၃၁'`, () => {
            const input = '၂၀၂၀/၁/၃၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'yyyy/M/d',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // yyyy MM dd
        it(String.raw`should return fragment when input '၂၀၂၀ ၀၁ ၃၁'`, () => {
            const input = '၂၀၂၀ ၀၁ ၃၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                spaceIncluded: true,
                dateFormat: 'yyyy MM dd',
                dateSeparator: ' ',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('iso-no-separator', () => {
        // yyyyMMdd
        it(String.raw`should return fragment when input '၂၀၂၀၀၁၃၁'`, () => {
            const input = '၂၀၂၀၀၁၃၁';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'yyyyMMdd',
                possiblePhoneNumber: true,
                phoneNumberStr: input,
                decimal: true,
                decimalStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('month-day-year', () => {
        // MM/dd/yyyy
        it(String.raw`should return fragment when input '၁၂/၃၁/၂၀၂၀'`, () => {
            const input = '၁၂/၃၁/၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'MM/dd/yyyy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // M/d/yyyy
        it(String.raw`should return fragment when input '၁/၃၁/၂၀၂၀'`, () => {
            const input = '၁/၃၁/၂၀၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'M/d/yyyy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // MM/dd/yy
        it(String.raw`should return fragment when input '၁၁/၃၁/၂၀'`, () => {
            const input = '၁၁/၃၁/၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'MM/dd/yy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // M/d/yy
        it(String.raw`should return fragment when input '၁/၃၁/၂၀'`, () => {
            const input = '၁/၃၁/၂၀';
            const actualFragment = extractor.extractNext(input, input.codePointAt(0) as number);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Number,
                matchedStr: input,
                normalizedStr: input,
                possibleDate: true,
                dateFormat: 'M/d/yy',
                dateSeparator: '/',
                separatorIncluded: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        it(String.raw`should NOT return fragment when input '၎-၎-၎ဝဝဝ'`, () => {
            const input = '၎-၎-၎ဝဝဝ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၃၂-၁၂-၂၀၂၀'`, () => {
            const input = '၃၂-၁၂-၂၀၂၀';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၃၀-၁၃-၂၀၂၀'`, () => {
            const input = '၃၀-၁၃-၂၀၂၀';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၃၀-၁၂-၀၀၀၁'`, () => {
            const input = '၃၀-၁၂-၀၀၀၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၂၀/၁/၃၁'`, () => {
            const input = '၂၀/၁/၃၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁ ၀၁  ၂၀၂၀'`, () => {
            const input = '၀၁ ၀၁  ၂၀၂၀';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁--၀၁--၂၀၂၀'`, () => {
            const input = '၀၁--၀၁--၂၀၂၀';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁/၂၀၂၀'`, () => {
            const input = '၀၁-၀၁/၂၀၂၀';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀၅'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀၅';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀၄၉'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀၅၄၉';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });


        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀\u104E၉'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀\u104E၉';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၂၀၂၀၀၁၀၁$'`, () => {
            const input = '၂၀၂၀၀၁၀၁$';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၂၀၂၀၀၁၀၁%'`, () => {
            const input = '၂၀၂၀၀၁၀၁%';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁ ၀၁ ၂၀၂၀%'`, () => {
            const input = '၀၁ ၀၁ ၂၀၂၀%';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀@ကခ.com'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀@ကခ.com';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀@၁၂၃'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀@၁၂၃';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀.၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀.၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀-၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀-၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၀_၁'`, () => {
            const input = '၀၁-၀၁-၂၀၂၀_၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁ ၀၁ ၂၀၂၀ ၁'`, () => {
            const input = '၀၁ ၀၁ ၂၀၂၀ ၁';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂ဝဲ' (\u101D)`, () => {
            const input = '၀၁-၀၁-၂၀၂ဝဲ';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });

        it(String.raw`should NOT return fragment when input '၀၁-၀၁-၂၀၂၎င်း' (\u104E)`, () => {
            const input = '၀၁-၀၁-၂၀၂၎င်း';
            const fragment = extractor.extractNext(input, input.codePointAt(0) as number);
            expect(fragment == null || !fragment.possibleDate).toBeTruthy();
        });
    });
});
