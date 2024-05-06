import { Error, Success, Warning } from '@/assets/icons';
import { BodyRegular, bodyStyles } from '@/infrastructure/theme/fonts';
import React, { useState } from 'react';
import { View, TextField as WixTextField, TextFieldProps as WixTextFieldProps } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

export enum HelperTextType {
    normal = 'normal',
    warning = 'warning',
    error = 'error',
    success = 'success',
}

const HelperTextIcons = {
    [HelperTextType.warning]: Warning,
    [HelperTextType.error]: Error,
    [HelperTextType.success]: Success,
};

export type HelperText = { type: HelperTextType; message: string; iconType?: keyof typeof HelperTextIcons };

type TextfieldProps = WixTextFieldProps & {
    disabled?: boolean;
    label: string;
    helperText?: string | HelperText;
    icon?: React.ReactElement;
    readOnly?: boolean;
    value?: string;
};

const TextField = ({
    disabled,
    label,
    helperText: helperTextInput,
    icon,
    readOnly,
    value = '',
    className,
    style,
    ...props
}: TextfieldProps) => {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);
    const editable = !disabled;
    let helperText: HelperText | undefined;
    if (helperTextInput && typeof helperTextInput === 'string') {
        helperText = { type: HelperTextType.normal, message: helperTextInput as string };
    } else {
        helperText = helperTextInput as HelperText;
    }
    const HelperTextIcon = helperText?.iconType ? HelperTextIcons[helperText.iconType] : undefined;
    const statusColor = helperText
        ? helperText.type !== 'normal'
            ? colors.ui.supporting[helperText.type]
            : undefined
        : undefined;
    const isFloating = focused || value.length;
    let numberOfIcons = 0;
    if (icon) {
        numberOfIcons += 1;
    }
    if (HelperTextIcon) {
        numberOfIcons += 1;
    }
    return (
        <View style={style} className={className}>
            <View
                className="w-full"
                style={{
                    borderStyle: 'solid',
                    borderColor: statusColor ?? (focused ? colors.brand.primary.spring50 : 'transparent'),
                    borderWidth: 1,
                    borderRadius: 5,
                }}
            >
                <WixTextField
                    {...props}
                    placeholder={label}
                    floatOnFocus
                    editable={editable}
                    placeholderTextColor={colors.ui.neutral.gray80}
                    floatingPlaceholder
                    floatingPlaceholderColor={colors.ui.neutral.gray80}
                    floatingPlaceholderStyle={isFloating ? bodyStyles.medium.xSmall : bodyStyles.medium.medium}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    containerStyle={{
                        borderStyle: 'solid',
                        borderColor:
                            statusColor ?? (focused ? colors.brand.primary.spring50 : colors.ui.neutral.gray20),
                        borderWidth: 1,
                        backgroundColor: editable ? colors.ui.neutral.white : colors.ui.neutral.gray10,
                        width: '100%',
                        height: 56,
                        paddingHorizontal: 16,
                        borderRadius: 4,
                        position: 'relative',
                    }}
                    style={{
                        height: 22,
                        marginRight: numberOfIcons * 28,
                        ...bodyStyles.medium.medium,
                    }}
                    fieldStyle={{
                        position: 'relative',
                        top: isFloating ? 2 : -4,
                        left: 0,
                        right: 0,
                    }}
                    labelStyle={{
                        height: 0,
                    }}
                    color={editable || readOnly ? colors.ui.neutral.gray90 : colors.ui.neutral.gray70}
                    validateOnBlur
                    showCharCounter={false}
                    value={value}
                    trailingAccessory={
                        numberOfIcons > 0 && (
                            <View
                                style={{ top: isFloating ? -22 : -16 }}
                                className="absolute h-[54px] right-0 bottom-0 z-[2] bg-white"
                            >
                                <View className="flex h-full flex-row gap-x-2 pl-2 items-center">
                                    {HelperTextIcon && <HelperTextIcon />}
                                    {icon}
                                </View>
                            </View>
                        )
                    }
                />
            </View>
            {helperText && (
                <BodyRegular.XSmall className="mt-1" style={{ color: statusColor ?? colors.ui.neutral.gray90 }}>
                    {helperText.message}
                </BodyRegular.XSmall>
            )}
        </View>
    );
};

export default TextField;
