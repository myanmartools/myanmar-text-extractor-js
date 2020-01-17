import { FragmentType } from './fragment-type';

export interface TextFragment {
    matchedStr: string;
    normalizedStr: string;
    fragmentType: FragmentType;
    ancientWrittenForm?: boolean;
    spaceIncluded?: boolean;
    separatorIncluded?: boolean;
    numberStr?: string;
    measureWords?: string[];
    error?: {
        invalidUnicodeForm?: boolean;
        invalidDiacriticsStart?: boolean;
        invalidSpaceIncluded?: boolean;
        invalidU101DInsteadOfU1040?: boolean;
        invalidU104EInsteadOfU1044?: boolean;
    };
}
