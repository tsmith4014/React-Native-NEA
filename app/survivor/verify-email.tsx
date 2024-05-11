import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import Switch from '@/infrastructure/theme/Switch';
import TextField from '@/infrastructure/theme/TextField';
import { BodyMedium, BodySemibold, Title } from '@/infrastructure/theme/fonts';
import useSurvivorStore from '@/store/survivor';
import { CountryItem } from '@/store/survivor/authentication';
import { set } from '@firebase/database';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import countries from './countries';

const verifyEmailCodeLength = 6;

const VerifyEmail = () => {
    const { colors } = useTheme();
    const refs = useRef<any>({});
    const { nextUrl } = useLocalSearchParams();
    const { email } = useSurvivorStore();
    const [faceId, setFaceId] = useState(true);
    const [codes, setCodes] = useState(Array.from(Array(verifyEmailCodeLength)));
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col">
                <View className="w-full my-10 px-4">
                    <Title.Small>Verify your email</Title.Small>
                    <BodyMedium.Medium className="mt-4">Please enter the 6 digit code sent to</BodyMedium.Medium>
                    <BodyMedium.Medium>{email}</BodyMedium.Medium>
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
                    onPress={() => {
                        if (nextUrl) {
                            return router.navigate(`/survivor${nextUrl}`);
                        }
                        return router.navigate('/survivor/home');
                    }}
                />
                <View className="flex-row justify-center mt-1">
                    <BodyMedium.Medium className="mr-1">Did not receive code yet?</BodyMedium.Medium>
                    <Button label="Resend code" variant="text" style={{ height: 'auto' }} />
                </View>
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
