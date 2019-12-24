import { MyanmarTextFragmenterOptions } from './myanmar-text-fragmenter-options';
import { TextFragment } from './text-fragment';

export class MyanmarTextFragmenter {
    private readonly _options: MyanmarTextFragmenterOptions = {};

    constructor(options?: MyanmarTextFragmenterOptions) {
        this._options = { ...options };
    }

    getNextFragment(input: string, options?: MyanmarTextFragmenterOptions): TextFragment | null {
        const firstC = input[0];
        // ဤ / ဪ / ၌ / ၊ / ။ / ၍ / ၏
        if (firstC === '\u1024' || firstC === '\u102A' ||
            firstC === '\u104A' || firstC === '\u104B' ||
            firstC === '\u104C' || firstC === '\u104D' || firstC === '\u104F') {
            return {
                matchedString: firstC,
                standaloneLetter: true
            };
        }

        return null;
    }
}
