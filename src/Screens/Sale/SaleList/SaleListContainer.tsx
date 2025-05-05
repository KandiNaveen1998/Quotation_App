/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView } from 'react-native-safe-area-context';
import PurchaseItem from './PurchaseListItem';
import { useApi } from '../../../utils/hooks/useApi';
import { VehiclePurchase, VehiclePurchaseList } from '../../../types/API/purchase';
import { useEffect, useCallback, useState } from 'react';
import { endpoints } from '../../../utils/API/endpoints';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, ListRenderItem, StyleSheet, TouchableOpacity, InteractionManager, Alert } from 'react-native';
import Heading from '../../../reusableComponents/Heading';
import { CheckBoxItem, CheckState } from '../../../reusableComponents/CheckboxInContainer';
import Dots from 'react-native-vector-icons/Entypo';
import { CompositeNavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import ActionsModel from '../../../reusableComponents/ActionSheets/MoreActions';
import SelectAllActionsModel from '../../../reusableComponents/ActionSheets/SelectAllActions';
import { RootStackParamList } from '../../../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../Stack/BottomNavigator';
import { PurchaseFormRouteProp } from '../PurchaseForm';
import { PurchaseFormNavigationProp } from './PurchaseList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SaleList } from '../../../types/API/sale';
import SaleListItem from './SaleListItem';

// ✅ Separated EmptyComponent
const EmptyComponent = ({ loading }: { loading: boolean }) => (
    <View>
        {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
        ) : (
            <Text style={{ marginTop: 36, fontSize: 20, alignSelf: 'center' }}>
                Not Found
            </Text>
        )}
    </View>
);

// ✅ Separated FooterComponent
const FooterComponent = ({
    loading,
    hasData,
}: {
    loading: boolean;
    hasData: boolean;
}) => (
    <View>
        {hasData && loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
        ) : null}
    </View>
);

