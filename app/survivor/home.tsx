import { Title } from '@/infrastructure/theme/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

const Home = () => {
    const { colors } = useTheme();
    return (
        <SafeAreaView className="h-full flex justify-between">
            <Title.Large>Home page</Title.Large>
        </SafeAreaView>
    );
};

export default Home;
