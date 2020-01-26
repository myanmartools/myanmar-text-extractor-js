import { NormalizeReason } from './normalize-reason';

export interface ExtractInfo {
    normalizedStr: string;
    spaceIncluded?: boolean;
    normalizeReason?: NormalizeReason;
    numberStr?: string;
    numberSeparator?: string;
    dateSeparator?: string;
    dateFormat?: string;
}
