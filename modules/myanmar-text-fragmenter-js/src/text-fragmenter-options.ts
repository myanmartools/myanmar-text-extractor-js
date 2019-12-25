export interface TextFragmenterOptions {
    /**
     * Do not collect if there are spaces between consonant conbination.
     */
    noSpaceBetween?: boolean;
    /**
     * Max numbers of space characters to be allowed.
     */
    maxSpaceBetween?: number;
    /**
     * Do not collect if the input starts with diacritics letters [\u102B-\u103E].
     */
    noInvalidStart?: boolean;
}
