import React from 'react';
import { Switch as WixSwitch, SwitchProps as WixSwitchProps } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';

type SwitchProps = WixSwitchProps;

const Switch = (props: SwitchProps) => {
    const { colors } = useTheme();
    return (
        <WixSwitch
            {...props}
            height={30}
            width={56}
            offColor={colors.ui.neutral.gray30}
            onColor={colors.brand.primary.spring50}
            thumbSize={26}
        />
    );
};

export default Switch;
