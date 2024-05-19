import useRootStore from '@/store';
import { Href, Redirect, Stack } from 'expo-router';

const SignedInLayout = () => {
    const { getCurrentUser, selectedRole } = useRootStore();
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return <Redirect href={`/${selectedRole}/sign-in` as Href<string>} />;
    }

    return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }} />;
};

export default SignedInLayout;
