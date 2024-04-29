import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SurvivorNavigator } from './survivor.navigator';
import { PreemptNavigator } from './preempt.navigator';
// import { AccountNavigator } from './account.navigator';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    return (
        <NavigationContainer>
            {isAuthenticated ? <SurvivorNavigator /> : <PreemptNavigator />}
        </NavigationContainer>
    );
};
