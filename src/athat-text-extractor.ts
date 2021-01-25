/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';

import { AthatTextFragment } from './athat-text-fragment';
import { TextNormalization } from './text-normalization';

const athatAndOptDiac = '(?:\u103A\u1037\u1038?|\u1037\u103A\u1038?|\u103A\u1038|\u103A)';

const maxPsblCUdAthat = '\u1000-\u1023\u1025-\u1027\u1029\u102A\u103F\u1040-\u1049\u104E';
const cUdAthat =
    '\u1000-\u1002\u1004\u1005\u1007\u1009-\u100C\u100F\u1010\u1012\u1014\u1015\u1017-\u101C\u101E\u101F\u1020\u1025';

const letterAndAthatMaxPsblRegExp = new RegExp(`^[${maxPsblCUdAthat}]\uFE00?${athatAndOptDiac}`);
const letterAndAthatRegExp = new RegExp(`^[${cUdAthat}]${athatAndOptDiac}`);

/**
 * Extract Athat (Virama) fragment.
 * @param extractInfo ExtractInfo object.
 * @returns Returns the AthatTextFragment object.
 */
export function extractAthatFragment(extractInfo: Readonly<ExtractInfo>): AthatTextFragment | null {
    if (extractInfo.trimedCurStrLength < 2) {
        return null;
    }

    const curStr = extractInfo.curStr;

    let m = letterAndAthatRegExp.exec(curStr);
    if (m == null) {
        m = letterAndAthatMaxPsblRegExp.exec(curStr);
    }

    if (m == null) {
        return null;
    }

    const matchedStr = m[0];
    const normalization: TextNormalization = {
        normalizedStr: '',
        normalizationActions: {}
    };

    if (matchedStr[0] === '\u1025') {
        normalization.normalizedStr = normalization.normalizedStr || matchedStr;
        normalization.normalizedStr = '\u1009' + normalization.normalizedStr.substring(1);
        normalization.normalizationActions.changeU1025ToU1009 = true;
    }

    if (matchedStr[1] === '\uFE00') {
        normalization.normalizedStr = normalization.normalizedStr || matchedStr;
        normalization.normalizedStr = normalization.normalizedStr.replace(/\uFE00/g, '');
        normalization.normalizationActions.removeDottedForm = true;
    }

    const fragment: AthatTextFragment = {
        category: 'athat',
        matchedStr
    };

    if (normalization != null) {
        fragment.normalization = normalization;
    }

    return fragment;
}
