// import React from 'react';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';

// type DropdownItem = {
//     label: string;
//     value: string | number;
// };

// type Props = {
//     value: string | number | null;
//     onSelect: (value: string | number) => void;
//     onSearchTextChange: (text: string) => void;
//     data: DropdownItem[];
//     loading: boolean;
//     displayKey?: string; // Optional prop for display key
//     valueKey?: string; // Optional prop for value key
// };

// const SearchableApiDropdownNEW: React.FC<Props> = ({
//     value,
//     onSelect,
//     onSearchTextChange,
//     data,
//     loading,
//     displayKey = 'name',
//     valueKey = 'id',
// }) => {
//     return (
//         <View style={styles.container}>
//             <Dropdown
//                 style={styles.dropdown}
//                 placeholder="Search and select"
//                 search
//                 searchPlaceholder="Type to search..."
//                 data={data}
//                 value={value}
//                 labelField={displayKey}
//                 valueField={valueKey}
//                 onChange={(item: DropdownItem) => onSelect(item[valueKey])}
//                 onChangeText={onSearchTextChange}
//                 renderRightIcon={() =>
//                     loading ? <ActivityIndicator size="small" /> : null
//                 }
//             />
//         </View>
//     );
// };

// export default SearchableApiDropdownNEW;

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },
//     dropdown: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 6,
//         padding: 12,
//         width: 200,
//     },
// });
//------------------above one with states------------------

// import React from 'react';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { Controller, Control, FieldValues } from 'react-hook-form';

// type DropdownItem = {
//     label: string;
//     value: string | number;
//     [key: string]: any;
// };

// type Props<T extends FieldValues> = {
//     name: string;
//     control: Control<T>;
//     onSearchTextChange: (text: string) => void;
//     data: DropdownItem[];
//     loading: boolean;
//     displayKey?: string;
//     valueKey?: string;
//     rules?: object;
//     placeholder?: string;
// };

// const SearchableApiDropdownNEW = <T extends FieldValues>({
//     name,
//     control,
//     onSearchTextChange,
//     data,
//     loading,
//     displayKey = 'name',
//     valueKey = 'id',
//     rules,
//     placeholder = 'Search and select',
// }: Props<T>) => {
//     return (
//         <View style={styles.container}>
//             <Controller
//                 control={control}
//                 name={name}
//                 rules={rules}
//                 render={({ field: { onChange, value }, fieldState: { error } }) => (
//                     <>
//                         <Dropdown
//                             style={[styles.dropdown, error && styles.errorBorder]}
//                             placeholder={placeholder}
//                             search
//                             searchPlaceholder="Type to search..."
//                             data={data}
//                             value={value}
//                             labelField={displayKey}
//                             valueField={valueKey}
//                             onChange={(item: any) => onChange(item[valueKey])}
//                             onChangeText={onSearchTextChange}
//                             renderRightIcon={() =>
//                                 loading ? <ActivityIndicator size="small" /> : null
//                             }
//                         />
//                     </>
//                 )}
//             />
//         </View>
//     );
// };

// export default SearchableApiDropdownNEW;

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },
//     dropdown: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 6,
//         padding: 12,
//         width: 200,
//     },
//     errorBorder: {
//         borderColor: 'red',
//     },
// });
// -----------------above one with useForm------------------

import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Dimensions, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Controller, Control, FieldValues } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or Ionicons, Feather, etc.

type DropdownItem = {
    label: string;
    value: string | number;
    [key: string]: any;
};

type Props<T extends FieldValues> = {
    name: string;
    control: Control<T>;
    onSearchTextChange: (text: string) => void;
    data: DropdownItem[] | [] | any;
    loading: boolean;
    displayKey?: string;
    valueKey?: string;
    rules?: object;
    placeholder?: string;
    label?: string;
    labelCss?: TextStyle;
};
const { width: screenWidth } = Dimensions.get('window');

const SearchableApiDropdownNEW = <T extends FieldValues>({
    name,
    control,
    onSearchTextChange,
    data,
    loading,
    displayKey = 'name',
    valueKey = 'id',
    rules,
    placeholder = 'Search and select',
    label,
    labelCss,

}: Props<T>) => {
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, labelCss]}>{label}</Text>}

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Dropdown
                        style={[styles.dropdown, error && styles.errorBorder]}
                        placeholder={placeholder}
                        search
                        searchPlaceholder="Type to search..."
                        data={data}
                        value={value}
                        labelField={displayKey}
                        valueField={valueKey}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}

                        // onChange={(item: any) => onChange(item[valueKey])}
                        onChange={(item: any) => onChange(item)}
                        onChangeText={onSearchTextChange}
                        renderRightIcon={() => {
                            if (loading) {
                                return <ActivityIndicator size="small" />;
                            }
                            return value ? (
                                <TouchableOpacity onPress={() => onChange(null)}>
                                    <Icon name="close" size={20} color="#888" />
                                </TouchableOpacity>
                            ) : (
                                <Icon name="arrow-drop-down" size={24} color="#888" />
                            );
                        }}
                    />
                )}
            />
        </View>
    );
};

export default SearchableApiDropdownNEW;

const styles = StyleSheet.create({
    label: {
        color: 'rgba(131, 122, 136, 1)',
        fontSize: 13,
        marginBottom: 0,
    },
    container: {
        // marginTop: -0.5,
    },
    dropdown: {

        width: screenWidth * 0.9,
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
        // paddingLeft: 5,
        color: 'gray',
    },
    errorBorder: {
        borderColor: 'red',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
});
