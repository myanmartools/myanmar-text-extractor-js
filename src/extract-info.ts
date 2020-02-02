import { NormalizeReason } from './normalize-reason';

export interface ExtractInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    normalizeReason?: NormalizeReason;
    digitOrDigitGroupStr?: string;
    digitSeparator?: string;
    dateSeparator?: string;
    dateFormat?: string;
}
