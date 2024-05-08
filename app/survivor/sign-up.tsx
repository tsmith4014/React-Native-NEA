import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import SelectField from '@/infrastructure/theme/SelectField';
import TextField from '@/infrastructure/theme/TextField';
import { Title } from '@/infrastructure/theme/fonts';
import useSurvivorStore from '@/store/survivor';
import { CountryItem } from '@/store/survivor/sign-up';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import countries from './countries';

const SignUp = () => {
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { country, email, password, username, updateSignupForm } = useSurvivorStore();
    const Icon = showPassword ? Eye : EyeOff;
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <View className="relative h-full flex flex-col p-4">
                <View className="flex flex-row items-center w-full mb-10">
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
                <Button label="Register" />
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
