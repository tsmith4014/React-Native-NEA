import { Apple, Google, Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, BodyRegular, Title } from '@/infrastructure/theme/fonts';
import shadow from '@/infrastructure/theme/shadow';
import useRootStore from '@/store';
import { CountryItem } from '@/store/survivor/authentication';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import countries from './countries';

const SignUp = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });
    const { currentUserStore, selectedRole, redirectIfSignedIn, startLoading, stopLoading } = useRootStore();
    const { country, email, password, username, updateAuthForm, handleSignup, handleSignIn } = currentUserStore!();
    const isDisabled = !(email && username && password);
    const Icon = showPassword ? Eye : EyeOff;

    const validatePassword = useCallback(() => {
        if (password) {
            const valid = String(password)
                .toLowerCase()
                .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,100}$/);
            setErrorMessage((state) => ({
                ...state,
                password: !valid
                    ? 'Password requires minimum 8 characters, have one number and one special character.'
                    : '',
            }));
            return valid;
        }
        return true;
    }, [password, setErrorMessage]);
    const validateEmail = useCallback(() => {
        if (email) {
            const valid = String(email)
                .toLowerCase()
                .match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
            setErrorMessage((state) => ({
                ...state,
                email: !valid ? 'Email address is not valid' : '',
            }));
            return valid;
        }
        return true;
    }, [email, setErrorMessage]);

    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <View className="flex flex-row items-center w-full mb-10 mt-10">
                    <Logo />
                    <Title.Small className="ml-4">Let's get you started</Title.Small>
                </View>
                <View className="w-full mb-4">
                    <SelectField
                        required
                        label="Country"
                        items={countries}
                        onSelect={(item) => updateAuthForm({ country: item as CountryItem })}
                        selectedItem={country}
                        defaultSelectedItem={{ value: 'US', label: 'United States' } as CountryItem}
                    />
                </View>
                <TextField
                    required
                    label="Email"
                    onChangeText={(value) => updateAuthForm({ email: value })}
                    value={email}
                    className="mb-4"
                    helperText={
                        errorMessage.email
                            ? {
                                  type: HelperTextType.error,
                                  message: errorMessage.email,
                              }
                            : undefined
                    }
                    onBlur={validateEmail}
                />
                <TextField
                    required
                    label="User name"
                    onChangeText={(value) => updateAuthForm({ username: value })}
                    value={username}
                    className="mb-4"
                />
                <TextField
                    required
                    label="Password"
                    onChangeText={(value) => {
                        const newLength = value.length;
                        const previousText = password.substring(0, newLength);
                        const newText = value.substring(password.length);
                        if (!newText.includes('●')) {
                            updateAuthForm({ password: previousText + newText });
                        }
                    }}
                    helperText={
                        errorMessage.password
                            ? {
                                  type: HelperTextType.error,
                                  message: errorMessage.password,
                              }
                            : {
                                  type: HelperTextType.normal,
                                  message: 'Minimum 8 characters, have one number and one special character.',
                              }
                    }
                    onBlur={validatePassword}
                    value={
                        showPassword
                            ? password
                            : password
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
                    className="mb-10"
                />
                <Button
                    label="Register"
                    disabled={isDisabled}
                    onPress={async () => {
                        startLoading();
                        try {
                            if (!validateEmail() || !validatePassword()) {
                                return;
                            }
                            const response = await handleSignup();
                            if (response) {
                                if (!response.isSignUpComplete && response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                                    return router.navigate(`/${selectedRole}/verify-email`);
                                } else if (response.isSignUpComplete) {
                                    await handleSignIn();
                                    return await redirectIfSignedIn();
                                }
                                throw new Error('Signup Error!!');
                            }
                        } catch (error: any) {
                            console.error(error);
                            Toast.show({
                                type: 'error',
                                text1: error.message,
                            });
                        } finally {
                            stopLoading();
                        }
                    }}
                />
                <View className="flex-row flex-wrap items-center justify-center mt-2">
                    <BodyRegular.Small className="mr-1">By registering, you agree to our</BodyRegular.Small>
                    <Button label="Terms & Conditions" variant="text" size="small" style={{ height: 'auto' }} />
                    <BodyRegular.Small className="mx-1">and</BodyRegular.Small>
                    <Button label="Privacy Policy" variant="text" size="small" style={{ height: 'auto' }} />
                </View>
                <View className="items-center mt-10">
                    <BodyMedium.Large>Or register using</BodyMedium.Large>
                    <View className="flex-row mt-4">
                        <Button
                            className="mr-4"
                            variant="secondary"
                            IconSource={Apple}
                            onPress={async () => {
                                try {
                                    await handleSignIn('Apple');
                                } catch (e) {
                                    console.error(e);
                                }
                                await redirectIfSignedIn();
                            }}
                        />
                        <Button
                            variant="secondary"
                            IconSource={Google}
                            onPress={async () => {
                                try {
                                    await handleSignIn('Google');
                                } catch (e) {
                                    console.error(e);
                                }
                                await redirectIfSignedIn();
                            }}
                        />
                    </View>
                </View>
                <View className="flex-row justify-center mt-10">
                    <BodyMedium.Medium className="mr-1">Already have an account?</BodyMedium.Medium>
                    <Button
                        label="Login"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate(`/${selectedRole}/sign-in`)}
                    />
                </View>
                <View className="flex-row justify-center mt-10">
                    <BodyMedium.Medium>
                        Do you need immediate help? Press "SOS" button below to make a phone call to emergency services.
                    </BodyMedium.Medium>
                </View>
                <View className="flex-row justify-center mt-4 mb-10">
                    <Button
                        label="SOS"
                        variant="primary"
                        backgroundColor={colors.ui.supporting.error}
                        activeBackgroundColor="#e73700"
                        color={colors.ui.neutral.white}
                        style={[
                            {
                                borderColor: colors.ui.supporting.error,
                                width: 72,
                                height: 72,
                                minWidth: 72,
                                borderRadius: 100,
                            },
                            shadow.elevation4,
                        ]}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
