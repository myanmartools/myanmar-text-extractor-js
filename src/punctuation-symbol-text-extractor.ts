/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractPunctuationSymbol(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    if (input.firstCp === 0x104a || input.firstCp === 0x104b) {
        return {
            category: 'punctuation-symbol',
            matchedStr: input.curStr[0],
            uniProbability: 0.5,
            zgProbability: 0.5
        };
    }

    return null;
}
