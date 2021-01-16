/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextFragment } from './text-fragment';

export interface SingleDottedNumberTextFragment extends TextFragment {
    category: 'single-dotted-number';
    decimalStr: string;
}
