import { extracKinsiFragment } from '../../src/kinsi-text-extractor';
import { KinsiTextFragment } from '../../src/kinsi-text-fragment';

describe('extracKinsiFragment', () => {
    it(String.raw`should return 'KinsiTextFragment' when input 'င်္'`, () => {
        const input = 'င်္';
        const curStr = input;

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: curStr,
            kinsiSymbolOnly: true,
            leftLetterRequired: true,
            rightLetterRequired: true,
            uniProbability: 0.6,
            zgProbability: 0.3
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ '`, () => {
        const input = 'င်္ ';
        const curStr = input;

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: null,
            lastKnownWritingStyleProbability: 0,
            fragments: [],
            leftStr: ''
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            kinsiSymbolOnly: true,
            leftLetterRequired: true,
            rightLetterRequired: true,
            uniProbability: 0.6,
            zgProbability: 0.3
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'ကင်္'`, () => {
        const input = 'ကင်္';
        const curStr = 'င်္';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.55,
            fragments: [
                {
                    category: 'letter',
                    matchedStr: 'က',
                    uniProbability: 0.55,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'က'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: curStr,
            leftLetterRequired: false,
            rightLetterRequired: true,
            uniProbability: 0.6,
            zgProbability: 0.3
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'ကင်္', lastKnownWritingStyle: 'zg'`, () => {
        const input = 'ကင်္';
        const curStr = 'င်္';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: 'zg',
            lastKnownWritingStyleProbability: 0.55,
            fragments: [
                {
                    category: 'letter',
                    matchedStr: 'က',
                    uniProbability: 0.5,
                    zgProbability: 0.55
                }
            ],
            leftStr: 'က'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: curStr,
            leftLetterRequired: true,
            rightLetterRequired: true,
            uniProbability: 0.48,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'သင်္ချိုင်း'`, () => {
        const input = 'သင်္ချိုင်း';
        const curStr = 'င်္ချိုင်း';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            uniProbability: 1,
            zgProbability: 0,
            rightFragment: {
                category: 'letter-and-athet',
                matchedStr: 'ချိုင်း',
                uniProbability: 1,
                zgProbability: 0
            }
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'သင်္ချိုင်းက'`, () => {
        const input = 'သင်္ချိုင်းက';
        const curStr = 'င်္ချိုင်းက';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            uniProbability: 1,
            zgProbability: 0,
            rightFragment: {
                category: 'letter-and-athet',
                matchedStr: 'ချိုင်း',
                uniProbability: 1,
                zgProbability: 0
            }
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'သင်္ချို  င်း' (max match - spaces between)`, () => {
        const input = 'သင်္ချို  င်း';
        const curStr = 'င်္ချို  င်း';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr,
            firstCp: curStr.codePointAt(0) as number,
            trimedCurStrLength: curStr.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ',
            maxMatch: true
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            uniProbability: 1,
            zgProbability: 0,
            rightFragment: {
                category: 'letter-and-athet',
                matchedStr: 'ချို  င်း',
                uniProbability: 0.9,
                zgProbability: 0,
                normalization: {
                    normalizedStr: 'ချိုင်း',
                    normalizationActions: {
                        removeSpace: true
                    }
                }
            }
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(
        String.raw`should return 'KinsiTextFragment' when input 'သင်္ချို­င်း' (max match - invisible spaces between)`,
        () => {
            const input = 'သင်္ချို­င်း';
            const curStr = 'င်္ချို­င်း';

            const actualFragment = extracKinsiFragment({
                totalTrimedInputLength: input.trim().length,
                curStr,
                firstCp: curStr.codePointAt(0) as number,
                trimedCurStrLength: curStr.trim().length,
                lastKnownWritingStyle: 'uni',
                lastKnownWritingStyleProbability: 0.5,
                fragments: [
                    {
                        matchedStr: 'သ',
                        category: 'letter',
                        uniProbability: 0.5,
                        zgProbability: 0.5
                    }
                ],
                leftStr: 'သ',
                maxMatch: true
            });

            const expactedFragment: KinsiTextFragment = {
                category: 'kinsi',
                matchedStr: 'င်္',
                uniProbability: 1,
                zgProbability: 0,
                rightFragment: {
                    category: 'letter-and-athet',
                    matchedStr: 'ချို­င်း',
                    uniProbability: 0.9,
                    zgProbability: 0,
                    normalization: {
                        normalizedStr: 'ချိုင်း',
                        normalizationActions: {
                            removeSpace: true
                        }
                    }
                }
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );

    it(
        String.raw`should return 'KinsiTextFragment' when input 'သ︀င်္ခ︀ျို⁠င︀်း' (max match - invisible spaces between and dotted form)`,
        () => {
            const input = 'သ︀င်္ခ︀ျို⁠င︀်း';
            const curStr = 'င်္ခ︀ျို⁠င︀်း';

            const actualFragment = extracKinsiFragment({
                totalTrimedInputLength: input.trim().length,
                curStr,
                firstCp: curStr.codePointAt(0) as number,
                trimedCurStrLength: curStr.trim().length,
                lastKnownWritingStyle: 'uni',
                lastKnownWritingStyleProbability: 0.5,
                fragments: [
                    {
                        matchedStr: 'သ︀',
                        category: 'dotted-letter',
                        uniProbability: 0.6,
                        zgProbability: 0.4
                    }
                ],
                leftStr: 'သ',
                maxMatch: true
            });

            const expactedFragment: KinsiTextFragment = {
                category: 'kinsi',
                matchedStr: 'င်္',
                uniProbability: 1,
                zgProbability: 0,
                rightFragment: {
                    category: 'letter-and-athet',
                    matchedStr: 'ခ︀ျို⁠င︀်း',
                    uniProbability: 0.9,
                    zgProbability: 0,
                    normalization: {
                        normalizedStr: 'ချိုင်း',
                        normalizationActions: {
                            removeSpace: true,
                            removeDottedForm: true
                        }
                    }
                }
            };

            void expect(actualFragment).toEqual(expactedFragment);
        }
    );
});
