import { TextExtractor } from './text-extractor';
import { FragmentType, TextFragment } from './text-fragment';

export class SingleCharTextExtractor implements TextExtractor {
    extractNext(input: string, firstCp: number): TextFragment | null {
        // ဤ / ဪ နှင့် [က-အ] / ဣ / ဥ / ဦ / ဧ / ဩ / ဿ / ၎ တစ်လုံးတည်း
        if (firstCp === 0x1024 || firstCp === 0x102A ||
            (input.length === 1 && ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029 || firstCp === 0x103F || firstCp === 0x104E))) {
            return {
                fragmentType: FragmentType.Letter,
                matchedStr: input[0],
                normalizedStr: input[0]
            };
        }

        // ၌ / ၍ / ၏
        if (firstCp === 0x104C || firstCp === 0x104D || firstCp === 0x104F) {
            return {
                fragmentType: FragmentType.Letter,
                matchedStr: input[0],
                normalizedStr: input[0],
                punctuation: true
            };
        }

        // ၊ / ။
        if (firstCp === 0x104A || firstCp === 0x104B) {
            return {
                fragmentType: FragmentType.Symbol,
                matchedStr: input[0],
                normalizedStr: input[0],
                punctuation: true
            };
        }

        if (input.length === 1) {
            // [၀-၉]
            if (firstCp >= 0x1040 && firstCp <= 0x1049) {
                return {
                    fragmentType: FragmentType.Number,
                    matchedStr: input[0],
                    normalizedStr: input[0],
                    digitOrDigitGroup: true,
                    digitOrDigitGroupStr: input[0],
                };
            }

            // Diacritics
            if ((firstCp >= 0x102B && firstCp <= 0x1032) || (firstCp >= 0x1036 && firstCp <= 0x103E)) {
                return {
                    fragmentType: FragmentType.Symbol,
                    matchedStr: input[0],
                    normalizedStr: input[0],
                    diacritic: true
                };
            }
        }

        return null;
    }
}
