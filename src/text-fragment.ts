import { FragmentType } from './fragment-type';

export interface NumberFragment {
    numberStr?: string;

    measureWords?: string[];
}

export interface DateFragment {
    dateStr?: string;
}

export interface PhoneFragment {
    phoneStr?: string;
    plusSignIncluded?: boolean;
}

export interface TextFragment extends NumberFragment, DateFragment, PhoneFragment {
    matchedStr: string;
    normalizedStr: string;
    fragmentType: FragmentType;
    ancientWrittenForm?: boolean;
    spaceIncluded?: boolean;
    separatorIncluded?: boolean;
    error?: {
        invalidUnicodeForm?: boolean;
        invalidDiacriticsStart?: boolean;
        invalidSpaceIncluded?: boolean;
        invalidU101DInsteadOfU1040?: boolean;
        invalidU104EInsteadOfU1044?: boolean;
    };
}
