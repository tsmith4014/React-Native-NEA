import shadow from '@/infrastructure/theme/shadow';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useClickOutside } from 'react-native-click-outside';
import { ChevronDown, ChevronUp } from 'react-native-feather';
import { View } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import TextField from './TextField';

type Item = {
    name: string;
    value: string;
};

type SelectFieldProps = {
    disabled?: boolean;
    label: string;
    value?: string;
    items: Item[];
    onSelect: (item: Item) => void;
};

const SelectField = ({ onSelect, items, label, value, disabled }: SelectFieldProps) => {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);
    const ref = useClickOutside<typeof View>(() => setFocused(false));
    const Icon = focused ? ChevronUp : ChevronDown;
    return (
        // @ts-ignore
        <View className="relative w-[300px]" collapsable={false} ref={ref}>
            <TextField
                className="w-full"
                label={label}
                value={value}
                disabled={disabled}
                readOnly
                icon={<Icon color={colors.ui.neutral.gray80} height={20} width={20} />}
                onPressIn={() => setFocused(true)}
                forceFocus={focused}
            />
            {focused && (
                <View
                    className="absolute top-[60px] w-full max-h-[100px]"
                    style={{
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: colors.ui.neutral.gray20,
                        marginTop: 4,
                        padding: 1,
                    }}
                >
                    <FlatList
                        data={items}
                        renderItem={({ item, index }) => (
                            <>
                                {index !== 0 && (
                                    <View
                                        className="h-[1px] w-full"
                                        style={{ backgroundColor: colors.ui.neutral.gray20 }}
                                    />
                                )}
                                <TextField
                                    outline={false}
                                    readOnly
                                    label={item.name}
                                    onPressIn={() => onSelect(item)}
                                    containerStyle={{
                                        borderRadius: 4,
                                        borderWidth: 0,
                                        height: 48,
                                    }}
                                    fieldStyle={{
                                        top: -8,
                                    }}
                                />
                            </>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default SelectField;
