/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

export interface TextNormalizationOptions {
    removeSpace?: boolean;
    removeDottedForm?: boolean;
}

export interface TextNormalizationActions {
    removeSpace?: boolean;
    removeDottedForm?: boolean;
    changeU1025ToU1009?: boolean;
}

export interface TextNormalization {
    normalizedStr: string;
    normalizationActions: TextNormalizationActions;
}
