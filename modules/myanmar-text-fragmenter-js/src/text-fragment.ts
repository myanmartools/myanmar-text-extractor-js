export interface TextFragment {
    matchedString: string;
    normalizedString: string;
    error?: {
        invalidUnicodeOrder?: boolean;
        invalidStart?: boolean;
        spaceIncluded?: boolean;
    };
}
