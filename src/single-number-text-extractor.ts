/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractSingleNumber(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    if (input.curStrRightTrimedLength === 1 && input.firstCp >= 0x1040 && input.firstCp <= 0x1049) {
        const matchedStr = input.curStr[0];

        return {
            category: 'number',
            matchedStr,
            decimalStr: matchedStr,
            uniProbability: 0.5,
            zgProbability: 0.5
        };
    }

    return null;
}
