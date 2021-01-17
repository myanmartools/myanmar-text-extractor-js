/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextFragment } from './text-fragment';

export interface KinsiTextFragment extends TextFragment {
    category: 'kinsi';
    kinsiSymbolOnly?: boolean;
    leftLetterRequired?: boolean;
    rightLetterRequired?: boolean;
}
