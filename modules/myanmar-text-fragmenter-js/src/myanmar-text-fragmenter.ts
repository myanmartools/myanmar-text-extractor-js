import { TextFragment } from './text-fragment';

export class MyanmarTextFragmenter {
    // private readonly _options: TextFragmenterOptions;

    private readonly _orderListBoxRegExp = /^[\[\(][ \u180E\u200A\u200B\u202F\uFEFF]?[\u1041-\u1049\u104E][\u101D\u1040-\u1049\u104E]*[ \u180E\u200A\u200B\u202F\uFEFF]?[\)\]]/;
    private readonly _orderListNonBoxRegExp = /^[\u1040-\u1049\u104E][\u101D\u1040-\u1049\u104E]*[ \u180E\u200A\u200B\u202F\uFEFF]?[\)\]\u104A\u104B]/;

    private readonly _thousandSeparatorSuffixRegex = /([\u002C\u066C][\u101D\u1040-\u1049\u104E]{3})+(\.[\u101D\u1040-\u1049\u104E]+)?/;
    private readonly _underscoreSeparatorSuffixRegex = /(\u005F[\u101D\u1040-\u1049\u104E]+)+/;

    // // [\u103B\u103C]
    // //
    // // ကျှော် / ကျှော့ / ကျှော (Length: 4)
    // private readonly _d3bOr3c3e312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u103E\u1031\u102C[\u1037\u103A]?');
    // // ကျှေး / ကျှေ့ / ကျှေ (Length: 3)
    // private readonly _d3bOr3c3e31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103E\u1031[\u1037\u1038]?');

    // // ကျွေး / ကျွေ့ / ကျွေ (Length: 3)
    // private readonly _d3bOr3c3d31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u103D\u1031[\u1037\u1038]?');

    // // ကျော် / ကျော့ / ကျော (Length: 3)
    // private readonly _d3bOr3c312cO37Or3aRegExp = new RegExp('^[\u103B\u103C]\u1031\u102C[\u1037\u103A]?');
    // // ကျေး / ကျေ့ / ကျေ (Length: 2)
    // private readonly _d3bOr3c31O37Or38RegExp = new RegExp('^[\u103B\u103C]\u1031[\u1037\u1038]?');

    // constructor(options?: TextFragmenterOptions) {
    //     this._options = options || {};
    // }

    getNextFragment(input: string, prevFragments?: TextFragment[]): TextFragment | null {
        const firstC = input[0];
        const firstCp = firstC.codePointAt(0);
        if (!firstCp) {
            return null;
        }

        // ဤ / ဪ
        if (firstCp === 0x1024 || firstCp === 0x102A) {
            return {
                matchedStr: firstC,
                uncombinableLetter: true,
                syllableIncluded: true
            };
        }

        // ၌ / ၍ / ၏
        if (firstCp === 0x104C || firstCp === 0x104D || firstCp === 0x104F) {
            return {
                matchedStr: firstC,
                uncombinableLetter: true,
                punctuationLetter: true,
                syllableIncluded: true
            };
        }

        // ၊ / ။
        if (firstCp === 0x104A || firstCp === 0x104B) {
            return {
                matchedStr: firstC,
                uncombinableLetter: true,
                punctuationLetter: true
            };
        }

        return this.getNextDigitFragment(input, firstCp, prevFragments);
    }

    private getNextDigitFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        if ((firstCp === 0x0028 || firstCp === 0x005B) && input.length > 2) {
            return this.getOrderListDigitFragment(input, firstCp, prevFragments);
        }

        if (!((firstCp >= 0x1040 && firstCp <= 0x1049) || firstCp === 0x101D || firstCp === 0x104E)) {
            return null;
        }

        if ((firstCp === 0x101D || firstCp === 0x104E) && input.length === 1) {
            return null;
        }

        if (input.length === 1) {
            return {
                matchedStr: input,
                numberFragment: true
            };
        }

        const orderListFragment = this.getOrderListDigitFragment(input, firstCp, prevFragments);
        if (orderListFragment != null) {
            return orderListFragment;
        }

        return this.getNumberCombinationDigitFragment(input);
    }

    private getOrderListDigitFragment(input: string, firstCp: number, prevFragments?: TextFragment[]): TextFragment | null {
        let m: RegExpMatchArray | null;

        if (firstCp === 0x0028 || firstCp === 0x005B) {
            m = input.match(this._orderListBoxRegExp);
        } else {
            m = input.match(this._orderListNonBoxRegExp);
        }

        if (m == null) {
            return null;
        }

        const matchedStr = m[0];
        let spaceNormalizedStr = '';
        let suggestedStr = '';
        let digitStr = '';

        let u101dIncluded = false;
        let u104eIncluded = false;

        for (const c of matchedStr) {
            const cp = c.codePointAt(0) as number;
            if (cp === 0x0020 || cp === 0x180E || cp === 0x200A || cp === 0x200B || cp === 0x202F || cp === 0xFEFF) {
                continue;
            }

            if (cp >= 0x1040 && cp <= 0x1049) {
                digitStr += c;
                suggestedStr += c;
                spaceNormalizedStr += c;
            } else if (cp === 0x101D) {
                u101dIncluded = true;
                digitStr += '\u1040';
                suggestedStr += '\u1040';
                spaceNormalizedStr += c;
            } else if (cp === 0x104E) {
                u104eIncluded = true;
                digitStr += '\u1044';
                suggestedStr += '\u1044';
                spaceNormalizedStr += c;
            } else {
                suggestedStr += c;
                spaceNormalizedStr += c;
            }
        }

        if (digitStr === '\u1044' && u104eIncluded) {
            if (!prevFragments) {
                return null;
            }

            let foundMatch = false;
            for (let i = prevFragments.length - 1; i === 0; i--) {
                const prevFragment = prevFragments[i];
                if (!prevFragment.numberOrderList) {
                    continue;
                }

                if (prevFragment.orderListDigitStr === '\u1043') {
                    foundMatch = true;
                }

                break;
            }

            if (!foundMatch) {
                return null;
            }
        }

        const textFragment: TextFragment = {
            matchedStr,
            suggestedStr,
            numberFragment: true,
            numberOrderList: true,
            orderListDigitStr: digitStr
        };

        if (u101dIncluded) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU101DInsteadOfU1040 = true;
        }

        if (u104eIncluded) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU104EInsteadOfU1044 = true;
        }

        if (matchedStr.length !== spaceNormalizedStr.length) {
            textFragment.error = textFragment.error || {};
            textFragment.error.spaceIncluded = true;
        }

        return textFragment;
    }

    // tslint:disable-next-line: max-func-body-length
    private getNumberCombinationDigitFragment(input: string): TextFragment | null {
        let curStr = input;

        let matchedStr = '';
        let spaceNormalizedStr = '';
        let suggestedStr = '';
        let digitStr = '';

        let u101DCount = 0;
        let u104ECount = 0;

        let tmpSpace = '';

        while (curStr.length > 0) {
            const c = curStr[0];
            const cp = c.codePointAt(0);

            if (!cp) {
                break;
            }

            if (cp === 0x101D || cp === 0x104E || (cp >= 0x1040 && cp <= 0x1049)) {
                matchedStr += tmpSpace + c;
                spaceNormalizedStr += c;

                if (cp === 0x101D) {
                    u101DCount++;
                    digitStr += '\u1040';
                    suggestedStr += '\u1040';
                } else if (cp === 0x104E) {
                    u104ECount++;
                    digitStr += '\u1044';
                    suggestedStr += '\u1044';
                } else {
                    digitStr += c;
                    suggestedStr += c;
                }

                tmpSpace = '';
                curStr = curStr.substring(1);
                continue;
            }

            if (cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || (cp >= 0x2000 && cp <= 0x2009) || cp === 0x205F || cp === 0x3000 ||
                cp === 0x180E || cp === 0x200A || cp === 0x200B || cp === 0x202F || cp === 0xFEFF) {
                if (tmpSpace || curStr.length < 2) {
                    break;
                }

                tmpSpace = c;
                curStr = curStr.substring(1);
                continue;
            }

            // Digit seperators
            if (cp === 0x002C || cp === 0x066C || cp === 0x005F) {
                if (tmpSpace) {
                    break;
                }

                let m: RegExpMatchArray | null = null;

                if (cp === 0x002C || cp === 0x066C) {
                    if (curStr.length < 4) {
                        break;
                    }

                    m = curStr.match(this._thousandSeparatorSuffixRegex);
                } else if (cp === 0x005F) {
                    if (curStr.length < 2) {
                        break;
                    }

                    m = curStr.match(this._underscoreSeparatorSuffixRegex);
                }

                if (m == null) {
                    break;
                }

                const mStr = m[0];
                matchedStr += mStr;
                spaceNormalizedStr += mStr;

                for (const cc of spaceNormalizedStr) {
                    if (cc === '\u066C') {
                        suggestedStr += '\u002C';
                    } else if (cc === '\u101D') {
                        u101DCount++;
                        suggestedStr += '\u1040';
                        digitStr += '\u1040';
                    } else if (cc === '\u104E') {
                        u104ECount++;
                        suggestedStr += '\u1044';
                        digitStr += '\u1044';
                    } else {
                        suggestedStr += cc;
                        digitStr += cc;
                    }
                }

                break;
            }

            break;
        }

        if (u101DCount + u104ECount >= digitStr.length) {
            return null;
        }

        const textFragment: TextFragment = {
            matchedStr,
            numberFragment: true
        };

        if (suggestedStr !== matchedStr) {
            textFragment.suggestedStr = suggestedStr;
        }

        if (u101DCount > 0) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU101DInsteadOfU1040 = true;
        }

        if (u104ECount > 0) {
            textFragment.error = textFragment.error || {};
            textFragment.error.invalidU104EInsteadOfU1044 = true;
        }

        if (matchedStr.length !== spaceNormalizedStr.length) {
            textFragment.error = textFragment.error || {};
            textFragment.error.spaceIncluded = true;
        }

        return textFragment;
    }

    // private getFragmentForCombination(input: string, firstCp: number, curOptions: TextFragmenterOptions): TextFragment | null {
    //     if (!((firstCp >= 0x1000 && firstCp <= 0x1021) ||
    //         firstCp === 0x1023 || (firstCp >= 0x1025 && firstCp <= 0x1027) ||
    //         firstCp === 0x1029 || firstCp === 0x103F ||
    //         (firstCp >= 0x1040 && firstCp <= 0x1049) || firstCp === 0x104E)) {
    //         return null;
    //     }

    //     const normalizedTextFragment = this.getNormalizedFragmentForConsonantCombination(input, curOptions);

    //     if (input.length < 2) {
    //         return textFragment;
    //     }

    //     const testCp1 = input.codePointAt(1);
    //     if (!testCp1 ||
    //         !((testCp1 >= 0x102B && testCp1 <= 0x1032) ||
    //             (testCp1 >= 0x1036 && testCp1 <= 0x1038) ||
    //             (testCp1 >= 0x103A && testCp1 <= 0x103E))) {
    //         return textFragment;
    //     }

    //     if (input.length === 2) {
    //         textFragment.matchedString += input[1];
    //         textFragment.normalizedString += input[1];

    //         return textFragment;
    //     }

    //     const testCp2 = input.codePointAt(2);
    //     if (!testCp2 ||
    //         !((testCp2 >= 0x102B && testCp2 <= 0x1032) ||
    //             (testCp2 >= 0x1036 && testCp2 <= 0x1038) ||
    //             (testCp2 >= 0x103A && testCp2 <= 0x103E))) {
    //         textFragment.matchedString += input[1];
    //         textFragment.normalizedString += input[1];

    //         return textFragment;
    //     }

    //     const curStr = input.substring(1);

    //     if (testCp1 === 0x103B || testCp1 === 0x103C) {
    //         const matchedStr = this.matchU103BOrU103CStart(curStr);
    //         if (matchedStr != null) {
    //             textFragment.matchedString += matchedStr;
    //             textFragment.normalizedString += matchedStr;

    //             return textFragment;
    //         }
    //     }

    //     return textFragment;
    // }

    // private getNormalizedFragmentForConsonantCombination(input: string, curOptions: TextFragmenterOptions): TextFragment | null {
    //     let tmpSpace = '';
    //     const textFragment: TextFragment = {
    //         matchedString: input[0],
    //         normalizedString: input[0]
    //     };

    //     let curStr = input.substring(1);

    //     while (curStr.length > 0) {
    //         const c = curStr[0];
    //         const cp = c.codePointAt(0);

    //         if (!cp) {
    //             break;
    //         }

    //         if (cp >= 0x102B && cp <= 0x103E) {
    //             textFragment.matchedString += tmpSpace + c;
    //             textFragment.normalizedString += c;
    //             if (tmpSpace) {
    //                 textFragment.spaceIncluded = true;
    //                 tmpSpace = '';
    //             }

    //             curStr = curStr.substring(1);
    //             continue;
    //         }

    //         if ((cp === 0x0020 || cp === 0x00A0 || cp === 0x1680 || cp === 0x180E || (cp >= 0x2000 && cp <= 0x200B) ||
    //             cp === 0x202F || cp === 0x205F || cp === 0x3000 || cp === 0xFEFF)) {
    //             if (!curOptions.noSpaceBetween) {
    //                 tmpSpace += c;
    //                 curStr = curStr.substring(1);
    //                 continue;
    //             }

    //             break;
    //         }

    //         break;
    //     }

    //     return textFragment.matchedString ? textFragment : null;
    // }

    // private matchU103BOrU103CStart(curStr: string): string | null {
    //     const curStrLen = curStr.length;

    //     if (curStrLen >= 4 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3e312cO37Or3aRegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u103E' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3e31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u103D' && curStr[2] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c3d31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 3 && curStr[1] === '\u1031' && curStr[2] === '\u102C') {
    //         const m = curStr.match(this._d3bOr3c312cO37Or3aRegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     } else if (curStrLen >= 2 && curStr[1] === '\u1031') {
    //         const m = curStr.match(this._d3bOr3c31O37Or38RegExp);
    //         if (m != null) {
    //             return m[0];
    //         }
    //     }

    //     return null;
    // }
}
