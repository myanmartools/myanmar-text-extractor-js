export interface TextFragmenterOptions {
    /**
     * Do not collect if there are spaces between consonant conbination.
     */
    noSpaceBetween?: boolean;
    /**
     * Do not collect if the input starts with diacritics letters [\u102B-\u103E].
     */
    noInvalidStart?: boolean;
}
