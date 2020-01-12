// import { FragmentType } from '../src/fragment-type';
// import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
// import { TextFragment } from '../src/text-fragment';

// import { formatCodePoints } from './shared/format-code-points.spec';

// describe('MyanmarTextFragmenter#temp', () => {
//     let fragmenter: MyanmarTextFragmenter;

//     beforeEach(() => {
//         fragmenter = new MyanmarTextFragmenter();
//     });

//     it(String.raw`should return 'အင်္ဂါ' number fragment when input '၂င်္၀ါ'`, () => {
//         const input = '၂င်္၀ါ';
//         const fragment = fragmenter.getNextFragment(input) as TextFragment;

//         expect(fragment.matchedStr).toBe(input,
//             `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
//         expect(fragment).toEqual({
//             matchedStr: input,
//             normalizedStr: input,
//             fragmentType: FragmentType.Number,
//             digitStr: '၂၀',
//             ancient: true,
//             measureWords: ['အင်္ဂါ']
//         });
//     });
// });
