import { NormalizeReason } from './normalize-reason';

export interface ExtractInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    normalizeReason?: NormalizeReason;
    digitOrNumberGroup?: boolean;
    digitStr?: string;
    digitSeparator?: string;
    possibleDate?: boolean;
    dateSeparator?: string;
    dateFormat?: string;
    possibleTime?: boolean;
    possiblePhoneNumber?: boolean;
    phoneNumberStr?: string;
}
