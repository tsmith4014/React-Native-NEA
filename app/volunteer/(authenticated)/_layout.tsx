import useRootStore from '@/store';
import { Href, Redirect, Stack } from 'expo-router';

const SignedInLayout = () => {
    const { getCurrentUser, selectedRole } = useRootStore();
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return <Redirect href={`/${selectedRole}/sign-in` as Href<string>} />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Stack />;
};

export default SignedInLayout;
