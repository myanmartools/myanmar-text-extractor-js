export function isInMyanmarUnicodeBlock(cp: number): boolean {
    if (
        // Myanmar
        (cp >= 0x1000 && cp <= 0x109f) ||
        // Myanmar Extended-B
        (cp >= 0xa9e0 && cp <= 0xa9ff) ||
        // 	Myanmar Extended-A
        (cp >= 0xaa60 && cp <= 0xaa7f)
    ) {
        return true;
    }

    return false;
}
