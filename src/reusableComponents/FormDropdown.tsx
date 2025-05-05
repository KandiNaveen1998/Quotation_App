import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from 'react-hook-form';

type OptionType = {
    [key: string]: any;
};

interface FormDropdownProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    rules?: Omit<RegisterOptions<T, Path<T>>, 'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'>;
    labelCss?: TextStyle;
    dropdownStyle?: ViewStyle;
    options?: OptionType[];
    displayKey: string;
    valueKey: string;
    onChange?: (value: any) => void;
    placeHolder?: string;
}

const FormDropdown = <T extends FieldValues>({
    control,
    name,
    label,
    rules,
    labelCss,
    dropdownStyle,
    options = [],
    displayKey,
    valueKey,
    // placeHolder = '',
    onChange,
}: FormDropdownProps<T>) => {
    const [isFocus, setIsFocus] = useState(false);
    const [optionsData, setOptionsData] = useState([]);

    useEffect(() => {
        const defaultOption = {
            [displayKey]: 'Select an Option',
            [valueKey]: null,
        };
        setOptionsData([defaultOption, ...options]);
    }, [options, displayKey, valueKey]);
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, labelCss]}>{label}</Text>}

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onBlur, value }, fieldState: { error } }) => (
                    <>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: 'blue' },
                                dropdownStyle,
                                error && { borderColor: 'red' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            // data={options}
                            data={optionsData}
                            search
                            maxHeight={300}
                            labelField={displayKey}
                            valueField={valueKey}
                            placeholder={!isFocus ? 'Select' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => {
                                setIsFocus(false);
                                onBlur();
                            }}
                            onChange={(item: OptionType) => {
                                // onChange?.(item?.[valueKey]);
                                onChange?.(item);
                                setIsFocus(false);
                            }}
                        />
                        {console.log("error in dropdown", error)}
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                        {error?.[valueKey]?.message && (
                            <Text style={styles.errorText}>{error[valueKey].message}</Text>
                        )}


                    </>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: 'rgba(131, 122, 136, 1)',
        fontSize: 13,
        marginBottom: 0,
    },
    container: {
        marginTop: -0.5,
    },
    dropdown: {
        height: 40,
        backgroundColor: 'transparent',
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225, 227, 230, 1)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    placeholderStyle: {
        fontSize: 14,
        color: 'gray',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default FormDropdown;
