import { colors } from './colors';
import { space, lineHeights, letterSpacings } from './spacing';
import { sizes } from './sizes';
import { fonts, fontWeights, fontSizes } from './fonts';

export const theme = {
    colors,
    space,
    lineHeights,
    letterSpacings,
    sizes,
    fonts,
    fontSizes,
    fontWeights,
};

export type Theme = typeof theme;
