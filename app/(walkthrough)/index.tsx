import SecondSplash from '@/assets/images/splash.png';
import { FadeInView } from '@/components/animations/fade.animation';
import { SplashAnimation } from '@/components/animations/splash.animation';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ImageBackground, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const SplashContainer = styled(Animated.View)`
    flex: 1;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.ui.neutral.white};
`;

const SplashImage = styled(ImageBackground)`
    flex: 1;
    justify-content: center;
`;

const Walkthrough = () => {
    useEffect(() => {
        setTimeout(() => {
            router.navigate('/select-role');
        }, 2000);
    }, []);
    return (
        <>
            <SplashContainer>
                <SplashImage source={SecondSplash}>
                    <FadeInView>
                        <Text className="text-base text-center font-medium mb-32 text-gray90">
                            For People of All Genders
                        </Text>
                    </FadeInView>
                </SplashImage>
            </SplashContainer>
            <SplashAnimation />
        </>
    );
};

export default Walkthrough;
