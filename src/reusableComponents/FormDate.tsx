import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, Pressable, Dimensions, TextInput, StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width: screenWidth } = Dimensions.get('window');

type FormDateProps = {
    label?: string;
    control: any;
    name: string;
    defaultValue?: Date | undefined;
    required?: boolean;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    onDateChange?: (date: Date | null) => void;
};


const FormDate = ({
    label,
    control,
    name,
    defaultValue = undefined,
    required,
    placeholder,
    maximumDate,
    minimumDate,
    onDateChange,
}: FormDateProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={{ required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const handleChange = (event: any, selectedDate?: Date) => {
                    if (event?.type === 'set' && selectedDate) {
                        onChange(selectedDate);
                        onDateChange?.(selectedDate);
                    }
                    setOpen(false);
                };

                const clearDate = () => {
                    onChange(null);
                    onDateChange?.(null);
                };

                return (
                    <View style={styles.container}>
                        {label && (
                            <Text style={styles.label}>
                                {label}
                            </Text>
                        )}

                        <Pressable onPress={() => setOpen(true)}>
                            <View style={[
                                styles.inputWrapper,
                                { borderColor: error ? 'red' : '#ccc' },
                            ]}>
                                <Text style={[styles.inputText, { color: value ? '#000' : '#999' }]}>
                                    {value
                                        ? new Date(value).toLocaleDateString()
                                        : placeholder ?? 'Select a date'}
                                </Text>
                                <View style={styles.iconDate}>
                                    {value ? (
                                        <Pressable onPress={clearDate}>
                                            <Icon name="close" size={20} color="#999" />
                                        </Pressable>
                                    ) : (
                                        <Icon name="calendar-today" size={20} color="#999" />
                                    )}
                                </View>
                            </View>
                        </Pressable>

                        {open && (
                            <RNDateTimePicker
                                value={value instanceof Date ? value : new Date()}
                                onChange={handleChange}
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                                mode="date"
                                display="default"
                            />
                        )}

                        {error && (
                            <Text style={styles.errorText}>
                                {error.message || 'This field is required.'}
                            </Text>
                        )}
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.42,
    },
    label: {
        color: 'rgba(131, 122, 136, 1)',
        fontSize: 13,
    },
    iconDate: {
        marginRight: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 38,
        borderBottomWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(225, 227, 230, 1)',
        marginLeft: -5,
    },
    inputText: {
        fontSize: 16,
        marginLeft: 5,
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
});


export default FormDate;
