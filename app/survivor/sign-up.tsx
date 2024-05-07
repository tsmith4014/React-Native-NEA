import { Logo } from '@/assets/icons';
import Button from '@/infrastructure/theme/Button';
import { BodyMedium, Title } from '@/infrastructure/theme/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Carousel, Image, View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

const SignUp = () => {
    const { colors } = useTheme();
    return (
        <SafeAreaView className="h-full flex flex-col" style={{ backgroundColor: colors.brand.primary.springBG }}>
            <Logo />
        </SafeAreaView>
    );
};

export default SignUp;