function SaleListContainer() {

    // const navigation = useNavigation<CompositeNavigationProp<
    //     BottomTabNavigationProp<BottomTabParamList, 'PurchaseList'>,
    //     NativeStackNavigationProp<RootStackParamList>
    // >>();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {
        data: saleList,
        loading: saleListLoading,
        request: SaleGetAll,
        status: saleListAPIStatus,
        error: saleListAPIError,
    } = useApi<SaleList>();

    const {
        loading: saleDeleteByIdLoading,
        request: SaleDeleteById,
        status: saleDeleteByIdStatus,
    } = useApi<any>();
    const dots = <Dots name="dots-three-horizontal" size={18} color="rgba(27, 20, 100, 1)" />;

    useEffect(() => {
        if (saleListAPIError === 'Login token missing and Showroom token missing') {
            navigation.replace('Login');
        }
    }, [saleListAPIError]);


    const [selectedState, setSelectedState] = useState<boolean>(false); //to display search box and not to display checkbox if true search box not displayes and displays checkbox
    const [data, setData] = useState<VehiclePurchaseList | []>([]);
    const [apiData, setApiData] = useState<VehiclePurchaseList | []>([]);

    const [selectedCount, setSelectedCount] = useState(0);
    const [viewMoreInItem, setViewMoreInItem] = useState(false);
    const [isSelectAllModelVisible, setIsSelectAllModelVisible] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const fetchPurchaseList = async () => {
        try {
            const url = endpoints?.sale;
            let saleGetAllData = await SaleGetAll({
                url,
                method: 'GET',
                timeout: 10000, // 10 seconds
            });
        } catch (error) {
            console.error('Error fetching purchase list 145:', error);
        }
    };
    useEffect(() => {
        fetchPurchaseList();
    }, []); // ✅ Added dependency array

    useEffect(() => {
        if (saleList !== null) {
            setData(saleList);
            setApiData(saleList);
        }
    }, [saleList]);


    function handleLongPress(index: number) {
        if (!selectedState) {
            const newData = data.map((item, i) => {
                item.selected = i === index;
                return item; //returns boolean to customersEntered data
            });
            // console.log('newData', newData)

            setData(newData);
            setSelectedCount(1);
            setSelectedState(true); //make this display checkbox for all items
        }
    }

    const renderItem: ListRenderItem<SaleListItems> = ({ item, index }) => {

        return (
            <SaleListItem
                item={item}
                index={index}
                selectedState={selectedState}
                onLongPress={handleLongPress}
                onSelectionChange={handeSelectionChange}
                toggleModal={(value: any) => toggleModal(value)}
                viewMoreInItem={viewMoreInItem}
            />
        );
    };

    function handeSelectionChange(index: number) {
        const newData = [...data];
        const alreadySelected = newData[index].selected;
        // console.log('newData[index].selected', newData[index].selected)
        newData[index].selected = !newData[index].selected;
        setData(newData);
        setSelectedCount(alreadySelected ? selectedCount - 1 : selectedCount + 1);
    }
    function handleCancelPress() {
        setSelectedState(false);
        removeAllSelection();
    }

    function removeAllSelection() {
        const newData = data.map((item) => {
            item.selected = false;
            return item;
        });
        setData(newData);
        setSelectedCount(0);
    }
    function handleSelectAllPress() {
        const allSelected = data.every((item) => item.selected);
        if (!allSelected) {
            const newData = data.map((item) => {
                item.selected = true;
                return item;
            });
            setData(newData);
            setSelectedCount(newData.length);
        } else {
            removeAllSelection();
        }
    }
    const toggleModal = (item: string) => {
        setIsModalVisible(true);
        setSelectedReceipt(item);
    };

    function handleDeletePress() {
        const dataIDS = data
            .filter((item) => item.selected)
            .map((item) => item.id);

    } // to delete selected items or multi-delete
    const handleSelectAllOpenSheet = (item) => {
        setIsSelectAllModelVisible(!isSelectAllModelVisible);

        // const selectedItems = data
        //     .filter((item) => item.selected)
        //     .map((item) => item); //filters selected items
        // setSelectedData(selectedItems || []);
        // console.log("selectedItems", selectedItems)
    }; // to open sheet for selected items

    const route = useRoute<PurchaseFormRouteProp>();

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                console.log('checking refresh in focusEffect');
            });
            if (route?.params?.refresh) {
                try {
                    fetchPurchaseList();
                    navigation.setParams({ refresh: undefined }); // Reset refresh param
                } catch (error) {
                    console.error('Error in focus effect:', error);
                }
            }
            return () => task.cancel(); // Clean up task
        }, [route.params?.refresh]) // Ensure params are checked properly
    );
    const [selectedReceipt, setSelectedReceipt] = useState<any>({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSaleEdit = () => {
        navigation.navigate('SaleForm', { selectedObjectId: selectedReceipt?.id });


        // navigation.getParent()?.navigate('PurchaseForm', { selectedObjectId: selectedReceipt?.id });

    };

    const handleDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to Delete the Purchase?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Action Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteReceipt(selectedReceipt),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteReceipt = async (item: VehiclePurchase) => {
        // setLoading(true)
        try {
            const url = `${endpoints?.purchaseGetAll}/${item?.id}`;
            console.log('Delete URL:', url);
            let response = await SaleDeleteById({
                url,
                method: 'DELETE',
                timeout: 10000, // 10 seconds
            });
            console.log('Delete Receipt Response:', response);
            // if (response?.status === 200 || response?.status === 201) {
            //     Alert.alert('Purchase Deleted');
            //     fetchPurchaseList();
            // }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error While Receipt Delete', error);
        } finally {
            // setLoading(false)
        }
    };

    useEffect(() => {
        if (saleDeleteByIdStatus === 200 || saleDeleteByIdStatus === 201) {
            fetchPurchaseList();
        } else if (saleDeleteByIdStatus !== 0) {
            console.log('Error Deleting Receipt:', saleDeleteByIdStatus);
        }
    }, [saleDeleteByIdStatus]);

    const handleModelClose = (action: string) => {
        // navigation.navigate("Receipt", { selectedReceipt });

        try {
            switch (action) {
                case 'Edit':

                    // Log to check if selectedReceipt is available
                    if (selectedReceipt) {
                        // console.log('Selected Receipt: ', selectedReceipt);
                        // navigation.navigate('ReceiptDetailsView');

                        handleSaleEdit();
                    } else {
                        // console.log('Selected Receipt is undefined or null');
                    }
                    setIsModalVisible(false);
                    break;

                case 'Delete':
                    console.log('Handling Delete');
                    handleDelete();
                    break;

                default:
                    console.log('Modal Close Default');
                    setIsModalVisible(false);
                    break;
            }
        } catch (error) {
            console.log('Modal Error:', error);
        }

        // This part will always execute after the try/catch
        setIsModalVisible(false);
        setSelectedReceipt();
    };

    const handleSelectAllModelClose = (action: string) => {

        try {
            switch (action) {
                case 'Print':
                    console.log('Print');
                    break;
                case 'Whatsapp':
                    console.log('Whatsapp');
                    break;
                case 'Pdf':
                    console.log('Pdf');
                    break;
                case 'Excel':
                    console.log('excel');
                    break;
                case 'Share':
                    console.log('Share');
                    break;
                case 'Delete':
                    console.log('Handling Delete');
                    handleDelete();
                    break;
                case 'close':
                    console.log('close');
                    setIsSelectAllModelVisible(false);
                    break;
                default:
                    console.log('Modal Close Default');
                    setIsSelectAllModelVisible(false);
                    break;
            }
        } catch (error) {
            console.log('Modal Error:', error);
        }
        // This part will always execute after the try/catch
        setIsSelectAllModelVisible(false);
        setSelectedReceipt();
    }; // for all items selctions



    // useEffect(() => {
    //     // console.log('data in sale container', data);
    // }, [data]);

    return (
        <SafeAreaView>
            {!selectedState ? (
                // <ViewHeader
                //     name='Receipt'
                //     handleAllActionsClick={(action) => { handleSelectAllModelClose(action) }}
                // />
                <><Text>Total Count: {data?.length}</Text></>
            ) : (
                <>
                    <Heading name="Receipt" />
                    <View style={stylesForSelect.SelectedOptionscontainer}>
                        <Text style={stylesForSelect.selectedText}>
                            {selectedCount} Items Selected
                        </Text>
                        <View style={stylesForSelect.selectedOptions}>
                            <View style={stylesForSelect.rowFlex}>
                                <CheckBoxItem
                                    onPress={handleSelectAllPress}
                                    name={'Select all'}
                                    selected={
                                        selectedCount === data.length
                                            ? CheckState.SELECTED
                                            : selectedCount === 0
                                                ? CheckState.UNSELECTED
                                                : CheckState.INTERMEDIATE
                                    }
                                />
                                <TouchableOpacity onPress={handleCancelPress}>
                                    <Text style={stylesForSelect.cancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={stylesForSelect.selectedOptionsRight}>
                                <TouchableOpacity onPress={handleDeletePress}>
                                    {/* <DeleteIcon /> */}
                                    <Text> X </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSelectAllOpenSheet}>
                                    <Text >{dots}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View >
                </>
            )}

            <View style={{ position: 'relative', zIndex: -1 , marginBottom:150}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => {
                            handleCancelPress(), setData([]), fetchPurchaseList();
                        }} />
                    }
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={<EmptyComponent loading={saleListLoading} />}
                    ListFooterComponent={
                        <FooterComponent
                            loading={saleListLoading}
                            hasData={!!saleList?.length}
                        />
                    }
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews
                    scrollEnabled
                />
            </View>

            <ActionsModel
                isModalVisible={isModalVisible}
                modelClose={(action) => handleModelClose(action)}
                header={`Document Number: ${selectedReceipt?.documentNumber || ''}`}
            />
            <SelectAllActionsModel
                isModalVisible={isSelectAllModelVisible}
                modelClose={(action) => handleSelectAllModelClose(action)}
            />
        </SafeAreaView>
    );
}

