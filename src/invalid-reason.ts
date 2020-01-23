export interface InvalidReason {
    invalidUnicodeForm?: boolean;
    invalidDiacriticsStart?: boolean;
    invalidSpaceIncluded?: boolean;
    invalidU1038InsteadOfColon?: boolean;
    invalidCharInsteadOfColon?: boolean;
    invalidU101DInsteadOfU1040?: boolean;
    invalidU104EInsteadOfU1044?: boolean;
}
