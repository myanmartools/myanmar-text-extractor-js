// import { FragmentType } from '../src/fragment-type';
// import { MyanmarTextFragmenter } from '../src/myanmar-text-fragmenter';
// import { TextFragment } from '../src/text-fragment';

// import { formatCodePoints } from './shared/format-code-points.spec';

// describe('MyanmarTextFragmenter#getNextFragment#number', () => {
//     let fragmenter: MyanmarTextFragmenter;

//     beforeEach(() => {
//         fragmenter = new MyanmarTextFragmenter();
//     });

//     it(String.raw`should return number fragment when input with separator and decimal dot '၃.၁၄၁၅၉'`, () => {
//         const input = '၃.၁၄၁၅၉';
//         const fragment = fragmenter.getNextFragment(input) as TextFragment;

//         expect(fragment.matchedStr).toBe(input, `\n\nActual matchedStr: ${formatCodePoints(fragment.matchedStr)}`);
//         expect(fragment).toEqual({
//             matchedStr: input,
//             normalizedStr: input,
//             fragmentType: FragmentType.Number,
//             digitStr: '၃.၁၄၁၅၉',
//             digitSeparatorIncluded: true
//         });
//     });
// });
