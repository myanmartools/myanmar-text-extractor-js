import { TextFragment } from './text-fragment';

export interface TextExtractor {
    extractNext(input: string, firstCp?: number, prevFragments?: TextFragment[]): TextFragment | null;
}
