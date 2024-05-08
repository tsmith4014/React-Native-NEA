import { Error, Success, Warning } from '@/assets/icons';
import { BodyRegular, bodyStyles } from '@/infrastructure/theme/fonts';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { Text, View, TextField as WixTextField, TextFieldProps as WixTextFieldProps } from 'react-native-ui-lib';
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

type TextfieldProps = Omit<WixTextFieldProps, 'key'> & {
    disabled?: boolean;
    label?: string;
    helperText?: string | HelperText;
    icon?: React.ReactElement;
    readOnly?: boolean;
    value?: string;
    outline?: boolean;
    required?: boolean;
    key?: string;
    forceFocus?: boolean;
    getRef?: (ref: any) => void;
    onFocus?: (value: boolean) => void;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
};

const TextField = ({
    disabled,
    label,
    helperText: helperTextInput,
    icon,
    readOnly,
    value = '',
    required = false,
    className,
    style,
    outline = true,
    containerStyle,
    fieldStyle,
    onFocus,
    key,
    forceFocus,
    inputStyle,
    getRef,
    ...props
}: TextfieldProps) => {
    const ref = useRef<any>(null);
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
    const focusedState = forceFocus ?? focused;
    const isFloating = focused || value.length;
    let numberOfIcons = 0;
    if (icon) {
        numberOfIcons += 1;
    }
    if (HelperTextIcon) {
        numberOfIcons += 1;
    }
    return (
        <View key={key} style={style} className={className}>
            <View
                className="w-full"
                style={
                    outline
                        ? {
                              borderStyle: 'solid',
                              borderColor:
                                  statusColor ?? (focusedState ? colors.brand.primary.spring50 : 'transparent'),
                              borderWidth: 1,
                              borderRadius: 5,
                          }
                        : {}
                }
            >
                {/*@ts-ignore*/}
                <WixTextField
                    {...props}
                    ref={(el: any) => {
                        ref.current = el;
                        if (getRef) {
                            getRef(el);
                        }
                    }}
                    readOnly={readOnly}
                    placeholder={label}
                    leadingAccessory={
                        required && (
                            <View
                                className={clsx('absolute', {
                                    '-top-[14px] -left-[10px]': isFloating,
                                    '-left-[6px]': !isFloating,
                                })}
                            >
                                <Text
                                    style={[
                                        { color: colors.text.error },
                                        isFloating
                                            ? [bodyStyles.medium.xSmall, { paddingLeft: 6 }]
                                            : bodyStyles.medium.medium,
                                    ]}
                                >
                                    *
                                </Text>
                            </View>
                        )
                    }
                    floatOnFocus
                    editable={editable}
                    placeholderTextColor={colors.ui.neutral.gray80}
                    floatingPlaceholder
                    floatingPlaceholderColor={colors.ui.neutral.gray80}
                    floatingPlaceholderStyle={
                        isFloating ? [bodyStyles.medium.xSmall, { paddingLeft: 12 }] : bodyStyles.medium.medium
                    }
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    onFocus={() => {
                        setFocused(true);
                        onFocus && onFocus(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onFocus && onFocus(false);
                    }}
                    containerStyle={[
                        {
                            borderStyle: 'solid',
                            borderColor:
                                statusColor ??
                                (focusedState ? colors.brand.primary.spring50 : colors.ui.neutral.gray20),
                            borderWidth: 1,
                            backgroundColor: editable ? colors.ui.neutral.white : colors.ui.neutral.gray10,
                            width: '100%',
                            height: 56,
                            paddingHorizontal: 16,
                            borderRadius: 4,
                            position: 'relative',
                        },
                        containerStyle,
                    ]}
                    containerProps={{
                        onTouchStart: () => {
                            // @ts-ignore
                            if (!ref?.current?.isFocused()) {
                                // @ts-ignore
                                ref?.current?.focus();
                            }
                        },
                    }}
                    style={{
                        height: 22,
                        marginTop: -2,
                        marginRight: numberOfIcons * 28,
                        ...bodyStyles.medium.medium,
                        ...inputStyle,
                    }}
                    fieldStyle={[
                        {
                            position: 'relative',
                            top: isFloating ? 2 : -4,
                            left: 0,
                            right: 0,
                        },
                        fieldStyle,
                    ]}
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
