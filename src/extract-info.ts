import { NormalizeReason } from './normalize-reason';

export interface ExtractInfo {
    matchedStr: string;
    normalizedStr: string;
    spaceIncluded?: boolean;
    separatorIncluded?: boolean;
    normalizeReason?: NormalizeReason;
    decimal?: boolean;
    decimalStr?: string;
    decimalSeparator?: string;
    possibleDate?: boolean;
    dateSeparator?: string;
    dateFormat?: string;
    possibleTime?: boolean;
    possiblePhoneNumber?: boolean;
    phoneNumberStr?: string;
}
