import styled from 'styled-components/native';

import type { Theme } from '../../infrastructure/theme';

const defaultTextStyles = (theme: Theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  letter-spacing: ${theme.letterSpacings.copy};
  line-height: ${theme.lineHeights.copy};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const headline = (theme: Theme) => `
    font-size: ${theme.fontSizes.headline};
    font-weight: ${theme.fontWeights.bold};
    letter-spacing: ${theme.letterSpacings.title};
    line-height: ${theme.lineHeights.title};
    color: ${theme.colors.text.primary};
`;

const body = (theme: Theme) => `
    font-size: ${theme.fontSizes.bodyM};
`;

const hint = (theme: Theme) => `
    font-size: ${theme.fontSizes.bodyM};
`;

const error = (theme: Theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: Theme) => `
    font-size: ${theme.fontSizes.bodyM};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: Theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.bodyM};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
    body,
    label,
    caption,
    error,
    hint,
};

export const Text = styled.Text<{
    variant?: keyof typeof variants;
    theme: Theme;
}>`
    ${({ theme }) => defaultTextStyles(theme)}
    ${({ variant = 'body', theme }) => variants[variant](theme)}
`;
