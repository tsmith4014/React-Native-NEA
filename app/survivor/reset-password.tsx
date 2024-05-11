import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import TextField from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import useSurvivorStore from '@/store/survivor';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const ResetPassword = () => {
    const { colors } = useTheme();
    const { email, updateAuthForm } = useSurvivorStore();
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <View className="w-full my-10 px-4">
                    <Title.Small>Reset password</Title.Small>
                    <BodyMedium.Medium className="mt-4">
                        Don’t worry it happens. Please enter the email associated with your NEA account to receive a
                        verification code.
                    </BodyMedium.Medium>
                </View>
                <TextField
                    required
                    label="Email"
                    onChangeText={(value) => updateAuthForm({ email: value })}
                    value={email}
                    className="mb-10"
                />
                <Button
                    label="Send code"
                    onPress={() => router.navigate('/survivor/verify-email?nextUrl=/create-new-password')}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;
