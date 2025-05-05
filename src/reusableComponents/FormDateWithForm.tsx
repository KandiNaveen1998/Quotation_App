import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { convertDateOrNullByMoment } from '../utils/helpers/dateMethods';

const { width: screenWidth } = Dimensions.get('window');

export const formatDate = (date: Date | string | undefined, format = 'DD-MM-YYYY') => {
    if (!date) { return ''; }
    const convertedDate = convertDateOrNullByMoment(date, format) || '';
    return convertedDate;
};

type DatePickerInputForFilterProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    isDisabled?: boolean;
    maximumDate?: Date;
    onFocus?: () => void;
    onDateChange?: (value: Date | undefined) => void;
    inputStyles?: TextStyle;
    iconStyles?: TextStyle[];
    labelCss?: TextStyle;
    inputCss?: ViewStyle;
    rightIconStyles?: ViewStyle;
    style?: TextStyle;
    placeholder?: string;
    error?: boolean;
};

export default function DatePickerInputForFilter<T extends FieldValues>({
    name,
    control,
    label,
    isDisabled = false,
    maximumDate = new Date(),
    onFocus,
    onDateChange,
    inputStyles,
    iconStyles,
    labelCss,
    inputCss,
    rightIconStyles,
    style,
    placeholder,
    error = false,
}: DatePickerInputForFilterProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={undefined}
            render={({ field: { onChange, value }, fieldState }) => {
                const localDate = formatDate(value);

                // const handleChange = (event: any, selectedDate?: Date) => {
                //     console.log('event', event, selectedDate);
                //     if (event?.type === 'set') {
                //         const finalDate = selectedDate ?? new Date(event?.nativeEvent?.timestamp);
                //         console.log('finalDate', finalDate);

                //         const date = new Date(selectedDate);
                //         console.log("UTC Date and Time:", date.toISOString()); //this is working

                //         onChange(finalDate); // update RHF
                //         onDateChange?.(finalDate); // notify parent
                //         setOpen(false);
                //     } else if (event?.type === 'dismissed') {
                //         setOpen(false);
                //     }
                // };

                const handleChange = (event: any, selectedDate?: Date) => {
                    console.log('Event:', event);
                    console.log('Selected Date:', selectedDate);

                    // Check if the event type is 'set' (i.e., the user has selected a date)
                    if (event?.type === 'set') {
                        let finalDate: Date | undefined = selectedDate;

                        // If selectedDate is not available but the event has a timestamp, try to create a Date object from it
                        if (!finalDate && event?.nativeEvent?.timestamp) {
                            finalDate = new Date(event.nativeEvent.timestamp);
                            console.log('Final Date from timestamp:', finalDate);
                        } else {
                            console.log('Final Date from selectedDate:', finalDate);
                        }

                        // If finalDate is a valid Date object, proceed with updating the form state
                        if (finalDate instanceof Date && !isNaN(finalDate.getTime())) {
                            onChange(finalDate); // Update RHF with the Date object
                            onDateChange?.(finalDate); // Notify parent of the selected Date object
                        } else {
                            console.warn('Invalid date:', finalDate); // Log warning if finalDate is invalid
                        }

                        // Close the date picker after selection
                        setOpen(false);
                    } else if (event?.type === 'dismissed') {
                        setOpen(false); // Close the date picker if dismissed
                    }
                };


                const handleDeletePress = () => {
                    if (value === undefined || value === '') {
                        setOpen(true);
                        onFocus?.();
                        return;
                    }
                    onChange(undefined); // clear field
                    onDateChange?.(undefined); // notify parent
                    setOpen(false);
                };

                return (
                    <View style={[styles.inputContainer, inputCss]}>
                        {label && <Text style={[styles.label, labelCss]}>{label}</Text>}

                        <TouchableOpacity
                            style={styles.inputIconContainer}
                            disabled={isDisabled}
                            onPress={() => {
                                setOpen(true);
                                onFocus?.();
                            }}
                        >
                            <TextInput
                                value={localDate}
                                editable={false}
                                placeholder={placeholder}
                                style={[
                                    styles.input,
                                    style,
                                    inputStyles,
                                    (error || fieldState.error) && styles.errorInput,
                                ]}
                            />
                            {!isDisabled && (
                                <TouchableOpacity
                                    onPress={handleDeletePress}
                                    style={[styles.rightIcon, rightIconStyles]}
                                >
                                    {/* You can add a clear icon here */}
                                    <Text style={{ color: 'red', fontSize: 16 }}>✕</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>

                        {open && !isDisabled && (
                            <RNDateTimePicker
                                value={value instanceof Date ? value : new Date()}
                                maximumDate={maximumDate}
                                mode="date"
                                display="default"
                                onChange={handleChange}
                            />
                        )}
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    inputContainer: {
    },
    inputIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 250,
        maxWidth: screenWidth - 40,
        height: 'auto',
    },
    label: {
        color: 'rgba(131, 122, 136, 1)',
        fontSize: 13,
        marginBottom: 0,
    },
    errorInput: {
        borderColor: 'red',
    },
    input: {
        height: 35,
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225, 227, 230, 1)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingLeft: 5,
        marginTop: 3,
        backgroundColor: 'transparent',
        flex: 1,
        paddingTop:5,
    },
    rightIcon: {
        position: 'relative',
        left: -20,
        top: 8,
        paddingHorizontal: 6,
    },
});
