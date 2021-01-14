/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { SingleNumberTextFragment } from './single-number-text-fragment';

import { p50 } from './probabilities';

/**
 * Extract single number.
 * [၀-၉]
 * @param extractInfo ExtractInfo object.
 * @returns Returns the SingleNumberTextFragment object.
 */
export function extractSingleNumber(extractInfo: Readonly<ExtractInfo>): SingleNumberTextFragment | null {
    const firstCp = extractInfo.firstCp;
    const totalTrimedInputLength = extractInfo.totalTrimedInputLength;
    const trimedCurStrLength = extractInfo.trimedCurStrLength;

    if ((totalTrimedInputLength === 1 || trimedCurStrLength === 1) && firstCp >= 0x1040 && firstCp <= 0x1049) {
        const matchedStr = extractInfo.curStr[0];

        return {
            category: 'single-number',
            decimalStr: matchedStr,
            matchedStr,
            uniProbability: p50,
            zgProbability: p50
        };
    }

    return null;
}
