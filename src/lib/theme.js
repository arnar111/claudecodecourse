const PALETTES = {
  light: {
    cool: {
      bg: "#F2F1FF",
      panel: "#FFFFFF",
      panelAlt: "#E8E6FB",
      line: "#D5D0F0",
      ink: "#2A2540",
      inkDim: "#5C5180",
      inkSoft: "#928BB0",
      rose: "#9E7AC7",
      lavender: "#7080D6",
      mint: "#62A8C5",
      sun: "#7BA8E0",
      codeBg: "#FFFAF4",
    },
    neutral: {
      bg: "#FAF4F1",
      panel: "#FFFFFF",
      panelAlt: "#F5EAE3",
      line: "#E8D6CB",
      ink: "#2D2438",
      inkDim: "#65566F",
      inkSoft: "#A0917F",
      rose: "#D17A95",
      lavender: "#9C8BC8",
      mint: "#7DBBA6",
      sun: "#E6A062",
      codeBg: "#FFFAF4",
    },
    warm: {
      bg: "#FFF1E5",
      panel: "#FFFAF4",
      panelAlt: "#FFE0CC",
      line: "#F2C9AC",
      ink: "#3A1F22",
      inkDim: "#6B3F3A",
      inkSoft: "#9C7060",
      rose: "#E07A92",
      lavender: "#B98AC0",
      mint: "#90B888",
      sun: "#F0A360",
      codeBg: "#FFFAF4",
    },
  },
  dark: {
    cool: {
      bg: "#161824",
      panel: "#1E2138",
      panelAlt: "#272B48",
      line: "#383E5E",
      ink: "#E6E8FF",
      inkDim: "#B4B8DC",
      inkSoft: "#7A80A6",
      rose: "#B498DC",
      lavender: "#8E9FE6",
      mint: "#7AC0D5",
      sun: "#92B5E8",
      codeBg: "#13101F",
    },
    neutral: {
      bg: "#1E1A26",
      panel: "#2A2436",
      panelAlt: "#352D44",
      line: "#48405A",
      ink: "#F2E4D8",
      inkDim: "#BFAFC0",
      inkSoft: "#8A7E92",
      rose: "#DC9DB0",
      lavender: "#B4A5D9",
      mint: "#9BCDB9",
      sun: "#E8B07A",
      codeBg: "#13101F",
    },
    warm: {
      bg: "#241820",
      panel: "#322028",
      panelAlt: "#3D2932",
      line: "#523840",
      ink: "#FCEAD8",
      inkDim: "#D0B5A8",
      inkSoft: "#9C8278",
      rose: "#E89AA9",
      lavender: "#C29ECE",
      mint: "#A6CC9B",
      sun: "#F2BC85",
      codeBg: "#1A1218",
    },
  },
};

const TONES = ["cool", "neutral", "warm"];

export function getPalette({ dark, warmth }) {
  return PALETTES[dark ? "dark" : "light"][TONES[warmth]];
}

export function getShadowScale(intensity) {
  return [0.3, 0.65, 1][intensity];
}

export function alphaHex(alpha) {
  return Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
}
