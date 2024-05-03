import React from 'react';
import { Text, Image, View } from 'react-native';
import {
    createBottomTabNavigator,
    BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const HomeIcon = require('../../../assets/images/home-tab-icon.png');
const HomeMatteIcon = require('../../../assets/images/home-matte-tab-icon.png');
const EvidenceIcon = require('../../../assets/images/evidence-tab-icon.png');
const EvidenceMatteIcon = require('../../../assets/images/evidence-matte-tab-icon.png');
const AwarenessIcon = require('../../../assets/images/awareness-tab-icon.png');
const AwarenessMatteIcon = require('../../../assets/images/awareness-matte-tab-icon.png');
const HelpIcon = require('../../../assets/images/help-tab-icon.png');
const HelpMatteIcon = require('../../../assets/images/help-matte-tab-icon.png');
// import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
// import { LocationContextProvider } from '../../services/location/location.context';
// import { FavoritesContextProvider } from '../../services/favorites/favorites.context';

// import { SettingsNavigator } from './settings.navigator';
// import { RestaurantsNavigator } from './restaurants.navigator';
// import { MapScreen } from '../../features/map/screens/map.screen';
// const tabIcon = require('../../../assets/home-tab-icon.png');
const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Home: 'home',
    Evidence: 'evidence',
    Awareness: 'awareness',
    Help: 'help',
} as const;

const icons = {
    home: {
        green: HomeIcon,
        matte: HomeMatteIcon,
    },
    evidence: {
        green: EvidenceIcon,
        matte: EvidenceMatteIcon,
    },
    awareness: {
        green: AwarenessIcon,
        matte: AwarenessMatteIcon,
    },
    help: {
        green: HelpIcon,
        matte: HelpMatteIcon,
    },
};

const createScreenOptions = ({
    route = 'Home',
}: {
    route: any;
}): BottomTabNavigationOptions => {
    const iconName = TAB_ICON[route.name as keyof typeof TAB_ICON]; // Update type assertion
    const focusedIcon = icons[iconName].green;
    const nonFocusedIcon = icons[iconName].matte;
    return {
        tabBarIcon: ({ focused, size }) => (
            <Image
                style={{ width: size, height: size }}
                source={focused ? focusedIcon : nonFocusedIcon}
            />
        ),
        headerShown: false,
        tabBarLabel: ({ focused }) => (
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    color: focused ? '#4AC16A' : '#5D5D61',
                    fontSize: 12,
                }}
            >
                {route.name}
            </Text>
        ),
    };
};

export const SurvivorNavigator = () => (
    // <FavoritesContextProvider>
    //     <LocationContextProvider>
    //         <RestaurantsContextProvider>
    <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
            name="Home"
            component={() => (
                <View>
                    <Text>Home</Text>
                </View>
            )}
        />
        <Tab.Screen
            name="Evidence"
            component={() => (
                <View>
                    <Text>Evidence</Text>
                </View>
            )}
        />
        <Tab.Screen
            name="Awareness"
            component={() => (
                <View>
                    <Text>Awareness</Text>
                </View>
            )}
        />
        <Tab.Screen
            name="Help"
            component={() => (
                <View>
                    <Text>Help</Text>
                </View>
            )}
        />
    </Tab.Navigator>
    //         </RestaurantsContextProvider>
    //     </LocationContextProvider>
    // </FavoritesContextProvider>
);
