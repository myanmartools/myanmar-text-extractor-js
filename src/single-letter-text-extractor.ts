import { TextExtractor } from './text-extractor';
import { TextFragment } from './text-fragment';

export class SingleLetterTextExtractor implements TextExtractor {
    extractNext(input: string, firstCp?: number): TextFragment | null {
        firstCp = firstCp == null ? input.codePointAt(0) : firstCp;
        if (!firstCp) {
            return null;
        }

        // ဤ / ဪ နှင့် [က-အ] / ဣ / ဥ / ဦ / ဧ / ဩ / ဿ / ၎ တစ်လုံးတည်း
        if (firstCp === 0x1024 || firstCp === 0x102A ||
            (input.length === 1 && ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029 || firstCp === 0x103F || firstCp === 0x104E))) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                alphabet: true
            };
        }

        // ၌ / ၍ / ၏
        if (firstCp === 0x104C || firstCp === 0x104D || firstCp === 0x104F) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                punctuation: true,
                alphabet: true
            };
        }

        // ၊ / ။
        if (firstCp === 0x104A || firstCp === 0x104B) {
            return {
                matchedStr: input[0],
                normalizedStr: input[0],
                punctuation: true
            };
        }

        return null;
    }
}
