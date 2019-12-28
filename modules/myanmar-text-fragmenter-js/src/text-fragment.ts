export interface TextFragment {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    ancient?: boolean;

    numberFragment?: boolean;
    numberOrderList?: boolean;
    orderListDigitStr?: string;

    uncombinableLetter?: boolean;
    punctuationLetter?: boolean;
    syllableIncluded?: boolean;

    error?: {
        invalidUnicodeForm?: boolean;
        invalidDiacriticsStart?: boolean;
        invalidSpaceIncluded?: boolean;
        invalidU101DInsteadOfU1040?: boolean;
        invalidU104EInsteadOfU1044?: boolean;
    };
}
