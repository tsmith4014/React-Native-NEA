import BackHeader from '@/infrastructure/theme/BackHeader';
import Button from '@/infrastructure/theme/Button';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { confirmResetPassword } from '@aws-amplify/auth';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const CreateNewPassword = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ newPassword: '', newPasswordConfirm: '' });
    const { currentUserStore, selectedRole, getCurrentUser } = useRootStore();
    const { username, newPassword, newPasswordConfirm, updateAuthForm, resetPasswordConfirmationCode } =
        currentUserStore!();
    const onValidate = useCallback(() => {
        if (newPassword && newPasswordConfirm) {
            const valid = String(newPassword)
                .toLowerCase()
                .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,100}$/);
            if (!valid) {
                setErrorMessage((state) => ({
                    ...state,
                    newPassword: 'Password requires minimum 8 characters, have one number and one special character.',
                }));
            } else if (valid && newPasswordConfirm !== newPassword) {
                setErrorMessage((state) => ({
                    ...state,
                    newPassword: 'Password do not match',
                    newPasswordConfirm: 'Password do not match',
                }));
            } else if (errorMessage.newPassword || errorMessage.newPasswordConfirm) {
                setErrorMessage((state) => ({
                    ...state,
                    newPassword: '',
                    newPasswordConfirm: '',
                }));
            }
        }
    }, [newPassword, newPasswordConfirm, errorMessage]);
    const Icon = showPassword ? Eye : EyeOff;
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <BackHeader />
                <View className="w-full mt-2 mb-10">
                    <Title.Small>Create new password</Title.Small>
                    <BodyMedium.Medium className="mt-4">
                        Your new password must be different from previously used password.
                    </BodyMedium.Medium>
                </View>
                <TextField
                    required
                    label="Password"
                    onChangeText={(value) => {
                        const newLength = value.length;
                        const previousText = newPassword.substring(0, newLength);
                        const newText = value.substring(newPassword.length);
                        if (!newText.includes('●')) {
                            updateAuthForm({ newPassword: previousText + newText });
                        }
                    }}
                    helperText={
                        errorMessage.newPassword
                            ? { type: HelperTextType.error, message: errorMessage.newPassword }
                            : {
                                  type: HelperTextType.normal,
                                  message: 'Minimum 8 characters, have one number and one special character.',
                              }
                    }
                    onBlur={onValidate}
                    value={
                        showPassword
                            ? newPassword
                            : newPassword
                                  .split('')
                                  .map(() => '●')
                                  .join('')
                    }
                    icon={
                        <Icon
                            onPress={() => setShowPassword(!showPassword)}
                            width={20}
                            height={20}
                            color={colors.ui.neutral.gray70}
                        />
                    }
                    className="mb-4"
                />
                <TextField
                    required
                    label="Password"
                    onChangeText={(value) => {
                        const newLength = value.length;
                        const previousText = newPasswordConfirm.substring(0, newLength);
                        const newText = value.substring(newPasswordConfirm.length);
                        if (!newText.includes('●')) {
                            updateAuthForm({ newPasswordConfirm: previousText + newText });
                        }
                    }}
                    helperText={
                        errorMessage.newPasswordConfirm
                            ? { type: HelperTextType.error, message: errorMessage.newPasswordConfirm }
                            : {
                                  type: HelperTextType.normal,
                                  message: 'Both password should match.',
                              }
                    }
                    onBlur={onValidate}
                    value={
                        showPassword
                            ? newPasswordConfirm
                            : newPasswordConfirm
                                  .split('')
                                  .map(() => '●')
                                  .join('')
                    }
                    className="mb-10"
                />
                <Button
                    label="Reset password"
                    disabled={!!(errorMessage.newPassword || errorMessage.newPasswordConfirm)}
                    onPress={async () => {
                        try {
                            await confirmResetPassword({
                                username,
                                confirmationCode: resetPasswordConfirmationCode,
                                newPassword,
                            });
                            router.navigate(`/${selectedRole}/sign-in`);
                            Toast.show({
                                type: 'success',
                                text1: 'Password successfully updated!',
                            });
                        } catch (error: any) {
                            router.back();
                            Toast.show({
                                type: 'error',
                                text1: error.message,
                            });
                        }
                    }}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default CreateNewPassword;
