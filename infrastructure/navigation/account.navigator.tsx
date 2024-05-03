import React from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

// import { AccountScreen } from '../../features/account/screens/account.screen';
// import { LoginScreen } from '../../features/account/screens/login.screen';
// import { RegisterScreen } from '../../features/account/screens/register.screen';

const Stack = createStackNavigator();

export const AccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Main"
                component={() => (
                    <View>
                        <Text>Main</Text>
                    </View>
                )}
            />
        </Stack.Navigator>
    );
};
