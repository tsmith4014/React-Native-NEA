import { bodyStyles } from '@/infrastructure/theme/fonts';
import clsx from 'clsx';
import React, { useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ChevronLeft } from 'react-native-feather';
import { Button as WixButton, ButtonProps as WixButtonProps } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

type ButtonProps = Omit<WixButtonProps, 'size' | 'variant'> & {
    size?: 'small' | 'normal';
    variant?: 'primary' | 'secondary' | 'text';
    iconVariant?: 'left' | 'right';
    IconSource?: typeof ChevronLeft;
};

type Size = {
    small: ViewStyle;
    normal: ViewStyle;
};

type Variant = {
    primary: Size;
    secondary: Size;
    text: Size;
};

const sizeStyles = {
    primary: StyleSheet.create({
        normal: { height: 48, paddingHorizontal: 16, borderRadius: 100, paddingVertical: 0 },
        small: { height: 40, paddingHorizontal: 16, borderRadius: 100, paddingVertical: 0 },
    }),
    secondary: StyleSheet.create({
        normal: { height: 48, paddingHorizontal: 16, borderRadius: 100, paddingVertical: 0 },
        small: { height: 40, paddingHorizontal: 16, borderRadius: 100, paddingVertical: 0 },
    }),
    text: StyleSheet.create({
        normal: { height: 38, paddingHorizontal: 0, minWidth: 0, borderRadius: 0, paddingVertical: 0 },
        small: { height: 32, paddingHorizontal: 0, minWidth: 0, borderRadius: 0, paddingVertical: 0 },
    }),
} as Variant;

const labelStyles = {
    primary: {
        normal: bodyStyles.semibold.medium,
        small: bodyStyles.semibold.small,
    },
    secondary: {
        normal: bodyStyles.semibold.medium,
        small: bodyStyles.semibold.small,
    },
    text: {
        normal: bodyStyles.semibold.medium,
        small: bodyStyles.semibold.xSmall,
    },
};

const Button = ({
    className,
    style,
    label = '',
    size = 'normal',
    variant = 'primary',
    iconVariant,
    IconSource,
    iconOnRight,
    disabled = false,
    ...props
}: ButtonProps) => {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);
    const sizeStyle = sizeStyles[variant][size];
    const labelStyle = labelStyles[variant][size];
    let activeBackgroundColor = colors.brand.primary.spring60;
    const iconOnly = !label?.length;
    if (variant === 'secondary') {
        activeBackgroundColor = colors.brand.primary.spring30;
    } else if (variant === 'text') {
        activeBackgroundColor = 'white';
    }
    const color =
        variant === 'text'
            ? focused
                ? colors.brand.primary.spring50
                : disabled
                  ? colors.ui.neutral.gray40
                  : colors.brand.primary.spring70
            : disabled
              ? colors.ui.neutral.gray40
              : colors.ui.neutral.gray90;
    return (
        <WixButton
            {...props}
            iconOnRight={iconOnRight}
            label={label}
            labelStyle={[labelStyle]}
            disabled={disabled}
            style={[
                sizeStyle,
                variant !== 'text' && !disabled
                    ? {
                          borderWidth: 1,
                          borderColor: colors.brand.primary.spring50,
                          borderStyle: 'solid',
                      }
                    : {},
            ]}
            iconSource={
                IconSource &&
                (() => (
                    <IconSource
                        className={clsx({ [iconOnRight ? 'ml-2' : 'mr-2']: !iconOnly })}
                        color={color}
                        width={20}
                        height={20}
                    />
                ))
            }
            backgroundColor={
                variant === 'text'
                    ? 'white'
                    : variant === 'primary'
                      ? colors.brand.primary.spring50
                      : colors.ui.neutral.white
            }
            activeBackgroundColor={activeBackgroundColor}
            disabledBackgroundColor={variant === 'text' ? 'white' : colors.ui.neutral.gray10}
            activeOpacity={1}
            color={color}
            onPressIn={() => setFocused(true)}
            onPressOut={() => setFocused(false)}
        />
    );
};

export default Button;
