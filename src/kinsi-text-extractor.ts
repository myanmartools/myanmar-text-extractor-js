/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';

import { KinsiTextFragment } from './kinsi-text-fragment';

const ksStr = '\u1004\u103A\u1039';

/**
 * Extract kinsi fragment.
 * @param extractInfo ExtractInfo object.
 * @returns Returns the KinsiTextFragment object.
 */
export function extractKinsiFragment(extractInfo: Readonly<ExtractInfo>): KinsiTextFragment | null {
    if (extractInfo.trimedCurStrLength < 3 || !extractInfo.curStr.startsWith(ksStr)) {
        return null;
    }

    return {
        category: 'kinsi',
        matchedStr: ksStr
    };
}
