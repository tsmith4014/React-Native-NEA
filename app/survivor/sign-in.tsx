import { Apple, Google, Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import shadow from '@/infrastructure/theme/shadow';
import useSurvivorStore from '@/store/survivor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const SignIn = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { email, password, updateAuthForm } = useSurvivorStore();
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
                    label="Email"
                    onChangeText={(value) => updateAuthForm({ email: value })}
                    value={email}
                    className="mb-4"
                />
                <TextField
                    required
                    label="Password"
                    onChangeText={(value) => updateAuthForm({ password: value })}
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
                    onPress={() => {
                        return;
                    }}
                />
                <View className="flex-row flex-wrap items-center justify-center mt-2">
                    <Button
                        label="Forgot password?"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate('/survivor/reset-password')}
                    />
                </View>
                <View className="items-center mt-10">
                    <BodyMedium.Large>Or login using</BodyMedium.Large>
                    <View className="flex-row mt-4">
                        <Button className="mr-4" variant="secondary" IconSource={Apple} />
                        <Button variant="secondary" IconSource={Google} />
                    </View>
                </View>
                <View className="flex-row justify-center mt-10">
                    <BodyMedium.Medium className="mr-1">Don't have an account?</BodyMedium.Medium>
                    <Button
                        label="Register"
                        variant="text"
                        style={{ height: 'auto' }}
                        onPress={() => router.navigate('/survivor/sign-up')}
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
