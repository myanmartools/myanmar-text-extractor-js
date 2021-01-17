import { extracKinsiFragment } from '../../src/kinsi-text-extractor';
import { KinsiTextFragment } from '../../src/kinsi-text-fragment';

describe('extracKinsiFragment', () => {
    it(String.raw`should return 'KinsiTextFragment' when input 'င်္'`, () => {
        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: 'င်္'.trim().length,
            curStr: 'င်္',
            firstCp: 'င်္'.codePointAt(0) as number,
            trimedCurStrLength: 'င်္'.trim().length,
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

    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ '`, () => {
        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: 'င်္ '.trim().length,
            curStr: 'င်္ ',
            firstCp: 'င်္ '.codePointAt(0) as number,
            trimedCurStrLength: 'င်္ '.trim().length,
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
        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: 'ကင်္'.trim().length,
            curStr: 'င်္',
            firstCp: 'င်္'.codePointAt(0) as number,
            trimedCurStrLength: 'င်္'.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.55,
            fragments: [
                {
                    category: 'single-letter',
                    matchedStr: 'က',
                    uniProbability: 0.55,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'က'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            leftLetterRequired: false,
            rightLetterRequired: true,
            uniProbability: 0.6,
            zgProbability: 0.3
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'ကင်္', lastKnownWritingStyle: 'zg'`, () => {
        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: 'ကင်္'.trim().length,
            curStr: 'င်္',
            firstCp: 'င်္'.codePointAt(0) as number,
            trimedCurStrLength: 'င်္'.trim().length,
            lastKnownWritingStyle: 'zg',
            lastKnownWritingStyleProbability: 0.55,
            fragments: [
                {
                    category: 'single-letter',
                    matchedStr: 'က',
                    uniProbability: 0.5,
                    zgProbability: 0.55
                }
            ],
            leftStr: 'က'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္',
            leftLetterRequired: true,
            rightLetterRequired: true,
            uniProbability: 0.48,
            zgProbability: 0.4
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ချိုင်း'`, () => {
        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: 'င်္ချိုင်း'.trim().length,
            curStr: 'င်္ချိုင်း',
            firstCp: 'င်္ချိုင်း'.codePointAt(0) as number,
            trimedCurStrLength: 'င်္ချိုင်း'.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'single-letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္ချိုင်း',
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ချိုင်းက'`, () => {
        const input = 'င်္ချိုင်းက';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'single-letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ'
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: 'င်္ချိုင်း',
            uniProbability: 1,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });

    it(String.raw`should return 'KinsiTextFragment' when input 'င်္ချို  င်း' (max match)`, () => {
        const input = 'င်္ချို  င်း';

        const actualFragment = extracKinsiFragment({
            totalTrimedInputLength: input.trim().length,
            curStr: input,
            firstCp: input.codePointAt(0) as number,
            trimedCurStrLength: input.trim().length,
            lastKnownWritingStyle: 'uni',
            lastKnownWritingStyleProbability: 0.5,
            fragments: [
                {
                    matchedStr: 'သ',
                    category: 'single-letter',
                    uniProbability: 0.5,
                    zgProbability: 0.5
                }
            ],
            leftStr: 'သ',
            maxMatch: true
        });

        const expactedFragment: KinsiTextFragment = {
            category: 'kinsi',
            matchedStr: input,
            normalizedStr: 'င်္ချိုင်း',
            uniProbability: 0.9,
            zgProbability: 0
        };

        void expect(actualFragment).toEqual(expactedFragment);
    });
});
