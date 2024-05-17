import useRootStore from '@/store';
import { retry } from '@lifeomic/attempt';
import * as ExpoLocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const LocalAuthentication = () => {
    const { selectedRole, currentUserStore, setIsLocalAuthenticationEnabled, getCurrentUser } = useRootStore();
    const { handleSignOut } = currentUserStore!();
    const [signedOut, setSignedOut] = useState(false);
    useEffect(() => {
        (async () => {
            const user = await getCurrentUser();
            if (user) {
                const isLocalAuthenticationEnabled = await ExpoLocalAuthentication.isEnrolledAsync();
                setIsLocalAuthenticationEnabled(isLocalAuthenticationEnabled);
                if (isLocalAuthenticationEnabled) {
                    try {
                        await retry(
                            async ({ attemptsRemaining }) => {
                                const result = await ExpoLocalAuthentication.authenticateAsync({
                                    promptMessage: 'Please authenticate first',
                                });
                                if (!result.success) {
                                    await new Promise((resolve) => {
                                        Alert.alert(`You have ${attemptsRemaining} attempts remaining`, '', [
                                            { text: 'OK', onPress: () => resolve(null) },
                                        ]);
                                    });
                                    throw new Error('Authentication failed');
                                }
                                return result;
                            },
                            { maxAttempts: 3 },
                        );
                        router.navigate(`/${selectedRole}/home`);
                    } catch {
                        await handleSignOut();
                        router.navigate(`/${selectedRole}/sign-in`);
                    }
                } else if (!signedOut) {
                    await handleSignOut();
                    Alert.alert(
                        'FaceID is not enabled for the app',
                        'Please go to app settings and enable FaceID for faster login experience',
                        [
                            {
                                text: 'OK',
                                onPress: () => router.navigate(`/${selectedRole}/sign-in`),
                            },
                        ],
                    );
                    setSignedOut(true);
                }
            } else {
                router.navigate(`/${selectedRole}/features`);
            }
        })();
    }, [signedOut, currentUserStore, selectedRole, getCurrentUser, handleSignOut, setIsLocalAuthenticationEnabled]);

    return null;
};

export default LocalAuthentication;
