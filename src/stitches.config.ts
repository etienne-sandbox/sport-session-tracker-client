import { createCss, defaultThemeMap } from "@stitches/react";

export function size(big: number, small: number): number {
  const smalls = small + big * 8;
  return smalls * 3;
}

const sizes = {
  "01": size(0, 1) + "px",
  "02": size(0, 2) + "px",
  "04": size(0, 4) + "px",
  "06": size(0, 6) + "px",
  10: size(1, 0) + "px",
  14: size(1, 4) + "px",
  20: size(2, 0) + "px",
  22: size(2, 2) + "px",
  24: size(2, 4) + "px",
  30: size(3, 0) + "px",
  40: size(4, 0) + "px",
  50: size(5, 0) + "px",
  60: size(6, 0) + "px",
  70: size(7, 0) + "px",
  80: size(8, 0) + "px",
  90: size(9, 0) + "px",
};

const lineHeights = {
  "06": size(0, 6) + "px",
  10: size(1, 0) + "px",
  11: size(1, 1) + "px",
  12: size(1, 2) + "px",
  14: size(1, 4) + "px",
  20: size(2, 0) + "px",
  24: size(2, 4) + "px",
  30: size(3, 0) + "px",
};

const fontSizeFromLineHeight = (size: number) => {
  return Math.floor(size * 0.6);
};

const fontSizes: {
  [K in keyof typeof lineHeights]: string;
} = Object.fromEntries(
  Object.entries(lineHeights).map(([key, val]) => [
    key,
    fontSizeFromLineHeight(parseInt(val, 10)) + "px",
  ])
) as any;

export const { styled, css, theme } = createCss({
  prefix: "",
  themeMap: {
    ...defaultThemeMap,
  },
  theme: {
    colors: {
      white: "#FAFAFA",
      grey900: "#212121",
      transparentLight: "rgba(255, 255, 255, 0.1)",
      transparentDark: "rgba(0, 0, 0, 0.1)",
      transparentBlue: "rgb(18, 93, 233, 0.1)",
      blueGrey900: "#263238",
      blue500: "#2196F3", // "#045de9",
      blue600: "#1976D2",
      blue300: "#64B5F6",
      red100: "#FFCDD2",
      red200: "#EF9A9A",
      red300: "#E57373",
      red400: "#EF5350",
      red500: "#F44336",
      red600: "#E53935",
      grey300: "#E0E0E0",
      grey400: "#BDBDBD",
      grey500: "#9E9E9E",
    },
    radii: {
      big: "10px",
      medium: "6px",
    },
    space: sizes,
    sizes,
    lineHeights,
    fontSizes,
    shadows: {
      soft: "rgba(0, 0, 0, 0.2) 0px 8px 24px",
      overlay: "rgba(0, 0, 0, 0.2) 0px 4px 18px",
    },
    fonts: {
      spaceGrotesk: `"Space Grotesk", sans-serif`,
    },
    borderWidths: {
      small: "2px",
    },
    fontWeights: {
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
    },
  },
  media: {},
  utils: {
    fontHeight: () => (value: `$${keyof typeof lineHeights}`) => ({
      lineHeight: value,
      fontSize: value,
    }),
  },
});
