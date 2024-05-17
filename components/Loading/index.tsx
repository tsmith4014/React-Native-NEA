import useRootStore from '@/store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from './styles';

export interface LoadingPropTypes {
    cancelable?: boolean;
    color?: string;
    animation?: 'none' | 'slide' | 'fade';
    overlayColor?: string;
    size?: 'small' | 'large' | number; // size props does not support value normal
    textContent?: string;
    textStyle?: TextStyle;
    visible?: boolean;
    indicatorStyle?: ViewStyle;
    customIndicator?: React.ReactNode;
    children?: React.ReactNode;
    spinnerKey?: string;
}

const Loading = () => {
    const {
        loading: {
            cancelable = false,
            color = 'white',
            animation = 'none',
            overlayColor = 'rgba(0, 0, 0, 0.25)',
            size = 'large',
            textContent = '',
            textStyle,
            visible = false,
            indicatorStyle,
            customIndicator,
            children,
            spinnerKey,
        },
    } = useRootStore();
    const [spinnerVisible, setSpinnerVisibility] = useState(visible);
    const close = () => {
        setSpinnerVisibility(false);
    };

    const _handleOnRequestClose = () => {
        if (cancelable) {
            close();
        }
    };

    useEffect(() => {
        setSpinnerVisibility(visible);
    }, [visible]);
    const _renderDefaultContent = () => {
        return (
            <View style={styles.background}>
                {customIndicator || (
                    <ActivityIndicator
                        color={color}
                        size={size}
                        style={[styles.activityIndicator, { ...indicatorStyle }]}
                    />
                )}
                <View style={[styles.textContainer, { ...indicatorStyle }]}>
                    <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
                </View>
            </View>
        );
    };

    const _renderSpinner = () => {
        const spinner = (
            <View
                style={[styles.container, { backgroundColor: overlayColor }]}
                key={spinnerKey || `spinner_${Date.now()}`}
            >
                {children || _renderDefaultContent()}
            </View>
        );

        return (
            <Modal
                animationType={animation}
                onRequestClose={() => {
                    _handleOnRequestClose();
                }}
                supportedOrientations={['landscape', 'portrait']}
                transparent
                visible={spinnerVisible}
                statusBarTranslucent
            >
                {spinner}
            </Modal>
        );
    };

    return _renderSpinner();
};

export default Loading;
