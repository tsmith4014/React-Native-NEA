import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import type { Theme } from '../../infrastructure/theme';

const positionVariant: { [key: string]: string } = {
    top: 'margin-top',
    left: 'margin-left',
    right: 'margin-right',
    bottom: 'margin-bottom',
};

const sizeVariant: { [key: string]: number } = {
    small: 1,
    medium: 2,
    large: 3,
};

const getVariant = (
    position: keyof typeof positionVariant,
    size: keyof typeof sizeVariant,
    theme: Theme
) => {
    const sizeIndex = sizeVariant[size];
    const property = positionVariant[position];
    const value = theme.space[sizeIndex];

    return `${property}:${value};`;
};

const SpacerView = styled.View<SpacerViewProps>`
    ${({ variant }) => variant}
`;

export const Spacer = ({ position, size, children }: SpacerProps) => {
    const theme = useTheme();
    const variant = getVariant(position, size, theme as Theme);
    return <SpacerView variant={variant}>{children}</SpacerView>;
};

type SpacerProps = {
    position: string;
    size: string;
    children: React.ReactNode;
};

type SpacerViewProps = {
    variant: string; // Add the variant prop
};
