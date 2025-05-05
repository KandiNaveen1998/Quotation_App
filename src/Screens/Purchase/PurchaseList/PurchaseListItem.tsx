import React, { useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VehiclePurchase } from '../../../types/API/purchase'; // Update the path as needed
import CheckBox from '../../../reusableComponents/CheckBox';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import DotsIcon from 'react-native-vector-icons/Entypo';

interface PurchaseItemProps {
    item: VehiclePurchase;
    index: number;
    selectedState: boolean;
    onLongPress: (index: number) => void;
    onSelectionChange: (index: number) => void;
    toggleModal: (item: VehiclePurchase) => void;
    viewMoreInItem?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

const dots = <DotsIcon name="dots-three-horizontal" size={18} color="rgba(27, 20, 100, 1)" />;

function PurchaseItem({
    item,
    index,
    selectedState,
    onLongPress,
    onSelectionChange,
    toggleModal,
    viewMoreInItem = false,
}: PurchaseItemProps) {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleCheckPress = () => {
        onSelectionChange(index);
    };

    const handlePress = () => {
        if (!selectedState) {
            goToReceiptDetailsView();
        } else {
            handleCheckPress();
        }
    };

    const handleLongPress = (event: GestureResponderEvent) => {
        event.preventDefault();
        onLongPress(index);
    };

    const goToReceiptDetailsView = () => {
        // navigation.navigate('ReceiptDetailsView', { item });
    };

   

    return (
        <SafeAreaView style={styles.seizedContainer}>
            <View style={styles.row1}>
                <View style={styles.rowLeft}>
                    {selectedState && (
                        <CheckBox onPress={handleCheckPress} selected={item.selected} />
                    )}
                    {/* <Text style={styles.hpnumber}>
                        {item?.documentDate?.split('T')[0] || 'NA'}
                    </Text>
                    <Text style={styles.customerName}> / {item?.documentNumber}</Text> */}

                    <Text style={styles.title}>
                        Document No: {item.documentNumber}
                    </Text>
                </View>
                {!viewMoreInItem && (
                    <View style={styles.rowRight}>
                        <TouchableOpacity onPress={() => toggleModal(item)}>
                            <Text>{dots}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
                {/* <View style={styles.row2}>
                    <Text>{item?.actual_veh_purchase_value}</Text>
                    <Text>/ {item?.est_veh_purchase_value}</Text>
                </View> */}
                <View
                // style={styles.seizedContainer}
                >
                    {/* <Text style={styles.title}>
                        #{item?.id} • Document No: {item.documentNumber}
                    </Text> */}
                    <Text style={styles.hpnumber}>
                        {item?.documentDate?.split('T')[0] || 'NA'}
                    </Text>
                    <Text style={styles.label}>
                        Estimated Value:{' '}
                        <Text style={styles.value}>₹{item.est_veh_purchase_value}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Actual Value:{' '}
                        <Text style={styles.value}>₹{item.actual_veh_purchase_value}</Text>
                    </Text>
                    {/* <Text style={styles.label}>
                        Date:{' '}
                        <Text style={styles.value}>
                            {new Date(item.documentDate).toLocaleDateString()}
                        </Text>
                    </Text> */}
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default React.memo(PurchaseItem);



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#1b1464',
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#444',
    },
    value: {
        fontWeight: '500',
        color: '#000',
    },

    seizedContainer: {
        // margin: 10,
        marginBottom: 7,
        // width: screenWidth * 0.90,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'rgb(50, 103, 183)',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        // gap: 5,

        // position:'absolute',
        zIndex: -1,
        // backgroundColor:'yellow'
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    rowLeft: {
        flexDirection: 'row',
    },
    hpnumber: {
        color: 'rgba(28, 152, 203, 1)',
        fontWeight: '700',
    },
    customerName: {
        fontWeight: '600',

    },
    rowRight: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    row2: {
        flexDirection: "row",
        // marginTop: 12
    },

});
