/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { isInMyanmarUnicodeBlock } from './helpers/is-in-myanmar-unicode-block';
import { TextExtractorInput } from './text-extractor-input';
import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

import { extractPunctuationLetter } from './punctuation-letter-text-extractor';
import { extractPunctuationSymbol } from './punctuation-symbol-text-extractor';

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

        const inputInternal: TextExtractorInputInternal = {
            ...input,
            firstCp
        };

        let fragment = extractPunctuationLetter(inputInternal);
        if (fragment != null) {
            return fragment;
        }

        fragment = extractPunctuationSymbol(inputInternal);
        if (fragment != null) {
            return fragment;
        }

        return null;
    }
}
