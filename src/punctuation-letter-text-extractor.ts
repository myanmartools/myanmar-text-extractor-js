/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractPunctuationLetter(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    const curStr = input.curStr;
    const firstCp = input.firstCp;

    if (firstCp === 0x104c || firstCp === 0x104d || firstCp === 0x104f) {
        return {
            category: 'punctuation-letter',
            matchedStr: curStr[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };
    }

    return null;
}
