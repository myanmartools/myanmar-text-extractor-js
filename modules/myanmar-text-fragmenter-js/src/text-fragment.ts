export interface TextFragment {
    matchedString: string;
    normalizedString: string;
    error?: {
        invalidUnicodeForm?: boolean;
        invalidStart?: boolean;
        spaceIncluded?: boolean;
    };
}
