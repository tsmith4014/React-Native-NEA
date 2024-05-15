import BackHeader from '@/infrastructure/theme/BackHeader';
import Button from '@/infrastructure/theme/Button';
import TextField from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { HelpCircle } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const ResetPassword = () => {
    const { colors } = useTheme();
    const { currentUserStore, selectedRole } = useRootStore();
    const { email, updateAuthForm } = currentUserStore!();
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <BackHeader iconRight={<HelpCircle color={colors.ui.neutral.gray90} />} />
                <View className="w-full mt-2 mb-10">
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
                    onPress={() => router.navigate(`/${selectedRole}/verify-email?nextUrl=/create-new-password`)}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ResetPassword;
