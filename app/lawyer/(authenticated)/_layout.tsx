import useRootStore from '@/store';
import { AuthUser } from '@/store/global-amplify';
import { UserRole } from '@/store/types';
import { router, Stack, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const SignedInLayout = () => {
    const { getCurrentUser } = useRootStore();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    router.navigate(`/${UserRole.lawyer}/sign-in`);
                }
                if (!(currentUser as AuthUser)?.userAttributes?.['custom:legal_name']) {
                    router.navigate(`/${UserRole.lawyer}/legal-name`);
                }
            })();
        }, [getCurrentUser]),
    );

    return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }} />;
};

export default SignedInLayout;
