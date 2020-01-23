import { TextFragment } from './text-fragment';

export interface TextExtractor {
    extractNext(input: string, prevFragments?: TextFragment[]): TextFragment | null;
}
