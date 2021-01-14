/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { PunctuationSymbolTextFragment } from './punctuation-symbol-text-fragment';

import { p50 } from './probabilities';

/**
 * Extract punctuation symbol.
 * ၊ / ။
 * @param extractInfo ExtractInfo object.
 * @returns Returns the PunctuationSymbolTextFragment object.
 */
export function extractPunctuationSymbol(extractInfo: Readonly<ExtractInfo>): PunctuationSymbolTextFragment | null {
    const firstCp = extractInfo.firstCp;

    if (firstCp === 0x104a || firstCp === 0x104b) {
        return {
            category: 'punctuation-symbol',
            matchedStr: extractInfo.curStr[0],
            uniProbability: p50,
            zgProbability: p50
        };
    }

    return null;
}
