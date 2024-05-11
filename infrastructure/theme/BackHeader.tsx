import { router } from 'expo-router';
import React from 'react';
import { ChevronLeft } from 'react-native-feather';
import { View, ViewProps } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

type BackHeaderProps = ViewProps & {
    iconRight?: React.ReactNode;
};

const BackHeader = ({ iconRight, ...props }: BackHeaderProps) => {
    const { colors } = useTheme();
    return (
        <View className="flex-row items-center justify-between h-10" {...props}>
            <ChevronLeft color={colors.ui.neutral.gray90} onPress={() => router.back()} />
            {iconRight}
        </View>
    );
};

export default BackHeader;
