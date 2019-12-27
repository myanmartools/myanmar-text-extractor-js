export interface TextFragment {
    matchedStr: string;
    suggestedStr?: string;

    numberFragment?: boolean;
    numberOrderList?: boolean;
    orderListDigitStr?: string;

    uncombinableLetter?: boolean;
    punctuationLetter?: boolean;
    syllableIncluded?: boolean;

    error?: {
        invalidUnicodeForm?: boolean;
        invalidDiacriticsStart?: boolean;
        spaceIncluded?: boolean;
        invalidU101DInsteadOfU1040?: boolean;
        invalidU104EInsteadOfU1044?: boolean;
    };
}
