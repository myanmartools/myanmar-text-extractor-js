/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { invisibleSpace, visibleSpace } from './shared-char-patterns/space';
import { TextNormalization, TextNormalizationActions, TextNormalizationOptions } from './text-normalization';

const spaceRegExp = new RegExp(`[${visibleSpace}${invisibleSpace}]`);

export function normalizeText(input: string, options: TextNormalizationOptions): TextNormalization | null {
    let normalized = false;
    let normalizedStr = '';
    const normalizationActions: TextNormalizationActions = {};

    for (const c of input) {
        if (options.removeDottedForm && c === '\uFE00') {
            normalizationActions.removeDottedForm = true;
            normalized = true;
            continue;
        }

        if (options.removeSpace && (c === ' ' || spaceRegExp.test(c))) {
            normalizationActions.removeSpace = true;
            normalized = true;
            continue;
        }

        normalizedStr += c;
    }

    if (!normalized || !normalizedStr.length) {
        return null;
    }

    return {
        normalizedStr,
        normalizationActions
    };
}
