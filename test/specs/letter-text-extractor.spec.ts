import { LetterTextExtractor } from '../../src/letter-text-extractor';
import { FragmentType, TextFragment } from '../../src/text-fragment';

describe('LetterTextExtractor', () => {
    let extractor: LetterTextExtractor;

    beforeEach(() => {
        extractor = new LetterTextExtractor();
    });

    describe('with-diacritics', () => {
        it(String.raw`should return fragment when input 'ကွ'`, () => {
            const input = 'ကွ';
            const actualFragment = extractor.extractNext(input);
            const expactedFragment: TextFragment = {
                fragmentType: FragmentType.Letter,
                matchedStr: input,
                normalizedStr: input
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });
});
