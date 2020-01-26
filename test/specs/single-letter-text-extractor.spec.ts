import { SingleLetterTextExtractor } from '../../src/single-letter-text-extractor';
import { TextExtractor } from '../../src/text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('SingleLetterTextExtractor#extractNext', () => {
    let extractor: TextExtractor;

    beforeEach(() => {
        extractor = new SingleLetterTextExtractor();
    });

    describe('alphabet', () => {
        it(String.raw`should return alphabet fragment when input 'ဤ'`, () => {
            const input = 'ဤ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဪ'`, () => {
            const input = 'ဪ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဤက'`, () => {
            const input = 'ဤက';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: 'ဤ',
                normalizedStr: 'ဤ',
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('single-alphabet-input', () => {
        it(String.raw`should return alphabet fragment when input 'က'`, () => {
            const input = 'က';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'အ'`, () => {
            const input = 'အ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဣ'`, () => {
            const input = 'ဣ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဥ'`, () => {
            const input = 'ဥ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဧ'`, () => {
            const input = 'ဧ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဩ'`, () => {
            const input = 'ဩ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input 'ဿ'`, () => {
            const input = 'ဿ';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return alphabet fragment when input '၎'`, () => {
            const input = '၎';
            const actualFragment = extractor.extractNext(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                alphabet: true
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
