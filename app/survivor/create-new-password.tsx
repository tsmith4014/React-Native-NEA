import BackHeader from '@/infrastructure/theme/BackHeader';
import Button from '@/infrastructure/theme/Button';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import useSurvivorStore from '@/store/survivor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const CreateNewPassword = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { newPassword, newPasswordConfirm, updateAuthForm } = useSurvivorStore();
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
                    onChangeText={(value) => updateAuthForm({ newPassword: value })}
                    helperText={{
                        type: HelperTextType.normal,
                        message: 'Minimum 8 characters, have one number and one special character.',
                    }}
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
                    onChangeText={(value) => updateAuthForm({ newPasswordConfirm: value })}
                    helperText={{
                        type: HelperTextType.normal,
                        message: 'Both password should match.',
                    }}
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
                    onPress={() => {
                        router.navigate('/survivor/home');
                    }}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default CreateNewPassword;
