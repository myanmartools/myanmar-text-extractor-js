/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { NumberTextFragment } from './number-text-fragment';

import { p50 } from './probabilities';

/**
 * Extract single number.
 * [၀-၉]
 * @param extractInfo ExtractInfo object.
 * @returns Returns the NumberTextFragment object.
 */
export function extractSingleNumber(extractInfo: Readonly<ExtractInfo>): NumberTextFragment | null {
    const firstCp = extractInfo.firstCp;
    const trimedCurStrLength = extractInfo.trimedCurStrLength;

    if (trimedCurStrLength === 1 && firstCp >= 0x1040 && firstCp <= 0x1049) {
        const matchedStr = extractInfo.curStr[0];

        return {
            category: 'number',
            decimalStr: matchedStr,
            matchedStr,
            uniProbability: p50,
            zgProbability: p50
        };
    }

    return null;
}
