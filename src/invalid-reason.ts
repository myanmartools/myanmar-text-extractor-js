export interface InvalidReason {
    invalidUnicodeForm?: boolean;
    invalidDiacriticsStart?: boolean;
    invalidSpaceIncluded?: boolean;
    invalidU101DInsteadOfU1040?: boolean;
    invalidU104EInsteadOfU1044?: boolean;
}
