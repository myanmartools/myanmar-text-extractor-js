import { FragmentType } from './fragment-type';

export interface TextFragment {
    matchedStr: string;
    normalizedStr: string;
    fragmentType: FragmentType;

    spaceIncluded?: boolean;

    ancient?: boolean;

    digitStr?: string;
    measureWords?: string[];
    digitSeparatorIncluded?: boolean;
    possiblePhoneNumber?: boolean;

    uncombinableLetter?: boolean;
    syllableIncluded?: boolean;

    error?: {
        invalidUnicodeForm?: boolean;
        invalidDiacriticsStart?: boolean;
        invalidSpaceIncluded?: boolean;
        invalidU101DInsteadOfU1040?: boolean;
        invalidU104EInsteadOfU1044?: boolean;
    };
}
