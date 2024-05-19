import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import TextField from '@/infrastructure/theme/TextField';
import { Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const LegalName = () => {
    const { colors } = useTheme();
    const { lawyer: lawyerStore, startLoading, stopLoading } = useRootStore();
    const [legalName, setLegalName] = useState('');
    const { updateAuthForm, handleUpdateUserAttributes } = lawyerStore();

    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <KeyboardAwareScrollView className="relative h-full flex flex-col px-4">
                <View className="flex flex-row items-center w-full mb-10 mt-10">
                    <Logo />
                    <Title.Small className="ml-4">Please provide your legal name to proceed</Title.Small>
                </View>
                <TextField
                    required
                    label="Legal Name"
                    onChangeText={(value) => setLegalName(value)}
                    value={legalName}
                    className="mb-4"
                />
                <Button
                    label="Save"
                    onPress={async () => {
                        startLoading();
                        try {
                            await handleUpdateUserAttributes({
                                'custom:legal_name': legalName,
                            });
                            updateAuthForm({ legalName });
                            router.back();
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default LegalName;
