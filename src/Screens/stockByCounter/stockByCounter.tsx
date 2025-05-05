import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { useForm, Control } from 'react-hook-form';
import Heading from '../../reusableComponents/Heading';
import FormInput from '../../reusableComponents/FormInputText';
import FormDropdown from '../../reusableComponents/FormDropdown';
import CommonStyles from '../../reusableComponents/CommonStyles';
import { LogInStore } from '../../utils/Stores/ZustandStore';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// interface Showroom {
//     id: number;
//     name: string;
//     vehicles: number;
// }

// interface NavigationProps {
//     navigation: {
//         navigate: (screen: string, params?: { showroomName: string }) => void;
//     };
// }

interface FormData {
    zone?: string;
    counter?: string;
}

// const showroomData: Showroom[] = [
//     { id: 1, name: 'SKML VZM', vehicles: 32 },
//     { id: 2, name: 'SKML CHP', vehicles: 58 },
//     { id: 3, name: 'SKML GVD', vehicles: 76 },
//     { id: 4, name: 'SKML RNS', vehicles: 84 },
//     { id: 5, name: 'SKML PUS', vehicles: 10 },
//     { id: 6, name: 'SKML VZM', vehicles: 32 },
//     { id: 7, name: 'SKML CHP', vehicles: 58 },
//     { id: 8, name: 'SKML GVD', vehicles: 76 },
//     { id: 9, name: 'SKML RNS', vehicles: 84 },
//     { id: 10, name: 'SKML PUS', vehicles: 10 },
// ];

const { width: screenWidth } = Dimensions.get('window');

const StockByCounter = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // const [date, setDate] = useState<Date | undefined>();
    const LOGIN_Data = LogInStore((state) => state.LOGIN_Data);
    const [showroomsList, setShowroomsList] = useState<any>([]);

    useEffect(() => {
        if (LOGIN_Data) {
            console.log('LOGIN_Data?.showrooms', LOGIN_Data?.showrooms);
            setShowroomsList(LOGIN_Data?.showrooms);
        }
    }, [LOGIN_Data]);
    const {
        control,
        setValue,
    } = useForm<FormData>();

    const handleInputChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData> | string,
        name: keyof FormData
    ) => {
        if (typeof e === 'string') {
            setValue(name, e);
        } else {
            setValue(name, e.nativeEvent.text);
        }
    };

    return (
        <>
            <View>
                <Heading
                    name="Stock By Counter "
                    showBack={true}
                    filter={true}
                    onFilterPress={() => {
                        console.log('Filter icon pressed!');
                    }}
                />
            </View>

            <View style={styles.docRow}>

                <FormInput
                    label="Zone"
                    name="zone"
                    onChange={(e: string) => handleInputChange(e, 'zone')}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                />

                <FormDropdown
                    control={control as unknown as Control<any>}
                    name="counter"
                    rules={{ required: 'This field is required' }}
                    options={[]}
                    displayKey="name"
                    label="Counter"
                    valueKey="id"
                    dropdownStyle={CommonStyles.miniDropdown}
                    onChange={(e) => handleInputChange(e, 'counter')}
                />
            </View>

            {/* <ScrollView> */}
            <View style={styles.inputsContainer}>
                <FlatList
                    data={showroomsList}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemRow}
                            onPress={() =>
                                navigation.navigate('VehicleListShowRoom', {
                                    showroomId: item?.id,
                                })
                            }
                        >
                            <View style={styles.leftBlock}>
                                <Image
                                    source={{
                                        uri: 'https://static.vecteezy.com/system/resources/previews/048/736/705/non_2x/motorcycles-showroom-icon-png.png',
                                    }}
                                    style={styles.icon}
                                />
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                            <Text style={styles.value}>{item?.vehicles || ''}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {/* </ScrollView> */}
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: screenWidth * 0.42,
    },
    inputsContainer: {
        paddingHorizontal: 15,
        flex: 1,
    },
    inputDoc: {
        width: screenWidth * 0.42,
    },
    docRow: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 15,
        gap: 15,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 8,
        elevation: 1,
    },
    leftBlock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1b1464',
    },
    value: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1b1464',
    },
    labelCss: {}, // Define if needed
    iconStyle: {},  // Define if needed
});

export default StockByCounter;
