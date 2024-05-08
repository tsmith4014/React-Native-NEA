import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import Switch from '@/infrastructure/theme/Switch';
import TextField from '@/infrastructure/theme/TextField';
import { BodySemibold, Title } from '@/infrastructure/theme/fonts';
import useSurvivorStore from '@/store/survivor';
import { CountryItem } from '@/store/survivor/sign-up';
import { set } from '@firebase/database';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import countries from './countries';

const verifyEmailCodeLength = 6;

const VerifyEmail = () => {
    const { colors } = useTheme();
    const refs = useRef<any>({});
    const [faceId, setFaceId] = useState(true);
    const [codes, setCodes] = useState(Array.from(Array(verifyEmailCodeLength)));
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <View className="relative h-full flex flex-col">
                <View className="flex flex-row items-center w-full mb-10 p-4">
                    <Title.Small>Verify your email</Title.Small>
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
                <Button label="Verify" onPress={() => router.navigate('/survivor/home')} />
                <View className="mt-10 px-4 bg-white flex flex-row items-center justify-between h-[62px]">
                    <BodySemibold.Medium>Enable Touch ID app lock</BodySemibold.Medium>
                    <Switch value={faceId} onValueChange={(value) => setFaceId(value)} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VerifyEmail;
