export interface NormalizeReason {
    normalizePlusSign?: boolean;
    normalizeSpace?: boolean;
    removeSpace?: boolean;
    normalizeColon?: boolean;
    swapU101DToU1040?: boolean;
    swapU104EToU1044?: boolean;
    normalizeDecimalPoint?: boolean;
    swapU1040ToU101D?: boolean;
    swapU1044ToU104E?: boolean;
}
