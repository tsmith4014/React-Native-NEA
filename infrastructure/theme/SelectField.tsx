import React, { useMemo } from 'react';
import { ChevronDown } from 'react-native-feather';
import { Picker, PickerModes, PickerProps } from 'react-native-ui-lib';
import { useTheme } from 'styled-components/native';
import TextField from './TextField';

type Item = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

type SelectFieldProps = PickerProps & {
    disabled?: boolean;
    label: string;
    selectedItem?: Item;
    defaultSelectedItem?: Item;
    items: Item[];
    required?: boolean;
    onSelect: (item?: Item) => void;
};

const SelectField = ({
    onSelect,
    required,
    defaultSelectedItem,
    items,
    label,
    selectedItem,
    disabled,
    ...props
}: SelectFieldProps) => {
    const { colors } = useTheme();
    const itemsMap = useMemo(
        () =>
            items.reduce(
                (result, item) => {
                    result[item.value] = item;
                    return result;
                },
                {} as Record<Item['value'], Item>,
            ),
        [items],
    );
    return (
        <Picker
            {...props}
            value={selectedItem?.value ?? defaultSelectedItem?.value}
            // @ts-ignore
            onChange={(value: Item['value'] | undefined) => onSelect(value ? itemsMap[value] : undefined)}
            containerStyle={{ marginTop: 20 }}
            mode={PickerModes.SINGLE}
            renderPicker={() => {
                return (
                    <TextField
                        required={required}
                        label={label}
                        value={selectedItem?.label ?? ''}
                        disabled={disabled}
                        icon={<ChevronDown color={colors.ui.neutral.gray80} height={20} width={20} />}
                    />
                );
            }}
            topBarProps={{ doneLabel: 'Done', containerStyle: { padding: 8 } }}
        >
            {items.map((option) => (
                <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled} />
            ))}
        </Picker>
    );
};

export default SelectField;
