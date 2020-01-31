import { NormalizeReason } from './normalize-reason';

/**
 * The fragment type enum.
 */
export enum FragmentType {
    Symbol = 0,
    Letter = 1,
    Number = 2
}

/**
 * Text fragment model for fragmented result.
 */
export interface TextFragment {
    /**
     * Fragment type enum.
     */
    fragmentType: FragmentType;
    /**
     * Matched string.
     */
    matchedStr: string;
    /**
     * Normalized matched string.
     */
    normalizedStr: string;
    /**
     * True if a punctuation symbol. ပုဒ်ဖြတ်၊ ပုဒ်ရပ် အက္ခရာ (သို့) သင်္ကေတ။
     */
    punctuation?: boolean;
    /**
     * True if a diacritic symbol.
     */
    diacritic?: boolean;


    /**
     * True if digit or number group fragment.
     */
    numberGroup?: boolean;
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
