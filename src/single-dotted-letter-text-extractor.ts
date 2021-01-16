/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { SingleDottedLetterTextFragment } from './single-dotted-letter-text-fragment';

import { p0, p100, p40, p45, p48, p50, p60 } from './probabilities';

/**
 * Extract single dotted letter.
 * ဤ︀ / ဪ︀ / [က︀-အ︀] / ဣ︀ / ဥ︀ / ဦ︀ / ဧ︀ / ဩ︀ (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * uni: ဿ︀ (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * uni: ၎︀ (သို့) zg: ၎︀င်း (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * @param extractInfo ExtractInfo object.
 * @returns Returns the SingleDottedLetterTextFragment object.
 */
export function extractSingleDottedLetter(extractInfo: Readonly<ExtractInfo>): SingleDottedLetterTextFragment | null {
    if (extractInfo.trimedCurStrLength < 2 || extractInfo.curStr[1] !== '\uFE00') {
        return null;
    }

    const firstCp = extractInfo.firstCp;
    const trimedCurStrLength = extractInfo.trimedCurStrLength;

    let matchedStr = '';
    let uniProbability = 0;
    let zgProbability = 0;

    if (
        firstCp === 0x1024 ||
        firstCp === 0x102a ||
        (trimedCurStrLength === 2 &&
            ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 ||
                (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029))
    ) {
        matchedStr = extractInfo.curStr.substring(0, 2);
        if (extractInfo.lastKnownWritingStyle === 'zg') {
            uniProbability = p50;
            zgProbability = extractInfo.lastKnownWritingStyleProbability > p50 ? p50 : p48;
        } else {
            uniProbability = p60;
            zgProbability = p40;
        }
    } else if (trimedCurStrLength === 2 && firstCp === 0x103f) {
        matchedStr = extractInfo.curStr.substring(0, 2);
        uniProbability = p100;
        zgProbability = p0;
    } else if (trimedCurStrLength === 2 && firstCp === 0x104e) {
        matchedStr = extractInfo.curStr.substring(0, 2);
        if (extractInfo.lastKnownWritingStyle === 'zg') {
            uniProbability = p40;
            zgProbability = p60;
        } else {
            uniProbability =
                extractInfo.lastKnownWritingStyle === 'uni' && extractInfo.lastKnownWritingStyleProbability > p50
                    ? p48
                    : p45;
            zgProbability = p50;
        }
    }

    if (!matchedStr.length) {
        return null;
    }

    return {
        category: 'single-dotted-letter',
        matchedStr,
        uniProbability,
        zgProbability
    };
}
