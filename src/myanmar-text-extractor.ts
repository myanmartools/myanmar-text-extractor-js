/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { isInMyanmarUnicodeBlock } from './helpers/is-in-myanmar-unicode-block';
import { TextExtractorInput } from './text-extractor-input';
import { TextFragment } from './text-fragment';

export class MyanmarTextExtractor {
    extractNext(input: Readonly<TextExtractorInput>): TextFragment | null {
        const curStr = input.curStr;
        const firstCp = curStr.codePointAt(0);
        if (firstCp == null) {
            return null;
        }

        if (!isInMyanmarUnicodeBlock(firstCp)) {
            return null;
        }

        return null;
    }
}
