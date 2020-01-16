import { FragmentType } from './fragment-type';

export interface TextFragment {
    matchedStr: string;
    normalizedStr: string;
    fragmentType: FragmentType;
    spaceIncluded?: boolean;
    ancient?: boolean;

    numberStr?: string;
    numberSeparatorIncluded?: boolean;
    measureWords?: string[];

    possiblePhoneNumber?: boolean;
    plusSignIncluded?: boolean;

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
