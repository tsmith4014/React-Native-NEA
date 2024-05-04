import { StyleSheet } from 'react-native';

const shadow = StyleSheet.create({
    elevation1: {
        shadowColor: '#7c7d8e',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.0,

        elevation: 1,
    },
    elevation2: {
        shadowColor: '#7c7d8e',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    elevation4: {
        shadowColor: '#7c7d8e',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.62,

        elevation: 4,
    },
});

export default shadow;
