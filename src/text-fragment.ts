import { FragmentType } from './fragment-type';
import { InvalidReason } from './invalid-reason';
import { NormalizationReason } from './normalization-reason';

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
     * True if space included.
     */
    spaceIncluded?: boolean;
    /**
     * True if separator included.
     */
    separatorIncluded?: boolean;
    /**
     * Digit string for number fragment type.
     */
    numberStr?: string;
    measureWords?: string[];
    /**
     * The reason object for normalized string.
     */
    normalizationReason?: NormalizationReason;
    /**
     * The reason object for invalid fragmented string result.
     */
    invalidReason?: InvalidReason;
}
