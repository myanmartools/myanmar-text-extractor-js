import { TextFragmentErrorType } from './text-fragment-error-type';

export interface TextFragment {
    matchedString: string;
    standaloneLetter?: boolean;
    errors?: TextFragmentErrorType[];
    spaceIncluded?: boolean;
}
