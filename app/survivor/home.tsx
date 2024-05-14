import { Title } from '@/infrastructure/theme/fonts';
import { getCurrentUser } from 'aws-amplify/auth';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

const Home = () => {
    const { colors } = useTheme();
    useEffect(() => {
        (async () => {
            console.log(await getCurrentUser());
        })();
    }, []);
    return (
        <SafeAreaView className="h-full flex justify-between">
            <Title.Large>Home page</Title.Large>
        </SafeAreaView>
    );
};

export default Home;
