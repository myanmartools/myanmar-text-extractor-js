/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { SingleLetterPunctuationTextFragment, SingleLetterTextFragment } from './single-letter-text-fragment';

import { p0, p100, p30, p45, p48, p50 } from './probabilities';

/**
 * Extract single letter.
 * ဤ / ဪ နှင့် [က-အ] / ဣ / ဥ / ဦ / ဧ / ဩ / uni: ဿ / uni: ၎ (သို့) zg: ၎င်း
 * @param extractInfo ExtractInfo object.
 * @returns Returns the SingleLetterTextFragment object.
 */
export function extractSingleLetter(extractInfo: Readonly<ExtractInfo>): SingleLetterTextFragment | null {
    const firstCp = extractInfo.firstCp;
    const totalTrimedInputLength = extractInfo.totalTrimedInputLength;
    const trimedCurStrLength = extractInfo.trimedCurStrLength;

    let matchedStr = '';
    let uniProbability = 0;
    let zgProbability = 0;

    if (
        firstCp === 0x1024 ||
        firstCp === 0x102a ||
        ((totalTrimedInputLength === 1 || trimedCurStrLength === 1) &&
            ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 ||
                (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029))
    ) {
        matchedStr = extractInfo.curStr[0];
        uniProbability = zgProbability = p50;
    } else if ((totalTrimedInputLength === 1 || trimedCurStrLength === 1) && firstCp === 0x103f) {
        // uni only: ဿ
        matchedStr = extractInfo.curStr[0];
        uniProbability = p100;
        zgProbability = p0;
    } else if ((totalTrimedInputLength === 1 || trimedCurStrLength === 1) && firstCp === 0x104e) {
        // uni: ၎ (သို့) zg: ၎င်း
        matchedStr = extractInfo.curStr[0];
        if (extractInfo.lastKnownWritingStyle === 'zg') {
            uniProbability = p30;
            zgProbability = p100;
        } else {
            uniProbability =
                extractInfo.lastKnownWritingStyle === 'uni' &&
                extractInfo.lastKnownWritingStyleProbability &&
                extractInfo.lastKnownWritingStyleProbability > p50
                    ? p48
                    : p45;
            zgProbability = p50;
        }
    }

    if (!matchedStr.length) {
        return null;
    }

    return {
        category: 'single-letter',
        matchedStr,
        uniProbability,
        zgProbability
    };
}

/**
 * Extract punctuation letter.
 * ၌ / ၍ / ၏
 * @param extractInfo ExtractInfo object.
 * @returns Returns the SingleLetterPunctuationTextFragment object.
 */
export function extractSingleLetterPunctuation(
    extractInfo: Readonly<ExtractInfo>
): SingleLetterPunctuationTextFragment | null {
    const firstCp = extractInfo.firstCp;

    if (firstCp === 0x104c || firstCp === 0x104d || firstCp === 0x104f) {
        return {
            category: 'single-letter-punctuation',
            matchedStr: extractInfo.curStr[0],
            uniProbability: p50,
            zgProbability: p50
        };
    }

    return null;
}
