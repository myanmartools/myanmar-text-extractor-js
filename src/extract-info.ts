import { InvalidReason } from './invalid-reason';
import { NormalizeReason } from './normalize-reason';

export interface ExtractInfo {
    normalizedStr: string;
    spaceDetected?: boolean;
    normalizeReason?: NormalizeReason;
    invalidReason?: InvalidReason;
    numberStr?: string;
    numberSeparator?: string;
    dateSeparator?: string;
    dateFormat?: string;
}
