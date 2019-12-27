import { TextFragment } from './text-fragment';

export class MyanmarTextDigitFragmenter {
    private readonly _orderListNonBoxRegExp = new RegExp('^[\u1040-\u1049\u104E][\u101D\u1040-\u1049\u104E]*[ \u180E\u200A\u200B\u202F\uFEFF]?[\)\]\u104A\u104B]');
    private readonly _orderListBoxRegExp = new RegExp('^[\[\(][ \u180E\u200A\u200B\u202F\uFEFF]?[\u1040-\u1049\u104E][\u101D\u1040-\u1049\u104E]*[ \u180E\u200A\u200B\u202F\uFEFF]?[\)\]]');

    private readonly _thousandSeparatorSuffixRegex = new RegExp('([\u002C\u066C][\u101D\u1040-\u1049\u104E]{3})+(\.[\u101D\u1040-\u1049\u104E]+)?');
    private readonly _underscoreSeparatorSuffixRegex = new RegExp('(\u005F[\u101D\u1040-\u1049\u104E]+)+');

    getDigitFragment(input: string, prevFragments?: TextFragment[]): TextFragment | null {
        const firstCp = input.codePointAt(0);
        if (!firstCp) {
            return null;
        }

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

        if ((firstCp === 0x0028 || firstCp === 0x005B)) {
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
}
