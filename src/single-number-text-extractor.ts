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
    const firstCp = input.firstCp;
    const curStr = input.curStr;
    const trimedCurStrLength = curStr.trimEnd().length;

    if (firstCp >= 0x1040 && firstCp <= 0x1049 && trimedCurStrLength === 1) {
        const matchedStr = curStr[0];

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
