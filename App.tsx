import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { FadeInView } from './src/components/animations/fade.animation';
import { SplashAnimation } from './src/components/animations/splash.animation';
import {
    PreemptNavigator,
    SessionNavigator,
} from './src/infrastructure/navigation/preempt.navigator';

const SecondSplash = require('./assets/splash.png');

const SplashContainer = styled(View)`
    flex: 1;
    flex-direction: column;
`;

const SplashImage = styled(ImageBackground)`
    flex: 1;
    justify-content: center;
`;

const SplashText = styled(Text)`
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.medium};
    font-size: 16px;
    line-height: 160%;
    letter-spacing: -1%;
    color: ${(props) => props.theme.colors.ui.neutral.gray90};
    text-align: center;
    margin-bottom: 120px;
`;

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    const [montserratLoaded] = useFonts({
        Montserrat: Montserrat_400Regular,
        MontserratMedium: Montserrat_500Medium,
        MontserratSemiBold: Montserrat_600SemiBold,
        MontserratBold: Montserrat_700Bold,
    });

    if (!montserratLoaded) {
        return null;
    }

    return isLoading ? (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    ) : (
        <>
            <ThemeProvider theme={theme}>
                <AuthenticationContextProvider>
                    <NavigationContainer>
                        {!userRole ? (
                            <PreemptNavigator
                                onUserSelect={(role) => setUserRole(role)}
                            />
                        ) : (
                            <SessionNavigator userRole={userRole} />
                        )}
                    </NavigationContainer>
                </AuthenticationContextProvider>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </>
    );
}

// export default function App() {
//     return <SplashAnimation />;
// }
