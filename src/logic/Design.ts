export function grid(
  big: number, // 8 cells
  half: 0 | 1 = 0, // 4 cells
  quarter: 0 | 1 = 0, // 2 cells
  eighth: 0 | 1 = 0 // 1 cells
): number {
  const cells = big * 8 + half * 4 + quarter * 2 + eighth;
  return cells * 3;
}

const LINE_HEIGHT_RATIO = 0.625;

function fontSizeFromLineHeight(size: number) {
  return Math.floor(size * LINE_HEIGHT_RATIO);
}

function fontHeight(size: number): { fontSize: number; lineHeight: string } {
  return {
    fontSize: fontSizeFromLineHeight(size),
    lineHeight: size + "px",
  };
}

export function fontHeightGrid(
  big: number, // 8 cells
  half?: 0 | 1, // 4 cells
  quarter?: 0 | 1, // 2 cells
  eighth?: 0 | 1 // 1 cells
): { fontSize: number; lineHeight: string } {
  return fontHeight(grid(big, half, quarter, eighth));
}
