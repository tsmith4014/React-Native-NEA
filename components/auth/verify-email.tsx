import BackHeader from '@/infrastructure/theme/BackHeader';
import Button from '@/infrastructure/theme/Button';
import Switch from '@/infrastructure/theme/Switch';
import TextField from '@/infrastructure/theme/TextField';
import { BodyMedium, BodySemibold, Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { resetPassword } from 'aws-amplify/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const verifyEmailCodeLength = 6;

const VerifyEmail = () => {
    const { colors } = useTheme();
    const refs = useRef<any>({});
    const { nextUrl } = useLocalSearchParams();
    const { currentUserStore, selectedRole, isLocalAuthenticationEnabled, setIsLocalAuthenticationEnabled } =
        useRootStore();
    const { username, handleSignUpConfirmation, handleSignIn, updateAuthForm } = currentUserStore!();
    const [faceId, setFaceId] = useState(true);
    const [codes, setCodes] = useState(Array.from(Array(verifyEmailCodeLength)));
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col">
                <BackHeader className="px-4" />
                <View className="w-full mt-2 mb-10 px-4">
                    <Title.Small>Verify your email</Title.Small>
                    <BodyMedium.Medium className="mt-4">
                        Please enter the 6 digit code sent to registered email for
                    </BodyMedium.Medium>
                    <BodySemibold.Medium>{username}</BodySemibold.Medium>
                </View>
                <View className="w-full flex flex-row justify-evenly px-2 mb-10">
                    {codes.map((code, index) => (
                        <TextField
                            getRef={(el: any) => (refs.current[index] = el)}
                            className="flex-1 px-2"
                            key={`code-letter-${index}`}
                            inputStyle={{
                                marginTop: -6,
                            }}
                            onChangeText={(value) => {
                                if (!value) return;
                                value.split('').forEach((newCode, i) => {
                                    if (index + i < verifyEmailCodeLength) {
                                        codes[index + i] = newCode;
                                    }
                                });
                                refs.current[value.length + index]?.focus();
                                setCodes([...codes]);
                            }}
                            onKeyPress={(event) => {
                                if (event.nativeEvent.key === 'Backspace') {
                                    codes[index] = '';
                                    setCodes([...codes]);
                                    refs.current[index - 1]?.focus();
                                } else if (event.nativeEvent.key !== 'Backspace') {
                                    refs.current[index + 1]?.focus();
                                }
                            }}
                            value={code}
                        />
                    ))}
                </View>
                <Button
                    className="mx-4"
                    label="Verify"
                    onPress={async () => {
                        const confirmationCode = codes.join('');
                        // undefined or null
                        if (isLocalAuthenticationEnabled == undefined) {
                            const check = await LocalAuthentication.isEnrolledAsync();
                            setIsLocalAuthenticationEnabled(check);
                        }
                        if (!nextUrl) {
                            const confirmationResponse = await handleSignUpConfirmation({
                                confirmationCode,
                            });
                            if (confirmationResponse?.isSignUpComplete) {
                                const signInResponse = await handleSignIn();
                                if (signInResponse?.isSignedIn) {
                                    return router.navigate(`/${selectedRole}/home`);
                                }
                            }
                        } else if (nextUrl === '/create-new-password') {
                            updateAuthForm({ resetPasswordConfirmationCode: confirmationCode });
                            return router.navigate(`/${selectedRole}/create-new-password`);
                        }
                    }}
                />
                {nextUrl && (
                    <View className="flex-row justify-center mt-1">
                        <BodyMedium.Medium className="mr-1">Did not receive code yet?</BodyMedium.Medium>
                        <Button
                            label="Resend code"
                            onPress={async () => {
                                if (nextUrl === '/create-new-password') {
                                    const { nextStep } = await resetPassword({ username });
                                    if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
                                        Toast.show({
                                            type: 'info',
                                            text1: `Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`,
                                        });
                                    }
                                }
                            }}
                            variant="text"
                            style={{ height: 'auto' }}
                        />
                    </View>
                )}
                {!nextUrl && (
                    <>
                        <View className="mt-10 px-4 bg-white flex flex-row items-center justify-between h-[62px]">
                            <BodySemibold.Medium>Enable Touch ID app lock</BodySemibold.Medium>
                            <Switch value={faceId} onValueChange={(value) => setFaceId(value)} />
                        </View>
                        <BodyMedium.XSmall className="mx-4 mt-1" style={{ color: colors.ui.neutral.gray70 }}>
                            When enabled, you will need to use Face ID to unlock app. You can change this anytime
                            through app settings.
                        </BodyMedium.XSmall>
                    </>
                )}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default VerifyEmail;
