import useRootStore from '@/store';
import * as ExpoLocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const LocalAuthentication = () => {
    const { selectedRole, currentUserStore, setIsLocalAuthenticationEnabled, getCurrentUser } = useRootStore();
    const { handleSignOut } = currentUserStore!();
    useEffect(() => {
        (async () => {
            const user = await getCurrentUser();
            if (user) {
                const isLocalAuthenticationEnabled = await ExpoLocalAuthentication.isEnrolledAsync();
                setIsLocalAuthenticationEnabled(isLocalAuthenticationEnabled);
                if (isLocalAuthenticationEnabled) {
                    const result = await ExpoLocalAuthentication.authenticateAsync({
                        promptMessage: 'Please authenticate first',
                    });
                    if (result.success) {
                        router.navigate(`/${selectedRole}/home`);
                    }
                } else {
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
                }
            } else {
                router.navigate(`/${selectedRole}/features`);
            }
        })();
    }, [currentUserStore, selectedRole, getCurrentUser, handleSignOut, setIsLocalAuthenticationEnabled]);

    return null;
};

export default LocalAuthentication;
