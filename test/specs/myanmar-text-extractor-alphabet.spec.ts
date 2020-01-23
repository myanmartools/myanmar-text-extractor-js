import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextExtractor } from '../../src/myanmar-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextExtractor#extractNext#alphabet', () => {
    let extractor: MyanmarTextExtractor;

    beforeEach(() => {
        extractor = new MyanmarTextExtractor();
    });

    describe('single-alphabet', () => {
        // ဤ
        it(String.raw`should return alphabet fragment when input '\u1024'`, () => {
            const input = '\u1024';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဪ
        it(String.raw`should return alphabet fragment when input '\u102A'`, () => {
            const input = '\u102A';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဤ + any char
        it(String.raw`should return alphabet fragment when input '\u1024\u1000'`, () => {
            const input = '\u1024\u1000';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: '\u1024',
                normalizedStr: '\u1024',
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-char-input', () => {
        // က
        it(String.raw`should return alphabet fragment when input '\u1000'`, () => {
            const input = '\u1000';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // အ
        it(String.raw`should return alphabet fragment when input '\u1021'`, () => {
            const input = '\u1021';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဣ
        it(String.raw`should return alphabet fragment when input '\u1023'`, () => {
            const input = '\u1023';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဥ
        it(String.raw`should return alphabet fragment when input '\u1025'`, () => {
            const input = '\u1025';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဧ
        it(String.raw`should return alphabet fragment when input '\u1027'`, () => {
            const input = '\u1027';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဩ
        it(String.raw`should return alphabet fragment when input '\u1029'`, () => {
            const input = '\u1029';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ဿ
        it(String.raw`should return alphabet fragment when input '\u103F'`, () => {
            const input = '\u103F';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // ၎
        it(String.raw`should return alphabet fragment when input '\u104E'`, () => {
            const input = '\u104E';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.Alphabet
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    // Errors
    // 'ါ' -> 'ါ'
    // it(String.raw`'\u102B' -> '\u102B'`, () => {
    //     const fragment = extractor.extractNext('\u102B') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u102B',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });

    // // '္' -> '္'
    // it(String.raw`'\u1039' -> '\u1039'`, () => {
    //     const fragment = extractor.extractNext('\u1039') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u1039',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });

    // // '္က' -> '္က'
    // it(String.raw`'\u1039\u1000' -> '\u1039\u1000'`, () => {
    //     const fragment = extractor.extractNext('\u1039\u1000') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u1039\u1000',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });

    // // 'ါက' -> 'ါ'
    // it(String.raw`'\u102B\u1000' -> '\u102B'`, () => {
    //     const fragment = extractor.extractNext('\u102B\u1000') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u102B',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });

    // // 'ျြွှေိီုူံဲ့ါာ်းက' -> 'ျြွှေိီုူံဲ့ါာ်း'
    // it(String.raw`'\u103B\u103C\u103D\u103E\u1031\u102D\u102E\u102F\u1030\u1036\u1032\u1037\u102B\u102C\u103A\u1038\u1000' -> '\u103B\u103C\u103D\u103E\u1031\u102D\u102E\u102F\u1030\u1036\u1032\u1037\u102B\u102C\u103A\u1038'`, () => {
    //     const fragment = extractor.extractNext('\u103B\u103C\u103D\u103E\u1031\u102D\u102E\u102F\u1030\u1036\u1032\u1037\u102B\u102C\u103A\u1038\u1000') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u103B\u103C\u103D\u103E\u1031\u102D\u102E\u102F\u1030\u1036\u1032\u1037\u102B\u102C\u103A\u1038',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });

    // // 'ဳဴဵက' -> 'ဳဴဵ'
    // it(String.raw`'\u1033\u1034\u1035\u1000' -> '\u1033\u1034\u1035'`, () => {
    //     const fragment = extractor.extractNext('\u1033\u1034\u1035\u1000') as TextFragment;

    //     expect(fragment.matchedString).toBe('\u1033\u1034\u1035',
    //         `\n\nActual fragmentedString: ${formatCodePoints(fragment.matchedString)}`);
    //     expect(fragment.error).toBeTruthy();
    //     expect(fragment.error!.invalidStart).toBeTruthy();
    //     expect(fragment.error!.invalidUnicodeForm).toBeTruthy();
    // });
});
