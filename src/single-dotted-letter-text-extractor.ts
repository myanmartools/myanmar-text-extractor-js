/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

export function extractSingleDottedLetter(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    if (input.curStrRightTrimedLength < 2 || input.curStr[1] !== '\uFE00') {
        return null;
    }

    let matchedStr = '';
    let uniProbability = 0;
    let zgProbability = 0;

    if (
        input.firstCp === 0x1024 ||
        input.firstCp === 0x102a ||
        (input.curStrRightTrimedLength === 2 &&
            ((input.firstCp >= 0x1000 && input.firstCp <= 0x1021) ||
                input.firstCp === 0x1023 ||
                (input.firstCp >= 0x1025 && input.firstCp <= 0x1027) ||
                input.firstCp === 0x1029))
    ) {
        matchedStr = input.curStr.substring(0, 2);
        if (input.prevMMWritingStyle === 'zg') {
            uniProbability = 0.5;
            zgProbability = input.prevMMWritingStyleProbability > 0.5 ? 0.5 : 0.4;
        } else {
            uniProbability = 0.6;
            zgProbability = 0.4;
        }
    } else if (input.curStrRightTrimedLength === 2 && input.firstCp === 0x103f) {
        matchedStr = input.curStr.substring(0, 2);
        uniProbability = 1;
        zgProbability = 0;
    } else if (input.curStrRightTrimedLength === 2 && input.firstCp === 0x104e) {
        matchedStr = input.curStr.substring(0, 2);
        if (input.prevMMWritingStyle === 'zg') {
            uniProbability = 0.4;
            zgProbability = 0.6;
        } else {
            uniProbability =
                input.prevMMWritingStyle === 'uni' && input.prevMMWritingStyleProbability > 0.5 ? 0.48 : 0.45;
            zgProbability = 0.5;
        }
    }

    if (!matchedStr.length) {
        return null;
    }

    return {
        category: 'dotted-letter',
        matchedStr,
        uniProbability,
        zgProbability
    };
}
