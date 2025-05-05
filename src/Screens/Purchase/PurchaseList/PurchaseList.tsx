import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PurchaseContainer from './PurchaseListContainer';
import Add from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Stack/StackFiles';
import { BottomTabParamList } from '../../Stack/BottomNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogInStore } from '../../../utils/Stores/ZustandStore';


function PurchaseList() {
    const add = <Add name="add" size={30} color="#FFF" />;

    // const navigation = useNavigation<CompositeNavigationProp<
    //     BottomTabNavigationProp<BottomTabParamList, 'PurchaseList'>,
    //     NativeStackNavigationProp<RootStackParamList>
    // >>();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();


    // const handleAddSeize = () => {
    //     navigation.navigate('PurchaseForm');
    // };

    const handleAddSeize = () => {
        // navigation.getParent()?.navigate('PurchaseForm');
        navigation.navigate('PurchaseForm');

    };

    // const clearLOGIN_Data = LogInStore((state) => state.clearLOGIN_Data);

    // const getAllAsyncStorageData = async () => {
    //     try {
    //         clearLOGIN_Data();
    //         await AsyncStorage.clear();
    //         const keys = await AsyncStorage.getAllKeys();
    //         const result = await AsyncStorage.multiGet(keys);

    //         const data = result.reduce((acc, [key, value]) => {
    //             acc[key] = value;
    //             return acc;
    //         }, {} as Record<string, string | null>);

    //         console.log('All AsyncStorage data:', data);
    //         return data;
    //     } catch (error) {
    //         console.error('Error reading AsyncStorage data', error);
    //     }
    // };
    // useEffect(() => {
    //     getAllAsyncStorageData();
    // }, []);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text>Purchase List</Text>
                <PurchaseContainer />

                <TouchableOpacity style={styles.addButton} onPress={handleAddSeize}>
                    <Text style={styles.addButtonText}>{add}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
export default PurchaseList;

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 110, // Adjust this value to control the distance from the bottom
        right: 20, // Adjust this value to control the distance from the right

        backgroundColor: '#210A7D', // Customize the button's appearance
        borderRadius: 7, // Make the button circular
        width: 50, // Adjust the button's width as needed
        height: 50, // Adjust the button's height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});
