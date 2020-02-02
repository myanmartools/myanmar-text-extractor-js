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
     * True if digit or digit group.
     */
    digitOrDigitGroup?: boolean;
    /**
     * True if possible date.
     */
    possibleDate?: boolean;
    /**
     * True if possible time.
     */
    possibleTime?: boolean;
    /**
     * True if possible phone number.
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
     * Digit or digit group string.
     */
    digitOrDigitGroupStr?: string;
    /**
     * Digit or thousand separator.
     */
    digitSeparator?: string;
    /**
     * Detected ancient measure words.
     */
    ancientMeasureWords?: string[];
    /**
     * Date format string.
     */
    dateFormat?: string;
    /**
     * Date separator.
     */
    dateSeparator?: string;
    /**
     * The reason object for normalized string.
     */
    normalizeReason?: NormalizeReason;
}
