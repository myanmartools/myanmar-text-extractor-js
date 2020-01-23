import { FragmentType } from './fragment-type';
import { InvalidReason } from './invalid-reason';
import { NormalizeReason } from './normalize-reason';

/**
 * Text fragment model for fragmented result.
 */
export interface TextFragment {
    /**
     * Matched fragmented string.
     */
    matchedStr: string;
    /**
     * Normalized matched fragmented string.
     */
    normalizedStr: string;
    /**
     * Fragment type.
     */
    fragmentType: FragmentType;
    /**
     * True if ancient written form.
     */
    ancientWrittenForm?: boolean;
    /**
     * True if space detected.
     */
    spaceDetected?: boolean;
    /**
     * Digit string for number fragment type.
     */
    numberStr?: string;
    /**
     * Detected measure words for ancient number fragment type.
     */
    ancientMeasureWords?: string[];
    dateFormat?: string;
    dateSeparator?: string;
    /**
     * The reason object for normalized string.
     */
    normalizeReason?: NormalizeReason;
    /**
     * The reason object for invalid fragmented string result.
     */
    invalidReason?: InvalidReason;
}
