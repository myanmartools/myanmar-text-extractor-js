import { FragmentType } from '../../src/fragment-type';
import { MyanmarTextFragmenter } from '../../src/myanmar-text-fragmenter';
import { TextFragment } from '../../src/text-fragment';

describe('MyanmarTextFragmenter#getNextFragment#time', () => {
    let fragmenter: MyanmarTextFragmenter;

    beforeEach(() => {
        fragmenter = new MyanmarTextFragmenter();
    });

    describe('hour-minute-second', () => {
        // hh:mm:ss
        it(String.raw`should return time fragment when input '၂၃:၅၉:၅၉'`, () => {
            const input = '၂၃:၅၉:၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm:ss
        it(String.raw`should return time fragment when input '၀၁:၀၁:၀၁'`, () => {
            const input = '၀၁:၀၁:၀၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return time fragment when input '၁:၁:၁'`, () => {
            const input = '၁:၁:၁';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m:s
        it(String.raw`should return time fragment when input '၁:၁၀:၅၉'`, () => {
            const input = '၁:၁၀:၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('hour-minute', () => {
        // hh:mm
        it(String.raw`should return time fragment when input '၂၃:၅၉'`, () => {
            const input = '၂၃:၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // hh:mm
        it(String.raw`should return time fragment when input '၀၁:၀၅'`, () => {
            const input = '၀၁:၀၅';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        // h:m
        it(String.raw`should return time fragment when input '၁:၀၅'`, () => {
            const input = '၁:၀၅';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: input,
                fragmentType: FragmentType.PossibleTime
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('invalid', () => {
        it(String.raw`should return time fragment when input '၁၂:၅၉;၅၉'`, () => {
            const input = '၁၂:၅၉;၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                fragmentType: FragmentType.PossibleTime,
                normalizeReason: {
                    normalizeColon: true
                },
                invalidReason: {
                    invalidCharInsteadOfColon: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return time fragment when input '၁၂ : ၅၉: ၅၉'`, () => {
            const input = '၁၂ : ၅၉: ၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                fragmentType: FragmentType.PossibleTime,
                spaceDetected: true,
                normalizeReason: {
                    removeSpace: true
                },
                invalidReason: {
                    invalidSpaceIncluded: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });

        it(String.raw`should return time fragment when input '၁၂\u00A0:\u00A0၅၉:\u200B၅၉'`, () => {
            const input = '၁၂\u00A0:\u00A0၅၉:\u200B၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;
            const expactedFragment: TextFragment = {
                matchedStr: input,
                normalizedStr: '၁၂:၅၉:၅၉',
                fragmentType: FragmentType.PossibleTime,
                spaceDetected: true,
                normalizeReason: {
                    removeSpace: true
                },
                invalidReason: {
                    invalidSpaceIncluded: true
                }
            };

            expect(actualFragment).toEqual(expactedFragment);
        });
    });

    describe('not', () => {
        it(String.raw`should NOT return time fragment when input '၁၂;၅၉'`, () => {
            const input = '၁၂;၅၉';
            const actualFragment = fragmenter.getNextFragment(input) as TextFragment;

            expect(actualFragment.fragmentType !== FragmentType.PossibleTime).toBeTruthy();
        });
    });
});
