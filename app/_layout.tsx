import Loading from '@/components/Loading';
import { theme } from '@/infrastructure/theme';
import {
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    useFonts,
} from '@expo-google-fonts/montserrat';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components/native';

// https://docs.expo.dev/router/error-handling/#errorboundary
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'walkthrough',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => {
    const colorScheme = useColorScheme();
    return (
        <ClickOutsideProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider theme={colorScheme === 'dark' ? theme : theme}>
                    <SafeAreaProvider>
                        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }} />
                        <Toast position="bottom" bottomOffset={20} />
                        <Loading />
                    </SafeAreaProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </ClickOutsideProvider>
    );
};

const RootLayout = () => {
    const [loaded, error] = useFonts({
        Montserrat: Montserrat_400Regular,
        MontserratMedium: Montserrat_500Medium,
        MontserratSemiBold: Montserrat_600SemiBold,
        MontserratBold: Montserrat_700Bold,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
};

export default RootLayout;
