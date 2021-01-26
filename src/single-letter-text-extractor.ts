/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractSingleLetter(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    const firstCp = input.firstCp;
    const curStr = input.curStr;
    const trimedCurStrLength = curStr.trimEnd().length;

    let matchedStr = '';
    let uniProbability = 0;
    let zgProbability = 0;

    if (
        firstCp === 0x1024 ||
        firstCp === 0x102a ||
        (trimedCurStrLength === 1 &&
            ((firstCp >= 0x1000 && firstCp <= 0x1021) ||
                firstCp === 0x1023 ||
                (firstCp >= 0x1025 && firstCp <= 0x1027) ||
                firstCp === 0x1029))
    ) {
        matchedStr = curStr[0];
        uniProbability = zgProbability = 0.5;
    } else if (trimedCurStrLength === 1 && firstCp === 0x103f) {
        matchedStr = curStr[0];
        uniProbability = 1;
        zgProbability = 0;
    } else if (trimedCurStrLength === 1 && firstCp === 0x104e) {
        matchedStr = curStr[0];
        if (input.prevMMWritingStyle === 'zg') {
            uniProbability = 0.3;
            zgProbability = 0.9;
        } else {
            uniProbability =
                input.prevMMWritingStyle === 'uni' &&
                input.prevMMWritingStyleProbability &&
                input.prevMMWritingStyleProbability > 0.5
                    ? 0.48
                    : 0.5;
            zgProbability = 0.5;
        }
    }

    if (!matchedStr.length) {
        return null;
    }

    return {
        category: 'letter',
        matchedStr,
        uniProbability,
        zgProbability
    };
}
