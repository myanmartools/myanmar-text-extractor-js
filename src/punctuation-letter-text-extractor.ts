/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { PunctuationLetterTextFragment } from './punctuation-letter-text-fragment';

import { p50 } from './probabilities';

/**
 * Extract punctuation letter.
 * ၌ / ၍ / ၏
 * @param extractInfo ExtractInfo object.
 * @returns Returns the PunctuationLetterTextFragment object.
 */
export function extractPunctuationLetter(extractInfo: Readonly<ExtractInfo>): PunctuationLetterTextFragment | null {
    const firstCp = extractInfo.firstCp;

    if (firstCp === 0x104c || firstCp === 0x104d || firstCp === 0x104f) {
        return {
            category: 'punctuation-letter',
            matchedStr: extractInfo.curStr[0],
            uniProbability: p50,
            zgProbability: p50
        };
    }

    return null;
}
