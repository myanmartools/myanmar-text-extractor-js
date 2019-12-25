export interface TextFragment {
    matchedString: string;
    normalizedString: string;
    uncombinableLetter?: boolean;
    error?: {
        invalidUnicodeOrder?: boolean;
        invalidStart?: boolean;
        spaceIncluded?: boolean;
    };
}
