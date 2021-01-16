/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { SingleLetterTextFragment } from './single-letter-text-fragment';

import { p0, p100, p30, p45, p48, p50, p90 } from './probabilities';

/**
 * Extract single letter.
 * ဤ / ဪ / [က-အ] / ဣ / ဥ / ဦ / ဧ / ဩ (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * uni: ဿ (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * uni: ၎ (သို့) zg: ၎င်း (တစ်လုံးတည်းဖြစ်ခဲ့လျှင်)
 * @param extractInfo ExtractInfo object.
 * @returns Returns the SingleLetterTextFragment object.
 */
export function extractSingleLetter(extractInfo: Readonly<ExtractInfo>): SingleLetterTextFragment | null {
    const firstCp = extractInfo.firstCp;
    const trimedCurStrLength = extractInfo.trimedCurStrLength;

    let matchedStr = '';
    let uniProbability = 0;
    let zgProbability = 0;

    if (
        firstCp === 0x1024 ||
        firstCp === 0x102a ||
        (trimedCurStrLength === 1 &&
            ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 ||
                (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029))
    ) {
        matchedStr = extractInfo.curStr[0];
        uniProbability = zgProbability = p50;
    } else if (trimedCurStrLength === 1 && firstCp === 0x103f) {
        matchedStr = extractInfo.curStr[0];
        uniProbability = p100;
        zgProbability = p0;
    } else if (trimedCurStrLength === 1 && firstCp === 0x104e) {
        matchedStr = extractInfo.curStr[0];
        if (extractInfo.lastKnownWritingStyle === 'zg') {
            uniProbability = p30;
            zgProbability = p90;
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
