/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { TextNormalization } from './text-normalization';

export interface TextFragment {
    category:
        | 'punctuation-letter'
        | 'punctuation-symbol'
        | 'dotted-letter'
        | 'dotted-number'
        | 'letter'
        | 'number'
        | 'kinsi'
        | 'letter-and-athet';
    matchedStr: string;
    uniProbability: number;
    zgProbability: number;
    rightFragment?: TextFragment;
    normalization: TextNormalization;
}
