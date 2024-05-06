import { BodyRegular, bodyStyles } from '@/infrastructure/theme/fonts';
import { useState } from 'react';
import { View, TextField as WixTextField, TextFieldProps as WixTextFieldProps } from 'react-native-ui-lib';
import { ValidationMessagePosition } from 'react-native-ui-lib/src/components/textField/types';
import { useTheme } from 'styled-components/native';

type TextfieldProps = WixTextFieldProps & {
    disabled?: boolean;
    label: string;
    helperText?: string;
    readOnly?: boolean;
    value?: string;
};

const TextField = ({ disabled, label, helperText, readOnly, value = '', ...props }: TextfieldProps) => {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);
    const editable = !disabled;

    return (
        <View
            className="w-[300px]"
            style={{
                borderStyle: 'solid',
                borderColor: focused ? colors.brand.primary.spring50 : 'transparent',
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
                floatingPlaceholderStyle={focused || value.length ? bodyStyles.medium.xSmall : bodyStyles.medium.medium}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                containerStyle={{
                    borderStyle: 'solid',
                    borderColor: focused ? colors.brand.primary.spring50 : colors.ui.neutral.gray20,
                    borderWidth: 1,
                    backgroundColor: editable ? colors.ui.neutral.white : colors.ui.neutral.gray10,
                    width: '100%',
                    height: 56,
                    paddingHorizontal: 16,
                    borderRadius: 4,
                    position: 'relative',
                }}
                fieldStyle={{
                    height: 22,
                    position: 'absolute',
                    top: focused || value.length ? 22 : 16,
                    left: 0,
                    right: 0,
                    paddingHorizontal: 16,
                }}
                labelStyle={{
                    height: 0,
                }}
                color={editable || readOnly ? colors.ui.neutral.gray90 : colors.ui.neutral.gray70}
                enableErrors
                validate={['required', 'email', (value: any) => value.length > 6]}
                validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                validationMessagePosition={ValidationMessagePosition.TOP}
                showCharCounter={false}
                value={value}
            />
            {helperText && <BodyRegular.XSmall className="mt-1">{helperText}</BodyRegular.XSmall>}
        </View>
    );
};

export default TextField;
