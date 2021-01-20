/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { DottedNumberTextFragment } from './dotted-number-text-fragment';

import { p40, p60 } from './probabilities';

/**
 * Extract single dotted number.
 * [၀-၉]
 * @param extractInfo ExtractInfo object.
 * @returns Returns the DottedNumberTextFragment object.
 */
export function extractSingleDottedNumber(extractInfo: Readonly<ExtractInfo>): DottedNumberTextFragment | null {
    if (extractInfo.trimedCurStrLength < 2 || extractInfo.curStr[1] !== '\uFE00') {
        return null;
    }

    const firstCp = extractInfo.firstCp;

    if (extractInfo.trimedCurStrLength === 2 && firstCp >= 0x1040 && firstCp <= 0x1049) {
        const matchedStr = extractInfo.curStr.substring(0, 2);

        return {
            category: 'dotted-number',
            decimalStr: matchedStr[0],
            matchedStr,
            uniProbability: p60,
            zgProbability: p40
        };
    }

    return null;
}
