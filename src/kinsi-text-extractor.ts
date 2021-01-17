/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { ExtractInfo } from './extract-info';
import { KinsiTextFragment } from './kinsi-text-fragment';

import { p0, p10, p100, p20, p30, p40, p48, p50, p60, p70, p90 } from './probabilities';

const ksStr = '\u1004\u103A\u1039';
const cOrginalUnderKs = '\u1000-\u1003';
const cFakeUnderKs = '\u1018\u101C\u101E';

const acAfCUnderKsG =
    '(?:\u103B\u102E|\u103B\u102C|\u103C\u1036|\u103B\u1031|\u1031\u102C|\u102B|\u102C|\u102F|\u1031\u1037)';

const ksStrictRegExp = new RegExp(`^[${cOrginalUnderKs}${cFakeUnderKs}]${acAfCUnderKsG}?`);

const dictKinsiParts = [
    ['\u101E\u102D', '\u1002\u102F'],
    ['\u1001\u103C', '\u101E\u1031\u1037'],
    ['\u101E\u102D', '\u1002'],
    ['\u101E', '\u1000'],
    ['\u1010', '\u1001'],
    ['\u101D', '\u1000'],
    ['\u1012', '\u1002'],
    ['\u1014', '\u1002'],
    ['\u1019', '\u1002'],
    ['\u101E', '\u1002'],
    ['\u101E', '\u101E'],
    ['\u101F', '\u101E'],
    ['\u1021', '\u1002'],
    ['\u101C', '\u1000\u102C'],
    ['\u1021', '\u1002\u102F'],
    ['\u1021', '\u1002\u102B'],
    ['\u1014', '\u101C\u102C'],
    ['\u1014', '\u101E\u102C'],
    ['\u1021', '\u1000\u103B\u102E'],
    ['\u101E', '\u1001\u103B\u102C'],
    ['\u1005', '\u1000\u103C\u1036'],
    ['\u101E', '\u1001\u103B\u1031'],
    ['\u101E', '\u1018\u1031\u102C'],
    ['\u101E', '\u1001\u1019\u103A\u1038']
    // ['\u101E', '\u1001\u103B\u102D\u102F\u1004\u103A\u1038']
];

/**
 * Extract kinsi fragment.
 * @param extractInfo ExtractInfo object.
 * @returns Returns the KinsiTextFragment object.
 */
export function extracKinsiFragment(extractInfo: Readonly<ExtractInfo>): KinsiTextFragment | null {
    if (extractInfo.trimedCurStrLength < 3 || !extractInfo.curStr.startsWith(ksStr)) {
        return null;
    }

    if (extractInfo.totalTrimedInputLength === 3) {
        return {
            category: 'kinsi',
            kinsiSymbolOnly: true,
            leftLetterRequired: true,
            rightLetterRequired: true,
            matchedStr: extractInfo.curStr.substring(0, 3),
            uniProbability: p60,
            zgProbability: p30
        };
    }

    if (extractInfo.trimedCurStrLength === 3) {
        return {
            category: 'kinsi',
            leftLetterRequired: extractInfo.lastKnownWritingStyle === 'uni' ? false : true,
            rightLetterRequired: true,
            matchedStr: extractInfo.curStr.substring(0, 3),
            uniProbability: extractInfo.lastKnownWritingStyle !== 'zg' ? p60 : p48,
            zgProbability:
                extractInfo.lastKnownWritingStyle === 'zg' && extractInfo.lastKnownWritingStyleProbability > p50
                    ? p40
                    : p30
        };
    }

    const testStr = extractInfo.curStr.substring(3);

    // Exact match - သ + ချိုင်း
    if (
        testStr.length >= 7 &&
        extractInfo.fragments.length > 0 &&
        extractInfo.fragments[extractInfo.fragments.length - 1].matchedStr === '\u101E' &&
        testStr[0] === '\u1001' &&
        testStr[testStr.length - 1] === '\u1038' &&
        testStr.startsWith('\u1001\u103B\u102D\u102F\u1004\u103A\u1038')
    ) {
        return {
            category: 'kinsi',
            matchedStr: `${ksStr}${testStr.substring(0, 7)}`,
            uniProbability: p100,
            zgProbability: p0
        };
    }

    const m = ksStrictRegExp.exec(testStr);

    if (m !== null) {
        const mStr = m[0];
        let uniProbability: number;
        let zgProbability: number;

        if (extractInfo.lastKnownWritingStyle === 'uni') {
            const leftFragmentStr =
                extractInfo.fragments.length > 0
                    ? extractInfo.fragments[extractInfo.fragments.length - 1].matchedStr
                    : '';
            const foundInDict = checkInDictKinsiParts(leftFragmentStr, mStr);
            uniProbability = foundInDict ? p100 : p90;
            zgProbability = foundInDict ? p0 : p10;
        } else {
            uniProbability = extractInfo.lastKnownWritingStyle !== 'zg' ? p70 : p50;
            zgProbability =
                extractInfo.lastKnownWritingStyle === 'zg' && extractInfo.lastKnownWritingStyleProbability > p50
                    ? p30
                    : p20;
        }

        return {
            category: 'kinsi',
            leftLetterRequired: extractInfo.lastKnownWritingStyle === 'uni' ? false : true,
            matchedStr: `${ksStr}${mStr}`,
            uniProbability,
            zgProbability
        };
    }

    return null;
}

function checkInDictKinsiParts(leftPartStr: string, rightPartStr: string): boolean {
    let foundInDict = false;

    for (const pair of dictKinsiParts) {
        const lp = pair[0];
        const rp = pair[1];
        if (
            leftPartStr.length === lp.length &&
            rightPartStr.length === rp.length &&
            leftPartStr.endsWith(lp) &&
            rightPartStr.startsWith(rp)
        ) {
            foundInDict = true;
            break;
        }
    }

    return foundInDict;
}
