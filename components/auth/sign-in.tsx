import { Apple, Google, Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import TextField from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import shadow from '@/infrastructure/theme/shadow';
import useRootStore from '@/store';
import { SignInOutput } from 'aws-amplify/auth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const SignIn = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { currentUserStore, selectedRole, redirectIfSignedIn, startLoading, stopLoading } = useRootStore();
    const { username, password, updateAuthForm, handleSignIn } = currentUserStore!();
    const Icon = showPassword ? Eye : EyeOff;
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <View className="flex flex-row items-center w-full mb-10 mt-10">
                    <Logo />
                    <Title.Small className="ml-4">Login to your account</Title.Small>
                </View>
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
                    label="Login"
                    onPress={async () => {
                        startLoading();
                        try {
                            const { isSignedIn, nextStep } = (await handleSignIn()) as SignInOutput;
                            if (isSignedIn) {
                                return router.navigate(`/${selectedRole}/home`);
                            }
                            // @ts-ignore
                            if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
                                return router.navigate(`/${selectedRole}/verify-email`);
                            }
                            throw new Error('Sorry! something went wrong! Please try again');
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
                    <Button
                        label="Forgot password?"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate(`/${selectedRole}/reset-password`)}
                    />
                </View>
                <View className="items-center mt-10">
                    <BodyMedium.Large>Or login using</BodyMedium.Large>
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
                    <BodyMedium.Medium className="mr-1">Don't have an account?</BodyMedium.Medium>
                    <Button
                        label="Register"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate(`/${selectedRole}/sign-up`)}
                    />
                </View>
                <View className="flex-row justify-center mt-10">
                    <BodyMedium.Medium>
                        Are you in distress? Press "SOS" button below to make a phone call to emergency services.
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

export default SignIn;
