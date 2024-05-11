import { Apple, Google, Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import TextField, { HelperTextType } from '@/infrastructure/theme/TextField';
import { BodyMedium, BodyRegular, Title } from '@/infrastructure/theme/fonts';
import shadow from '@/infrastructure/theme/shadow';
import useSurvivorStore from '@/store/survivor';
import { CountryItem } from '@/store/survivor/sign-up';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import countries from './countries';

const SignUp = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { country, email, password, username, updateSignupForm } = useSurvivorStore();
    const Icon = showPassword ? Eye : EyeOff;
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
                        onSelect={(item) => updateSignupForm({ country: item as CountryItem })}
                        selectedItem={country}
                        defaultSelectedItem={{ value: 'US', label: 'United States' } as CountryItem}
                    />
                </View>
                <TextField
                    required
                    label="Email"
                    onChangeText={(value) => updateSignupForm({ email: value })}
                    value={email}
                    className="mb-4"
                />
                <TextField
                    required
                    label="User name"
                    onChangeText={(value) => updateSignupForm({ username: value })}
                    value={username}
                    className="mb-4"
                />
                <TextField
                    required
                    label="Password"
                    onChangeText={(value) => updateSignupForm({ password: value })}
                    helperText={{
                        type: HelperTextType.normal,
                        message: 'Minimum 8 characters, have one number and one special character.',
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
                <Button label="Register" onPress={() => router.navigate('/survivor/verify-email')} />
                <View className="flex-row flex-wrap items-center justify-center mt-2">
                    <BodyRegular.Small className="mr-1">By registering, you agree to our</BodyRegular.Small>
                    <Button label="Terms & Conditions" variant="text" size="small" style={{ height: 'auto' }} />
                    <BodyRegular.Small className="mx-1">and</BodyRegular.Small>
                    <Button label="Privacy Policy" variant="text" size="small" style={{ height: 'auto' }} />
                </View>
                <View className="items-center mt-10">
                    <BodyMedium.Large>Or register using</BodyMedium.Large>
                    <View className="flex-row mt-4">
                        <Button className="mr-4" variant="secondary" IconSource={Apple} />
                        <Button variant="secondary" IconSource={Google} />
                    </View>
                </View>
                <View className="flex-row justify-center mt-10">
                    <BodyMedium.Medium className="mr-1">Already have an account?</BodyMedium.Medium>
                    <Button label="Login" variant="text" style={{ height: 'auto' }} />
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
