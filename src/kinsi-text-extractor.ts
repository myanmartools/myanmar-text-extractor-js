/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextExtractorInputInternal } from './text-extractor-input-internal';
import { TextFragment } from './text-fragment';

const ksStr = '\u1004\u103A\u1039';

export function extractKinsiFragment(input: Readonly<TextExtractorInputInternal>): TextFragment | null {
    if (input.curStrRightTrimedLength < 3 || !input.curStr.startsWith(ksStr)) {
        return null;
    }

    return {
        category: 'kinsi',
        matchedStr: ksStr
    };
}
