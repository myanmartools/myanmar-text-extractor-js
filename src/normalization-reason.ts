export interface NormalizationReason {
    normalizePlusSign?: boolean;
    normalizeSpace?: boolean;
    removeSpace?: boolean;
    removeInvisibleSpace?: boolean;
    normalizeColon?: boolean;
    changeU101DToU1040?: boolean;
    changeU104EToU1044?: boolean;
}
