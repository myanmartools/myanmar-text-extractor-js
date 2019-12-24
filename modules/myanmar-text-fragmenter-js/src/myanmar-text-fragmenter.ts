import { MyanmarTextFragmenterOptions } from './myanmar-text-fragmenter-options';
import { TextFragment } from './text-fragment';

export class MyanmarTextFragmenter {
    private readonly _options: MyanmarTextFragmenterOptions = {};

    constructor(options?: MyanmarTextFragmenterOptions) {
        this._options = { ...options };
    }

    getNextFragment(input: string, options?: MyanmarTextFragmenterOptions): TextFragment | null {
        return null;
    }
}
