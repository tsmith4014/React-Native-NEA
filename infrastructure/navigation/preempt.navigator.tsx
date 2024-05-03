import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { SafeArea } from '../../components/utility/safe-area.component';

import { createStackNavigator } from '@react-navigation/stack';
import WalkthroughScreen from '../../screens/walkthrough/walkthrough.screen';
import { SurvivorNavigator } from './survivor.navigator';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

const Stack = createStackNavigator();

export const SessionNavigator = ({ userRole }: { userRole: string }) => {
    let authenticatedUserScreen = <Text>AuthenticatedScreen</Text>;
    const { isAuthenticated } = useContext(AuthenticationContext);
    if (isAuthenticated) {
        if (userRole === 'survivor') {
            authenticatedUserScreen = (
                <Stack.Screen name="Survivor" component={SurvivorNavigator} />
            );
        } else if (userRole === 'volunteer') {
            authenticatedUserScreen = (
                <Stack.Screen
                    name="Volunteer"
                    component={() => (
                        <View>
                            <Text>Volunteer</Text>
                        </View>
                    )}
                />
            );
        } else if (userRole === 'lawyer') {
            authenticatedUserScreen = (
                <Stack.Screen
                    name="Lawyer"
                    component={() => (
                        <View>
                            <Text>Lawyer</Text>
                        </View>
                    )}
                />
            );
        } else if (userRole === 'therapist') {
            authenticatedUserScreen = (
                <Stack.Screen
                    name="Therapist"
                    component={() => (
                        <View>
                            <Text>Therapist</Text>
                        </View>
                    )}
                />
            );
        }
    }
    const screen = isAuthenticated ? (
        <>{authenticatedUserScreen}</>
    ) : (
        <Stack.Screen
            name="HelloWorld"
            component={() => <Text>HelloWorld</Text>}
        />
    );
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {screen}
        </Stack.Navigator>
    );
};

export const PreemptNavigator = ({
    onUserSelect,
}: {
    onUserSelect: (role: string) => void;
}) => {
    return (
        <SafeArea>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Walkthrough"
                    component={(props: any) => (
                        <WalkthroughScreen
                            {...props}
                            onUserSelect={onUserSelect}
                        />
                    )}
                />
            </Stack.Navigator>
        </SafeArea>
    );
};