export default SaleListContainer;

export const stylesForSelect = StyleSheet.create({
    rowFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    SelectedOptionscontainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-around',
        gap: 10,
        // <<<<<<< kumar_Fin_mobile
    },
    selectedText: {
        paddingHorizontal: 20,
        fontWeight: '500',
    },
    selectedOptionsRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginRight: 20,
        // =======
        //         paddingHorizontal: 20,
        //         paddingTop:20
        //     },
        //     rowFlex: {
        //         display: 'flex',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         paddingLeft: -20

        // >>>>>>> main
    },
    selectedOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '400',
    },
});

const styles = StyleSheet.create({
    row3: {
        flexDirection: 'row',
        // marginTop: 10
        gap: 5,


    },
    row2: {
        flexDirection: 'row',
        // marginTop: 12
    },
    rowRight: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    customerName: {
        fontWeight: '600',

    },
    hpnumber: {
        color: 'rgba(28, 152, 203, 1)',
        fontWeight: '700',
    },
    rowLeft: {
        flexDirection: 'row',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    seizedContainer: {
        margin: 10,
        marginBottom: 7,
        // width: 390,
        borderWidth: 1,
        borderColor: 'rgba(225, 227, 230, 1)',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        gap: 5,

    },
    SeizeContainer: {
        backgroundColor: '#fff',
    },
    status: {
        color: 'rgba(0, 128, 0, 1)',
    },
    textKey: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14,

    },
    textValue: {
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 14,
    },
    keyValues: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
    },
    rowBlock: {
        gap: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    SelectedOptionscontainer: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 10,
        gap: 10,
    },
    selectedText: {
        paddingHorizontal: 20,
        fontWeight: '500',
    },
    selectedOptionsRight: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    selectedOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

});
