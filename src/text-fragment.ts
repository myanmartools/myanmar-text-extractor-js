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
     * True if a punctuation symbol. ပုဒ်ဖြတ်၊ ပုဒ်ရပ် အက္ခရာ (သို့) သင်္ကေတ။
     */
    punctuation?: boolean;
    /**
     * True if digit or number group fragment.
     */
    number?: boolean;
    /**
     * True if alphabet fragment. အက္ခရာအစိတ်အပိုင်း။
     */
    alphabet?: boolean;
    /**
     * True if possible date fragment.
     */
    possibleDate?: boolean;
    /**
     * True if possible time fragment.
     */
    possibleTime?: boolean;
    /**
     * True if possible phone number fragment.
     */
    possiblePhoneNumber?: boolean;
    /**
     * True if ancient written form.
     */
    ancientWrittenForm?: boolean;
    /**
     * True if space detected.
     */
    spaceIncluded?: boolean;
    /**
     * Digit string for number fragment type.
     */
    numberStr?: string;
    /**
     * Noumber / thousand separator for number fragment type.
     */
    numberSeparator?: string;
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
}
