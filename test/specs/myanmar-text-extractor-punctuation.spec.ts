import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextExtractor } from '../../src/myanmar-text-extractor';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextExtractor#extractNext#punctuation', () => {
    let extractor: MyanmarTextExtractor;

    beforeEach(() => {
        extractor = new MyanmarTextExtractor();
    });

    // ၌
    it(String.raw`should return punctuation fragment when input '\u104C'`, () => {
        const input = '\u104C';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၍
    it(String.raw`should return punctuation fragment when input '\u104D'`, () => {
        const input = '\u104D';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၏
    it(String.raw`should return punctuation fragment when input '\u104F'`, () => {
        const input = '\u104F';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၊
    it(String.raw`should return punctuation fragment when input '\u104A'`, () => {
        const input = '\u104A';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ။
    it(String.raw`should return punctuation fragment when input '\u104B'`, () => {
        const input = '\u104B';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: input,
            normalizedStr: input,
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });

    // ၌ + any char
    it(String.raw`should return punctuation fragment when input '\u104C\u1000'`, () => {
        const input = '\u104C\u1000';
        const actualFragment = extractor.extractNext(input) as TextFragment;
        const expactedFragment: TextFragment = {
            matchedStr: '\u104C',
            normalizedStr: '\u104C',
            fragmentType: FragmentType.Punctuation
        };

        expect(actualFragment).toEqual(expactedFragment);
    });
});
