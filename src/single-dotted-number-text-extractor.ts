/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractSingleDottedNumber(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    if (
        input.curStrRightTrimedLength === 2 &&
        input.curStr[1] === '\uFE00' &&
        input.firstCp >= 0x1040 &&
        input.firstCp <= 0x1049
    ) {
        const matchedStr = input.curStr.substring(0, 2);

        return {
            category: 'dotted-number',
            matchedStr,
            decimalStr: matchedStr[0],
            uniProbability: 0.6,
            zgProbability: 0.4
        };
    }

    return null;
}
