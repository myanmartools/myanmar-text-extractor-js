/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { invisibleSpace, visibleSpace } from './shared-char-patterns/space';
import { TextNormalizationOptions, TextNormalizationResult } from './text-normalization';

const spaceRegExp = new RegExp(`[${visibleSpace}${invisibleSpace}]`);

export function normalizeText(input: string, options: TextNormalizationOptions): TextNormalizationResult | null {
    let normalized = false;

    const normalizationResult: TextNormalizationResult = {
        normalizedStr: '',
        normalizationActions: {}
    };

    for (const c of input) {
        if (options.removeDottedForm && c === '\uFE00') {
            normalizationResult.normalizationActions.removeDottedForm = true;
            normalized = true;
            continue;
        }

        if (options.removeSpace && (c === ' ' || spaceRegExp.test(c))) {
            normalizationResult.normalizationActions.removeSpace = true;
            normalized = true;
            continue;
        }

        normalizationResult.normalizedStr += c;
    }

    if (!normalized || !normalizationResult.normalizedStr.length) {
        return null;
    }

    return normalizationResult;
}
