import { TextFragment } from './text-fragment';

export interface TextFragmenter {
    readonly priority: number;
    getNextFragment(input: string, firstCp: number): TextFragment | null;
}
