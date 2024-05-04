import React, { MutableRefObject } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

type Font = {
    xxLarge: TextStyle;
    xLarge: TextStyle;
    large: TextStyle;
    medium: TextStyle;
    small: TextStyle;
    xSmall: TextStyle;
};

export const headlineStyles = StyleSheet.create({
    large: { fontFamily: 'MontserratBold', fontSize: 40, lineHeight: 48, letterSpacing: -0.8 },
}) as Font;

export const titleStyles = StyleSheet.create({
    large: { fontFamily: 'MontserratBold', fontSize: 36, lineHeight: 43.2, letterSpacing: -0.72 },
    medium: { fontFamily: 'MontserratSemiBold', fontSize: 28, lineHeight: 33.6, letterSpacing: -0.56 },
    small: { fontFamily: 'MontserratSemiBold', fontSize: 24, lineHeight: 28.8, letterSpacing: -0.48 },
}) as Font;

export const subtitleStyles = StyleSheet.create({
    large: { fontFamily: 'MontserratSemiBold', fontSize: 20, lineHeight: 24, letterSpacing: -0.2 },
    small: { fontFamily: 'MontserratSemiBold', fontSize: 18, lineHeight: 21.6, letterSpacing: -0.18 },
}) as Font;

export const bodyStyles = {
    regular: StyleSheet.create({
        xLarge: { fontFamily: 'Montserrat', fontSize: 18, lineHeight: 32, letterSpacing: -0.18 },
        large: { fontFamily: 'Montserrat', fontSize: 16, lineHeight: 25.6, letterSpacing: -0.16 },
        medium: { fontFamily: 'Montserrat', fontSize: 14, lineHeight: 22.4, letterSpacing: -0.14 },
        small: { fontFamily: 'Montserrat', fontSize: 12, lineHeight: 19.2, letterSpacing: -0.12 },
        xSmall: { fontFamily: 'Montserrat', fontSize: 10, lineHeight: 16, letterSpacing: -0.1 },
    }),
    medium: StyleSheet.create({
        large: { fontFamily: 'MontserratMedium', fontSize: 16, lineHeight: 25.6, letterSpacing: -0.16 },
        medium: { fontFamily: 'MontserratMedium', fontSize: 14, lineHeight: 22.4, letterSpacing: -0.14 },
        small: { fontFamily: 'MontserratMedium', fontSize: 12, lineHeight: 19.2, letterSpacing: -0.12 },
        xSmall: { fontFamily: 'MontserratMedium', fontSize: 10, lineHeight: 16, letterSpacing: -0.1 },
    }),
    semibold: StyleSheet.create({
        large: { fontFamily: 'MontserratSemiBold', fontSize: 16, lineHeight: 25.6, letterSpacing: -0.16 },
        medium: { fontFamily: 'MontserratSemiBold', fontSize: 14, lineHeight: 22.4, letterSpacing: -0.14 },
        small: { fontFamily: 'MontserratSemiBold', fontSize: 12, lineHeight: 19.2, letterSpacing: -0.12 },
        xSmall: { fontFamily: 'MontserratSemiBold', fontSize: 10, lineHeight: 16, letterSpacing: -0.1 },
    }),
} as Record<'regular' | 'medium' | 'semibold', Font>;

type TextTypeProps = {
    type: 'headline' | 'title' | 'subtitle' | 'bodyRegular' | 'bodyMedium' | 'bodySemibold';
    size: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
};

export type CustomTextProps = TextProps & {
    children: React.ReactNode;
    ref?: MutableRefObject<Text | null>;
};

function TextComp({ type, children, style, size, ...rest }: CustomTextProps & TextTypeProps) {
    let textStyle: { [key: string]: TextStyle } | undefined;

    if (type === 'headline') {
        textStyle = headlineStyles;
    } else if (type === 'title') {
        textStyle = titleStyles;
    } else if (type === 'subtitle') {
        textStyle = subtitleStyles;
    } else if (type === 'bodyRegular') {
        textStyle = bodyStyles.regular;
    } else if (type === 'bodyMedium') {
        textStyle = bodyStyles.medium;
    } else if (type === 'bodySemibold') {
        textStyle = bodyStyles.semibold;
    }
    if (!textStyle) {
        throw new Error('textStyle is required');
    }
    return (
        <Text style={[textStyle[size], style]} {...rest}>
            {children}
        </Text>
    );
}

const Headline = {
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="headline" size="large" {...props} />,
};

const Title = {
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="title" size="large" {...props} />,
    Medium: (props: CustomTextProps): React.ReactElement => <TextComp type="title" size="medium" {...props} />,
    Small: (props: CustomTextProps): React.ReactElement => <TextComp type="title" size="small" {...props} />,
};

const Subtitle = {
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="subtitle" size="large" {...props} />,
    Small: (props: CustomTextProps): React.ReactElement => <TextComp type="subtitle" size="small" {...props} />,
};

const BodyRegular = {
    XLarge: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyRegular" size="xLarge" {...props} />,
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyRegular" size="large" {...props} />,
    Medium: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyRegular" size="medium" {...props} />,
    Small: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyRegular" size="small" {...props} />,
    XSmall: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyRegular" size="xSmall" {...props} />,
};

const BodyMedium = {
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyMedium" size="large" {...props} />,
    Medium: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyMedium" size="medium" {...props} />,
    Small: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyMedium" size="small" {...props} />,
    XSmall: (props: CustomTextProps): React.ReactElement => <TextComp type="bodyMedium" size="xSmall" {...props} />,
};

const BodySemibold = {
    Large: (props: CustomTextProps): React.ReactElement => <TextComp type="bodySemibold" size="large" {...props} />,
    Medium: (props: CustomTextProps): React.ReactElement => <TextComp type="bodySemibold" size="medium" {...props} />,
    Small: (props: CustomTextProps): React.ReactElement => <TextComp type="bodySemibold" size="small" {...props} />,
    XSmall: (props: CustomTextProps): React.ReactElement => <TextComp type="bodySemibold" size="xSmall" {...props} />,
};

export { BodyMedium, BodyRegular, BodySemibold, Headline, Subtitle, Title };
