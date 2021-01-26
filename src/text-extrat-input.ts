/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

export interface TextExtractInput {
    totalTrimedInputLength: number;
    curStr: string;
    leftStr: string;
    prevMMWritingStyle: 'uni' | 'zg' | null;
    prevMMWritingStyleProbability: number;
}
