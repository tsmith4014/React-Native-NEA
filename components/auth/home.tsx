import Button from '@/infrastructure/theme/Button';
import { Title } from '@/infrastructure/theme/fonts';
import useRootStore from '@/store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const { currentUserStore, switchRole } = useRootStore();
    const { handleSignOut } = currentUserStore!();
    return (
        <SafeAreaView className="h-full flex justify-between">
            <Title.Large>Home page</Title.Large>
            <Button
                label="Sign out"
                onPress={async () => {
                    await handleSignOut();
                    router.dismissAll();
                    switchRole(undefined);
                }}
            />
        </SafeAreaView>
    );
};

export default Home;
