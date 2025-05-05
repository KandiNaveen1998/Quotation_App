
import { ScrollView } from 'react-native-gesture-handler';
import Heading from '../../reusableComponents/Heading';
import { ActivityIndicator, Alert, Dimensions, InteractionManager, StyleSheet, Text, View } from 'react-native';
import FormInput from '../../reusableComponents/FormInputText';
import { useForm, FormProvider, useFormContext, useWatch } from 'react-hook-form';
import FormDate from '../../reusableComponents/FormDate';
import FormDropdown from '../../reusableComponents/FormDropdown';
import { useCallback, useEffect, useState } from 'react';
// import SearchableApiDropdown from '../../reusableComponents/SearchableApiDropdown';
import debounce from 'lodash.debounce';
import { endpoints } from '../../utils/API/endpoints';
import { useApi } from '../../utils/hooks/useApi';
import SearchableApiDropdownNEW from '../../reusableComponents/SearchDropdown';
import { handleParamsData } from '../../utils/API/APIRelatedMethods';
import { Party, PartyListResponse } from '../../types/API/party';
import { Vehicle, VehicleResponse } from '../../types/API/vehicle';
import FormButton from '../../reusableComponents/FormButton';
import { FinanceDetail, McDetail, PurchaseDataGetById, PurchaseDocument, PurchasePayment, RepairEstimates, VehiclePurchase, VehiclePurchaseDataPayload, VehiclePurchaseList } from '../../types/API/purchase';
import { convertDateByMoment, convertDateOrNullByMoment } from '../../utils/helpers/dateMethods';
import { ShowField } from '../../utils/helpers/settingsMethods';
import { modulesSettingsData } from '../userScreen';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { BottomTabParamList } from '../Stack/BottomNavigator';
import { removeDecimals, returnValidValueOrDefaultOutputValue } from '../../utils/helpers/PayloadsMethods';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { EstimationCostGetById, EstimationCostList, PaymentModeGetById, PaymentModeList } from '../../types/API/masterdata';
import CommonStyles from '../../reusableComponents/CommonStyles';

import { parseValidNumber, parseValidNumberOrZero } from '../../utils/helpers/Extras';
import LoadingOverlay from '../../reusableComponents/Loader';
import { purchaseFormValidation } from './PurchaseFormValidations';
import { yupResolver } from '@hookform/resolvers/yup';


export type PurchaseFormData = {
    purchaseType: purchaseTypeItem;

    tenantId: number;
    showroomId: number;
    locationId: number;
    actual_veh_purchase_value: string | null;
    // est_veh_purchase_value: number;
    selectedObjectId?: number;
    paymentModesList?: PaymentModeList;
    estimationCostsList?: EstimationCostList;

    documentNumber: string;
    documentDate: string | undefined;

    party_partyId: Party;
    party_vehicleId: Vehicle;
    party_purchaseAmount: string | null;
    party_paidAmount: string | null;
    party_pendingAmount: string | null;
    party_paymentMode: PaymentModeGetById | null;

    MC_partyId: Party;
    MC_amount: string | null;
    MC_paidAmount: string | null;
    MC_pendingAmount: string | null;
    MC_paymentMode: PaymentModeGetById | null;

    Fin_partyId: Party;
    Fin_amount: string | null;
    Fin_paidAmount: string | null;
    Fin_pendingAmount: string | null;
    Fin_paymentMode: PaymentModeGetById | null;

}
interface purchaseTypeItem {

    id: string;

    displayName: string

}

type purchaseTypeData = purchaseTypeItem[];

export const purchaseTypes: purchaseTypeData = [
    { id: '1', displayName: 'Direct Purchase' },
    { id: '2', displayName: 'Finance Purchase' },
];


// export type PurchaseFormRouteProp = RouteProp<BottomTabParamList, 'PurchaseForm'>;
type PurchaseFormRouteProp = RouteProp<RootStackParamList, 'PurchaseForm'>;
const { width: screenWidth } = Dimensions.get('window');

export default function PurchaseForm() {
    const methods = useForm<PurchaseFormData>({
        defaultValues: {
            documentDate: undefined,
        },
        resolver: yupResolver(purchaseFormValidation),
        validateCriteriaMode: 'all',
    });
    let { getValues, setValue, control, formState: { errors }, trigger } = methods;
    const route = useRoute<PurchaseFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;

    const { loading: purchaseSubmitLoading, request: submitPurchase, status: statusOfPurchaseSubmit, error: errorCreatePurchase } = useApi<any>();
    const { loading: purchaseUpdatetLoading, request: updatePurchase, status: statusOfPurchaseUpdate, error: errorupdatePurchase } = useApi<any>();

    const { data: paymentModeList, loading: PaymentModeGetAlltLoading, request: fetchPaymentModeGetAll, status: statusOfPaymentModeGetAll } = useApi<PaymentModeList>();
    const { data: EstimationCostsList, loading: EstimationCostsGetAlltLoading, request: fetchEstimationCostsGetAll, status: statusOfEstimationCostsGetAll } = useApi<EstimationCostList>();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // const [selectedObjectIdState, setSelectedObjectIdState] = useState<number | undefined>(selectedObjectId);
    const {
        data: purchaseObject,
        loading: purchaseObjectLoading,
        request: PurchaseGetById,
        status: statusOfPurchaseGetById,
    } = useApi<PurchaseDataGetById>();

    useEffect(() => {
        console.log('Error:_errorCreatePurchase', errorCreatePurchase);
        console.log('Error:_errorupdatePurchase', errorupdatePurchase);
    }, [errorCreatePurchase, errorupdatePurchase]);

    const [purchaseType] = useWatch<PurchaseFormData>({
        control,
        name: ['purchaseType'],
    });



    useEffect(() => {
        if (purchaseSubmitLoading || purchaseUpdatetLoading || PaymentModeGetAlltLoading || EstimationCostsGetAlltLoading) {
            setLoadingPage(true);
        } else {
            setLoadingPage(false);
        }
    }, [purchaseSubmitLoading, purchaseUpdatetLoading, PaymentModeGetAlltLoading, EstimationCostsGetAlltLoading]);


    const onSubmit = async (values: PurchaseFormData) => {

        console.log('values', values);
        let isvalid = await trigger();
        if (!isvalid) { return; }
        try {
            // let payload: VehiclePurchaseDataPayload = {
            //     'documentNumber': values?.documentNumber,
            //     'documentDate': values?.documentDate && convertDateByMoment(values?.documentDate, 'YYYY-MM-DD') || null,
            //     'tenantId': 1,
            //     'showroomId': 2,
            //     'vehicleId': values?.vehicleId?.id,
            //     'partyId': values?.partyId?.id,
            //     'est_veh_purchase_value': values?.actual_veh_purchase_value ? parseFloat(values?.actual_veh_purchase_value) : 0,
            //     'actual_veh_purchase_value': values?.actual_veh_purchase_value ? parseFloat(values?.actual_veh_purchase_value) : 0,
            //     'locationId': 1,
            // };
            // console.log('payload mc name', returnValidValueOrDefaultOutputValue(values?.MC_PartyId?.name, null, 'string'));
            // console.log('estimation_Costs_Objects', values?.estimation_Costs_Objects)

            let purchasePayments: PurchasePayment[] = [
                {
                    'paidAmount': returnValidValueOrDefaultOutputValue(values?.party_paidAmount, null, 'Number'),
                    // 'paidDate': '2025-04-09',
                    'payment': {
                        'amount': returnValidValueOrDefaultOutputValue(values?.party_paidAmount, null, 'Number'),
                        'mode': returnValidValueOrDefaultOutputValue(values?.party_paymentMode?.code, null, 'string'),
                        // 'paymentDate': '2025-04-09',
                        'paymentTypeId': returnValidValueOrDefaultOutputValue(values?.party_paymentMode?.id, null, 'Number'),
                    },
                },
            ];
            let mcDetails: McDetail[] = [
                {
                    'name': returnValidValueOrDefaultOutputValue(values?.MC_partyId?.name, null, 'string'),
                    'partyId': returnValidValueOrDefaultOutputValue(values?.MC_partyId?.id, null, 'Number'),
                    'amount': returnValidValueOrDefaultOutputValue(values?.MC_amount, null, 'Number'),
                    'paid_amount': returnValidValueOrDefaultOutputValue(values?.MC_paidAmount, null, 'Number'),
                    'payments': [
                        {
                            'paid_amount': returnValidValueOrDefaultOutputValue(values?.MC_paidAmount, null, 'Number'),
                            'paymentTypeId': returnValidValueOrDefaultOutputValue(values?.MC_paymentMode?.id, null, 'Number'),
                        },
                    ],
                },
            ];
            let financeDetails: FinanceDetail[] = [
                {
                    'finance_company_id': returnValidValueOrDefaultOutputValue(values?.Fin_partyId?.id, null, 'Number'),
                    'finance_amount': returnValidValueOrDefaultOutputValue(values?.Fin_amount, null, 'Number'),
                    'paid_amount': returnValidValueOrDefaultOutputValue(values?.Fin_paidAmount, null, 'Number'),
                    'payments': [
                        {
                            'paid_amount': returnValidValueOrDefaultOutputValue(values?.Fin_paidAmount, null, 'Number'),
                            'paymentTypeId': returnValidValueOrDefaultOutputValue(values?.Fin_paymentMode?.id, null, 'Number'),
                        },
                    ],
                },
            ];
            const repairEstimatesList = values?.estimation_Costs_Objects
                ?.filter((item: any) => parseFloat(item.amount) > 0)
                .map((item: any) => ({
                    est_for_id: item?.value,
                    amount: parseFloat(item?.amount),
                }));
            let repairEstimates: RepairEstimates[] = repairEstimatesList;

            let payload: PurchaseDocument = {
                'purchaseType': values?.purchaseType?.id,
                'documentNumber': returnValidValueOrDefaultOutputValue(values?.documentNumber, null, 'string'),
                'documentDate': convertDateOrNullByMoment(values?.documentDate, 'YYYY-MM-DD'),
                'vehicleId': returnValidValueOrDefaultOutputValue(values?.party_vehicleId?.id, null, 'Number'),
                'partyId': returnValidValueOrDefaultOutputValue(values?.party_partyId?.id, null, 'Number'),
                'est_veh_purchase_value': returnValidValueOrDefaultOutputValue(values?.totalEstimationAmount, null, 'Number'),
                'actual_veh_purchase_value': returnValidValueOrDefaultOutputValue(values?.party_purchaseAmount, null, 'Number'),
                // 'customer_type': 'Kalyan Finance',
                'locationId': 1,
            };

            // payload = {
            //     ...payload,
            //     purchasePayments: purchasePayments,
            //     mcDetails: mcDetails,
            //     financeDetails: financeDetails,
            //     repairEstimates: repairEstimates,
            // };
            console.log('payload', payload);


            // return;
            if (selectedObjectId) {
                payload.id = selectedObjectId;

                if (purchaseObject) {
                    if (purchaseObject?.mcDetails?.id) {
                        mcDetails[0] = {
                            ...mcDetails[0],
                            'id': purchaseObject.mcDetails.id,
                        };
                    }
                    if (purchaseObject?.financeDetails[0]?.id) {
                        financeDetails[0] = {
                            ...financeDetails[0],
                            'id': purchaseObject.financeDetails[0].id,
                        };
                    }
                    if (purchaseObject?.purchasePayments?.length > 0) {
                        const purchasePaymentObject = purchaseObject?.purchasePayments?.find((item: any) => item?.paidFor === 'purchase');
                        if (purchasePaymentObject?.id) {
                            purchasePayments[0] = {
                                ...purchasePayments[0],
                                'id': purchasePaymentObject.id,
                            };
                        }
                    }

                    console.log('purchaseType', values?.purchaseType);
                    if (values?.purchaseType?.id === '2') {
                        payload = {
                            ...payload,
                            financeDetails: financeDetails,
                        };
                    } else {
                        payload = {
                            ...payload,
                            financeDetails: [],
                        };
                    }

                    payload = {
                        ...payload,
                        purchasePayments: purchasePayments,
                        mcDetails: mcDetails,
                        repairEstimates: repairEstimates,
                    };
                }

                let url = handleParamsData(`${endpoints?.purchaseGetAll}/${selectedObjectId}`, {});
                const response = await updatePurchase({
                    url: url,
                    method: 'PUT',
                    timeout: 10000, // 10 seconds
                    data: payload,
                });
                console.log('Purchase update response', response);

            } else {
                if (values?.purchaseType?.id === '2') {
                    payload = {
                        ...payload,
                        financeDetails: financeDetails,
                    };
                } else {
                    payload = {
                        ...payload,
                        financeDetails: [],
                    };
                }
                payload = {
                    ...payload,
                    purchasePayments: purchasePayments,
                    mcDetails: mcDetails,
                    repairEstimates: repairEstimates,
                };
                let url = handleParamsData(endpoints?.purchaseCreate, {});

                console.log('payload for create purchase', payload, url);
                const response = await submitPurchase({
                    url: url,
                    method: 'POST',
                    timeout: 10000, // 10 seconds
                    data: payload,
                });
                console.log('Purchase create response', response);
            }
            // setLoginError(undefined);
        } catch (error) {
            // setLoginError('Something went wrong, try again');
            console.error('Error submitting purchase:', error);
        }

    };

    useEffect(() => {
        console.log('statusOfPurchaseUpdate', statusOfPurchaseUpdate);
        console.log('statusOfPurchaseSubmit', statusOfPurchaseSubmit);
        if (statusOfPurchaseUpdate === 200 || statusOfPurchaseSubmit === 200 || statusOfPurchaseUpdate === 201 || statusOfPurchaseSubmit === 201) {
            // navigation.navigate('PurchaseList', { refresh: true });
            // navigation.navigate('BottomTabs', {
            //     screen: 'PurchaseList', // This works only if you're using nested navigation properly
            //     params: { refresh: true },
            // });
            navigateToPurchaseList();
        }
    }, [statusOfPurchaseUpdate, statusOfPurchaseSubmit]);

    const navigateToPurchaseList = () => {
        navigation.navigate('BottomTabs', {
            screen: 'PurchaseList', // This works only if you're using nested navigation properly
            params: { refresh: true },
        });
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         const task = InteractionManager.runAfterInteractions(() => {
    //             console.log('checking refresh in focusEffect');
    //         });

    //         if (selectedObjectId) {
    //             getPurchaseById();
    //             navigation.setParams(undefined); // Reset refresh param
    //         }

    //         return () => task.cancel();
    //     }, [selectedObjectId]) // Remove dependencies to avoid multiple re-runs
    // );
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                console.log('checking refresh in focusEffect');
            });

            const init = async () => {
                try {
                    setLoadingPage(true);
                    const paymentResponse = await fetchPaymentModeGetAll({
                        url: endpoints.paymentMode,
                        method: 'GET',
                        timeout: 10000,
                    });
                    const EstimationCostsResponse = await fetchEstimationCostsGetAll({
                        url: endpoints.EstimationCost,
                        method: 'GET',
                        timeout: 10000,
                    });
                    console.log('EstimationCostsResponse', EstimationCostsResponse);
                    // ✅ Only if payment mode fetch is successful, call getPurchaseById
                    if (paymentResponse !== null && EstimationCostsResponse !== null) {
                        let EstimationCostsResponseModifiedList = EstimationCostsResponse?.map((item: EstimationCostGetById) => {
                            let fieldName = 'est_' + item?.name?.replace(/\s+/g, '') + '#' + item?.id; // Attach item?.id with a full stop
                            return { ...item, fieldName: fieldName };
                        });
                        console.log('EstimationCostsResponseModifiedList', EstimationCostsResponseModifiedList);
                        setValue('paymentModesList', paymentResponse);
                        setValue('estimationCostsList', EstimationCostsResponseModifiedList);
                        if (selectedObjectId) {
                            await getPurchaseById();
                        }
                        navigation.setParams(undefined); // Reset refresh param
                    }
                } catch (error) {
                    console.error('Error in master data or purchase fetch:', error);
                    Alert.alert('Error', 'Failed to load required data. Please try again.');
                } finally {
                    setLoadingPage(false);
                }
            };

            init(); // ⬅️ Call the wrapper function

            return () => task.cancel();
        }, [selectedObjectId])
    );

    const getPurchaseById = async () => {
        const url = `${endpoints?.purchaseGetAll}/${selectedObjectId}`;
        console.log('url', url);
        await PurchaseGetById({
            url,
            method: 'GET',
            timeout: 10000, // 10 seconds
        });
    };

    useEffect(() => {
        console.log('purchaseObject', purchaseObject);
        bindDataToForm();
    }, [purchaseObject]);

    const bindDataToForm = () => {
        console.log('purchaseObject?.vehicle', purchaseObject);
        if (purchaseObject) {
            setValue('saleItemData', purchaseObject);
            let purchaseTypeValue = purchaseTypes?.find(item => item?.id === purchaseObject?.purchaseType);
            setValue('purchaseType', purchaseTypeValue);
            setValue('selectedObjectId', selectedObjectId);

            setValue('documentNumber', purchaseObject?.documentNumber);
            setValue('documentDate', purchaseObject?.documentDate ? convertDateByMoment(purchaseObject?.documentDate, 'YYYY-MM-DD') : undefined);

            setValue('actual_veh_purchase_value', removeDecimals(purchaseObject?.actual_veh_purchase_value));
            // setValue('partyId', purchaseObject?.);

            setValue('party_partyId', purchaseObject?.purchaseCustomerDetails);
            setValue('party_vehicleId', purchaseObject?.vehicle);
            setValue('party_purchaseAmount', removeDecimals(purchaseObject?.actual_veh_purchase_value));
            // setValue('party_purchaseAmount', removeDecimals(purchaseObject?.actual_veh_purchase_value));
            let partyPaymentObject = purchaseObject?.purchasePayments?.find((item: any) => item?.paidFor === 'purchase');
            setValue('party_paidAmount', removeDecimals(partyPaymentObject?.payment?.paid_amount));
            let pendingAmount = parseFloat(purchaseObject?.actual_veh_purchase_value) - parseFloat(partyPaymentObject?.payment?.paid_amount);
            setValue('party_pendingAmount', pendingAmount > 0 ? pendingAmount.toString() : '');
            let partyPaymentMode = paymentModeList?.find((item: any) => item.id === partyPaymentObject?.payment?.paymentType?.id);
            setValue('party_paymentMode', partyPaymentMode);

            setValue('MC_partyId', purchaseObject?.mcDetails?.party);
            setValue('MC_amount', removeDecimals(purchaseObject?.mcDetails?.amount));
            setValue('MC_paidAmount', removeDecimals(purchaseObject?.mcDetails?.paid_amount));
            setValue('MC_pendingAmount', removeDecimals(purchaseObject?.mcDetails?.pending_amount));
            // setValue('party_partyId', purchaseObject?.purchasePayments?.find);
            let mcPaymentObject = purchaseObject?.purchasePayments?.find((item: any) => item?.paidFor === 'mc');
            let mcPaymentMode = paymentModeList?.find((item: any) => item.id === mcPaymentObject?.payment?.paymentType?.id);
            // console.log('mcPaymentObject', mcPaymentObject);
            // console.log('mcPaymentMode', mcPaymentMode);
            setValue('MC_paymentMode', mcPaymentMode);

            console.log('purchaseObject?.financeDetails', purchaseObject?.financeDetails);
            setValue('Fin_partyId', purchaseObject?.financeDetails[0]?.party);
            setValue('Fin_amount', removeDecimals(purchaseObject?.financeDetails[0]?.finance_amount));
            setValue('Fin_paidAmount', removeDecimals(purchaseObject?.financeDetails[0]?.paid_amount));
            setValue('Fin_pendingAmount', removeDecimals(purchaseObject?.financeDetails[0]?.pending_amount));
            // setValue('party_partyId', purchaseObject?.purchasePayments?.find);
            let finPaymentObject = purchaseObject?.purchasePayments?.find((item: any) => item?.paidFor === 'finance');
            let finPaymentMode = paymentModeList?.find((item: any) => item.id === finPaymentObject?.payment?.paymentType?.id);
            // console.log('mcPaymentObject', mcPaymentObject);
            // console.log('mcPaymentMode', mcPaymentMode);
            setValue('Fin_paymentMode', finPaymentMode);


            const transformed = purchaseObject?.purchaseRepairDetails.map(item => ({
                value: item.est_for_id,
                name: `est_${item.estDetails.name.replace(/\s+/g, '')}#${item.estDetails.id}`,
                amount: parseFloat(item.amount),
            }));
            console.log('transformed', transformed);
            setValue('estimation_Costs_Objects', transformed);
            transformed?.map((item: any) => {
                console.log('item.name', item.name);
                console.log('item.amount', item.amount);
                setValue(item.name, item.amount.toString());
            });

        }
    };

    return (
        <>

            <Heading name={purchaseObject?.id ? 'Edit Purchase' : 'Create Purchase'} showBack={true} />
            <LoadingOverlay visible={loadingPage} />

            <ScrollView>
                <FormProvider {...methods}>
                    {
                        // loadingPage ? <ActivityIndicator size="small" color="#0000ff" /> :
                        <View>
                            {/* <View style={CommonStyles.mainContainer }> */}
                            <PurchaseBlock />
                            <PartyDetails />
                            <MCDetails />
                            {
                                purchaseType?.id === '2' &&
                                <FinDetails />
                            }
                            <RepairDetails />

                            <View style={CommonStyles.formButtons}>
                                <FormButton
                                    onPress={() => navigation.goBack()}
                                    buttonStyle={CommonStyles.buttonCancel}
                                    textStyle={CommonStyles.buttonTextCancel}
                                    loaderColor="#fff" // Customize loader color
                                    loaderSize="small" // Customize loader size (small/large or a numeric value)
                                    title="Cancel"
                                />
                                <FormButton
                                    // onPress={handlePress}
                                    onPress={() => onSubmit(getValues())}
                                    title="Submit"
                                    loading={purchaseSubmitLoading}
                                    disabled={Object.keys(errors)?.length > 0 || purchaseSubmitLoading}
                                    loaderColor="#fff" // Customize loader color
                                    loaderSize="small" // Customize loader size (small/large or a numeric value)
                                // rippleColor="rgba(255, 0, 0, 0.1)" // Customize ripple color
                                // disabledStyle={styles.customDisabledButton} // Custom disabled style
                                />
                                {/* {logInError && <Text style={styles.errorText}>{logInError}</Text>} */}
                                {/* {errors && <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>} */}

                            </View>
                        </ View>

                    }
                </FormProvider>
            </ScrollView>
        </>
    );
}

export const styles = StyleSheet.create({
    estimateBlock: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 12,
        borderRadius: 5,
        gap: 20,
    },
    estimateAmount: {
        flexDirection: 'row',
        width: screenWidth * 0.48,
    },
    estimateBlockRowInput: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    estimateHeader: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(28, 152, 203, 1)',
    },
    estimateBlockRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    estimateLoop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    etimateText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(27, 20, 100, 1)',
    },

    dateRow: {
        gap: 33,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    inputDoc: {
        width: screenWidth * 0.5,
        color: '#000', // <-- force black
    },
    salesCustomerBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'space-between',
    },
});

function PurchaseBlock() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const [selectedObjectId, vehicleId, partyId] = useWatch<PurchaseFormData>({
        control,
        name: ['selectedObjectId', 'vehicleId', 'partyId'],
    });

    useEffect(() => {
        if (selectedObjectId && vehicleId) {
            console.log('vehicleId in children', vehicleId);
            setVehicleOptions([vehicleId]);
        }
    }, [selectedObjectId, vehicleId]);

    const handleInputChange = async (value: any, fieldName: keyof PurchaseFormData, dataType: string) => {
        console.log('fieldName & value', fieldName, value);
        setValue(fieldName, value);
        await trigger(fieldName);


        if (fieldName === 'purchaseType') {
            if (value?.id === '1') {
                setValue('Fin_partyId', undefined);
                setValue('Fin_amount', 0);
                setValue('Fin_paidAmount', 0);
                setValue('Fin_pendingAmount', 0);
                setValue('Fin_paymentMode', undefined);
            }
        }
    };
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const { data: vehiclesData, loading: vehicleLoading, request: fetchingVehicleData, status: statusOfFetchingVehicleData } = useApi<VehicleResponse>();

    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            console.log('text in payload', text);


            setLoading(true);
            try {
                let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                console.log('url', url);
                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );
    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchVehicleData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            setLoading(true);
            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                    inStock: 'in_stock',

                };
                let url = handleParamsData(endpoints?.vehicleGetAll, params);
                console.log('url', url);
                const response = await fetchingVehicleData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });

                console.log('response', response);
            } catch (err) {
                console.error('API Error:', err);
                setVehicleOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );
    const handleVehicleChange = (text: string) => {
        fetchVehicleData(text);
    };

    useEffect(() => {
        if (partysData !== null) {
            console.log('partysData', partysData);
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (vehiclesData !== null) {
            console.log('vehiclesData', vehiclesData);
            setVehicleOptions(vehiclesData?.data);
        }
    }, [vehiclesData]);


    return (
        <>
            <View style={CommonStyles.mainBlock}>
                <FormDropdown
                    control={control}
                    name="purchaseType"
                    rules={{ required: 'This field is required' }}
                    options={purchaseTypes}
                    displayKey={'displayName'}
                    label={'Purchase Type'}
                    dropdownStyle={CommonStyles.largeDropdown}
                    valueKey={'id'}
                    onChange={(e) => handleInputChange(e, 'purchaseType', 'string')}
                />
                <View style={styles.dateRow}>
                    {
                        ShowField('purchase.documentNumber', modulesSettingsData) &&
                        < FormInput
                            label="Doc.No"
                            name="documentNumber"
                            onChange={(e: string) => handleInputChange(e, 'documentNumber', 'string')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                    }
                    {
                        ShowField('purchase.documentDate', modulesSettingsData) &&
                        <FormDate
                            name="documentDate"
                            control={control}
                            label="Doc Date"
                            placeholder=""
                            maximumDate={new Date()}
                            minimumDate={new Date('2000-01-01')}
                            onDateChange={(selectedDate) => {
                                handleInputChange(selectedDate, 'documentDate', 'string');
                            }}
                        />
                    }
                </View>
            </View>
        </>
    );
}

function PartyDetails() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const [selectedObjectId, party_vehicleId, party_partyId, paymentModesList, party_purchaseAmount, party_paidAmount, saleItemData] = useWatch<PurchaseFormData>({
        control,
        name: ['selectedObjectId', 'party_vehicleId', 'party_partyId', 'paymentModesList', 'party_purchaseAmount', 'party_paidAmount', 'saleItemData'],
    });

    useEffect(() => {
        if (selectedObjectId && party_vehicleId) {
            console.log('party_vehicleId in children', party_vehicleId);
            setVehicleOptions([party_vehicleId]);
        }
        if (selectedObjectId && party_partyId) {
            setPartysOptions([party_partyId]);
        }
    }, [selectedObjectId, party_vehicleId, party_partyId]);

    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);

    useEffect(() => {
        console.log('paymentModesList in children', paymentModesList);
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);


    const handleInputChange = async (value: any, fieldName: keyof PurchaseFormData,) => {
        if (fieldName === 'party_purchaseAmount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);

            if (party_paidAmount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(value) - parseFloat(party_paidAmount);

                setValue('party_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('party_paymentMode');
            }
        } else if (fieldName === 'party_paidAmount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);

            if (party_purchaseAmount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(party_purchaseAmount) - parseFloat(value);
                setValue('party_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('party_paymentMode');
            } else if (value?.toString()?.length === 0) {
                let pendingAmount = parseFloat(party_purchaseAmount) - 0;
                setValue('party_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('party_paymentMode');
            }
        } else {
            setValue(fieldName, value);
            await trigger(fieldName);
        }
        // if (fieldName === 'party_paidAmount') {
        //     if (party_purchaseAmount?.toString()?.length > 0 && )
        // }
        await trigger(fieldName);

    };

    
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const { data: vehiclesData, loading: vehicleLoading, request: fetchingVehicleData, status: statusOfFetchingVehicleData } = useApi<VehicleResponse>();

    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            console.log('text in payload', text);


            setLoading(true);
            try {
                let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                console.log('url', url);
                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchVehicleData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            setLoading(true);
            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                    inStock: 'in_stock',
                };
                let url = handleParamsData(endpoints?.vehicleGetAll, params);
                console.log('url', url);
                const response = await fetchingVehicleData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });

                console.log('response', response);
            } catch (err) {
                console.error('API Error:', err);
                setVehicleOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );
    const handleVehicleChange = (text: string) => {
        fetchVehicleData(text);
    };

    useEffect(() => {
        if (partysData !== null) {
            console.log('partysData', partysData);
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (vehiclesData !== null) {

            let vehicles = vehiclesData?.data;
            // console.log('vehiclesData001', vehicles);

            // if (selectedObjectId && saleItemData?.vehicle) {
            //     vehicles.push(saleItemData?.vehicle);
            // }
            // console.log('vehiclesData', vehicles);
            setVehicleOptions(vehicles);
        }
    }, [vehiclesData]);


    return (
        <>
            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Party Details</Text>
                </View>

                {
                    ShowField('purchase.partyId', modulesSettingsData) &&
                    <SearchableApiDropdownNEW
                        name="party_partyId"
                        label="Customer"
                        control={control}
                        onSearchTextChange={handlePartyChange}
                        data={partyOptions || []}
                        loading={loading}
                        displayKey="name"
                        valueKey="id"
                        rules={{ required: true }}
                    />
                }
                {
                    ShowField('purchase.vehicleId', modulesSettingsData) &&
                    <SearchableApiDropdownNEW
                        label="Vehicle"
                        name="party_vehicleId"
                        control={control}
                        onSearchTextChange={handleVehicleChange}
                        data={vehicleOptions || []}
                        loading={loading}
                        displayKey="vehicleNumber"
                        valueKey="id"
                        rules={{ required: true }}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Purchase Amount"
                        name="party_purchaseAmount"
                        onChange={(e: string) => handleInputChange(e, 'party_purchaseAmount', 'number')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Paid Amount"
                        name="party_paidAmount"
                        onChange={(e: string) => handleInputChange(e, 'party_paidAmount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Pending Amount"
                        name="party_pendingAmount"
                        onChange={(e: string) => handleInputChange(e, 'party_pendingAmount', 'number')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                        disabled={true}
                    />
                }
                {/* {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="ActualPurchaseValue"
                            name="actual_veh_purchase_value"
                            onChange={(e: string) => handleInputChange(e, 'actual_veh_purchase_value', 'number')}
                             style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                    } */}
                <FormDropdown
                    control={control}
                    name="party_paymentMode"
                    rules={{ required: 'This field is required' }}
                    options={paymentModeOptions}
                    displayKey={'name'}
                    label={'Payment Mode'}
                    dropdownStyle={CommonStyles.miniDropdown}
                    valueKey={'id'}
                    onChange={(e) => handleInputChange(e, 'party_paymentMode')}
                />

            </View>
        </>
    );
}

function MCDetails() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const [selectedObjectId, vehicleId, MC_partyId, paymentModesList, MC_amount, MC_paidAmount] = useWatch<PurchaseFormData>({
        control,
        name: ['selectedObjectId', 'vehicleId', 'MC_partyId', 'paymentModesList', 'MC_amount', 'MC_paidAmount'],
    });

    useEffect(() => {
        if (selectedObjectId && MC_partyId) {
            console.log('vehicleId in children', vehicleId);
            setPartysOptions([MC_partyId]);
        }
    }, [selectedObjectId, MC_partyId]);

    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);

    useEffect(() => {
        console.log('paymentModesList in children', paymentModesList);
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);

    const handleInputChange = async (value: any, fieldName: keyof PurchaseFormData,) => {

        if (fieldName === 'MC_amount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);

            if (value?.toString()?.length > 0 && MC_paidAmount?.toString()?.length > 0) {
                let pendingAmount = parseFloat(value) - parseFloat(MC_paidAmount);
                setValue('MC_pendingAmount', pendingAmount.toString());
                await trigger('MC_pendingAmount');
            }
        } else if (fieldName === 'MC_paidAmount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);

            if (MC_amount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(MC_amount) - parseFloat(value);
                setValue('MC_pendingAmount', pendingAmount.toString());
                await trigger('MC_pendingAmount');
            } else if (value?.toString()?.length === 0) {
                let pendingAmount = parseFloat(MC_amount) - 0;
                setValue('MC_pendingAmount', pendingAmount.toString());
                await trigger('MC_pendingAmount');
            }
            await trigger('MC_paymentMode');
        } else {
            setValue(fieldName, value);
        }
        await trigger(fieldName);

    };
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const { data: vehiclesData, loading: vehicleLoading, request: fetchingVehicleData, status: statusOfFetchingVehicleData } = useApi<VehicleResponse>();

    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            console.log('text in payload', text);


            setLoading(true);
            try {
                let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                console.log('url', url);
                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchVehicleData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            setLoading(true);
            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.vehicleGetAll, params);
                console.log('url', url);
                const response = await fetchingVehicleData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });

                console.log('response', response);
            } catch (err) {
                console.error('API Error:', err);
                setVehicleOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );
    const handleVehicleChange = (text: string) => {
        fetchVehicleData(text);
    };

    useEffect(() => {
        if (partysData !== null) {
            console.log('partysData', partysData);
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (vehiclesData !== null) {
            console.log('vehiclesData', vehiclesData);
            setVehicleOptions(vehiclesData?.data);
        }
    }, [vehiclesData]);


    return (
        <>
            <View style={CommonStyles.mainBlock}>
                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>MC Details</Text> */}
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>MC Details</Text>
                </View>
                {
                    ShowField('purchase.partyId', modulesSettingsData) &&
                    <SearchableApiDropdownNEW
                        name="MC_partyId"
                        label="Party"
                        control={control}
                        onSearchTextChange={handlePartyChange}
                        data={partyOptions || []}
                        loading={loading}
                        displayKey="name"
                        valueKey="id"
                        rules={{ required: true }}
                    />

                }

                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="MC Amount"
                        name="MC_amount"
                        onChange={(e: string) => handleInputChange(e, 'MC_amount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Paid Amount"
                        name="MC_paidAmount"
                        onChange={(e: string) => handleInputChange(e, 'MC_paidAmount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Pending Amount"
                        name="MC_pendingAmount"
                        onChange={(e: string) => handleInputChange(e, 'MC_pendingAmount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {/* {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="ActualPurchaseValue"
                            name="actual_veh_purchase_value"
                            onChange={(e: string) => handleInputChange(e, 'actual_veh_purchase_value', 'number')}
                             style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                    } */}
                <FormDropdown
                    control={control}
                    name="MC_paymentMode"
                    rules={{ required: 'This field is required' }}
                    options={paymentModeOptions}
                    displayKey={'name'}
                    label={'Payment Mode'}
                    dropdownStyle={CommonStyles.miniDropdown}

                    valueKey={'id'}
                    onChange={(e) => handleInputChange(e, 'MC_paymentMode')}
                />
            </View>
        </>
    );
}

function FinDetails() {
    const { control, setValue, formState: { errors } } = useFormContext();
    const [selectedObjectId, Fin_partyId, paymentModesList, Fin_paidAmount, Fin_amount] = useWatch<PurchaseFormData>({
        control,
        name: ['selectedObjectId', 'Fin_partyId', 'paymentModesList', 'Fin_paidAmount', 'Fin_amount'],
    });

    useEffect(() => {
        console.log('Fin_partyId', Fin_partyId);
        if (selectedObjectId && Fin_partyId) {
            setPartysOptions([Fin_partyId]);
        }
    }, [selectedObjectId, Fin_partyId]);

    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);

    useEffect(() => {
        console.log('paymentModesList in children', paymentModesList);
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);

    const handleInputChange = (value: any, fieldName: keyof PurchaseFormData,) => {
        // if (dataType === 'string') {
        //     setValue(fieldName, value);
        // } else if (dataType === 'number') {
        //     const numericValue = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : '';
        //     console.log('values', numericValue);
        //     setValue(fieldName, numericValue);
        // }
        if (fieldName === 'Fin_amount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);
            if (value?.toString()?.length > 0 && Fin_paidAmount?.toString()?.length > 0) {
                let pendingAmount = parseFloat(value) - parseFloat(Fin_paidAmount);
                setValue('Fin_pendingAmount', pendingAmount.toString());
            }
        } else if (fieldName === 'Fin_paidAmount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);
            if (Fin_amount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(Fin_amount) - parseFloat(value);
                setValue('Fin_pendingAmount', pendingAmount.toString());
            }
        } else {
            setValue(fieldName, value);
        }

    };
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const { data: vehiclesData, loading: vehicleLoading, request: fetchingVehicleData, status: statusOfFetchingVehicleData } = useApi<VehicleResponse>();

    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[] | []>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            console.log('text in payload', text);


            setLoading(true);
            try {
                let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                console.log('url', url);
                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchVehicleData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            setLoading(true);
            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.vehicleGetAll, params);
                console.log('url', url);
                const response = await fetchingVehicleData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });

                console.log('response', response);
            } catch (err) {
                console.error('API Error:', err);
                setVehicleOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );
    const handleVehicleChange = (text: string) => {
        fetchVehicleData(text);
    };

    useEffect(() => {
        if (partysData !== null) {
            console.log('partysData', partysData);
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (vehiclesData !== null) {
            console.log('vehiclesData', vehiclesData);
            setVehicleOptions(vehiclesData?.data);
        }
    }, [vehiclesData]);


    return (
        <>
            <View style={CommonStyles.mainBlock}>

                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Finance Details</Text>
                </View>
                {
                    ShowField('purchase.partyId', modulesSettingsData) &&
                    <SearchableApiDropdownNEW
                        name="Fin_partyId"
                        control={control}
                        onSearchTextChange={handlePartyChange}
                        data={partyOptions || []}
                        loading={loading}
                        displayKey="name"
                        valueKey="id"
                        rules={{ required: true }}
                    />

                }

                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Finance Amount"
                        name="Fin_amount"
                        onChange={(e: string) => handleInputChange(e, 'Fin_amount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Paid Amount"
                        name="Fin_paidAmount"
                        onChange={(e: string) => handleInputChange(e, 'Fin_paidAmount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                    />
                }
                {
                    ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                    <FormInput
                        label="Pending Amount"
                        name="Fin_pendingAmount"
                        onChange={(e: string) => handleInputChange(e, 'Fin_pendingAmount')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="numeric"
                        control={control}
                        disabled={true}
                    />
                }
                {/* {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="ActualPurchaseValue"
                            name="actual_veh_purchase_value"
                            onChange={(e: string) => handleInputChange(e, 'actual_veh_purchase_value', 'number')}
                             style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                    } */}
                <FormDropdown
                    control={control}
                    name="Fin_paymentMode"
                    rules={{ required: 'This field is required' }}
                    options={paymentModeOptions}
                    displayKey={'name'}
                    label={'Payment Mode'}
                    dropdownStyle={CommonStyles.miniDropdown}

                    valueKey={'id'}
                    onChange={(e) => handleInputChange(e, 'Fin_paymentMode')}
                />

            </View>
        </>
    );
}

function RepairDetails() {
    const [estimationValue, setEstimationValue] = useState<number>(0);
    const [repairEstimationValue, setRepairEstimationValue] = useState<number>(0);

    const { control, setValue, formState: { errors }, getValues } = useFormContext();

    const [selectedObjectId, estimationCostsList, party_partyId, Fin_amount,
        MC_partyId, MC_amount, Fin_partyId, party_purchaseAmount, estimation_Costs_Objects,
        purchaseType,
    ] = useWatch<PurchaseFormData>({
        control,
        name: ['selectedObjectId', 'estimationCostsList', 'party_partyId', 'Fin_amount',
            'MC_partyId', 'MC_amount', 'Fin_partyId', 'party_purchaseAmount', 'estimation_Costs_Objects', 'purchaseType',
        ],
    });
    // const watchedValues = useWatch({ control });
    // Effect to handle estimation cost processing on form value changes
    // useEffect(() => {
    //     const datas = processEstimationCostObject(watchedValues);

    //     setLoopedFieldsData(datas);

    //     const sum = datas.reduce((acc, item) => {
    //         const value = parseFloat(item.amount) || 0;
    //         return acc + value;
    //     }, 0);

    //     setSumOfLoopedInputs(sum);
    //     setValue('estimation_Costs_Objects', datas);

    //     if (__DEV__) {
    //         console.log('Processed estimation data:', datas);
    //         console.log('Sum of inputs:', sum);
    //     }
    // }, [watchedValues]); // triggers when any form value changes

    const [loopedFieldsData, setLoopedFieldsData] = useState<any[]>([]);
    const [sumOfLoopedInputs, setSumOfLoopedInputs] = useState<number>(0);
    const handleInputChange = (value: string, fieldName: keyof PurchaseFormData) => {
        // Remove any non-numeric characters (keep decimal if needed)
        const sanitizedValue = value.replace(/[^0-9.]/g, '');

        setValue(fieldName, sanitizedValue);

        // // Optionally log during development only
        // if (__DEV__) {
        //     console.log('Updated field:', fieldName);
        //     console.log('New value:', sanitizedValue);
        //     console.log('All values:', getValues());
        // }

        let datas = processEstimationCostObject(getValues()); //wanna call this method when setValue triggers in useEffect
        // console.log("datas", datas);
        setLoopedFieldsData(datas);
        let sumOfLoopedInputsValue = datas.reduce((acc, item) => {
            let values = parseFloat(item.amount) || 0;
            return acc + values;
        }, 0);
        // setRepairEstimationValue(sumOfLoopedInputs);
        console.log('sumOfLoopedInputsValue', sumOfLoopedInputsValue);
        setSumOfLoopedInputs(sumOfLoopedInputsValue);
        setValue('estimation_Costs_Objects', datas);
        console.log('datas', datas);
    };

    useEffect(() => {
        if (estimation_Costs_Objects) {
            let sumOfLoopedInputsValue = estimation_Costs_Objects.reduce((acc, item) => {
                let values = parseFloat(item.amount) || 0;
                return acc + values;
            }, 0);
            setSumOfLoopedInputs(sumOfLoopedInputsValue);
            console.log('estimation_Costs_Objects = sumOfLoopedInputsValue in useEffect', sumOfLoopedInputsValue);
        }
    }, [estimation_Costs_Objects]);

    const [estimationCostsListOptions, setEstimationCostsListOptions] = useState<EstimationCostList | []>([]);
    const [customerAmount, setCustomerAmount] = useState<number>(0);

    useEffect(() => {
        if (estimationCostsList?.length > 0) {
            setEstimationCostsListOptions(estimationCostsList);
        }
    }, [estimationCostsList]);

    useEffect(() => {
        console.log('party_partyId in estimatiopn', party_partyId);
        if (party_partyId) {
            setValue('estimation_customer', party_partyId?.name);
            if (Fin_amount?.toString()?.length > 0) {
                console.log('party_purchaseAmount', party_purchaseAmount);

                let purchaseAmount = party_purchaseAmount?.toString() > 0 ? party_purchaseAmount?.toString() : 0;
                let pendingAmount = (purchaseAmount) - (Fin_amount || 0);
                console.log('pendingAmount for customer', pendingAmount);
                setValue('estimation_customerAmount', pendingAmount?.toString());

                setCustomerAmount(pendingAmount);
            } else {
                let purchaseAmount = party_purchaseAmount?.toString() > 0 ? party_purchaseAmount?.toString() : 0;
                setValue('estimation_customerAmount', purchaseAmount?.toString());
                setCustomerAmount(purchaseAmount);
            }
        }
    }, [party_partyId, Fin_amount, party_purchaseAmount, setValue, purchaseType]);

    useEffect(() => {
        console.log('party_partyId in estimatiopn', MC_partyId);
        if (MC_partyId) {
            setValue('estimation_mc', MC_partyId?.name);
            if (MC_amount?.toString()?.length > 0) {
                setValue('estimation_mcAmount', MC_amount?.toString());
            } else if (MC_amount?.toString()?.length === 0) {
                setValue('estimation_mcAmount', 0);
            }
        }
    }, [MC_partyId, MC_amount]);

    useEffect(() => {
        console.log('party_partyId in estimatiopn', Fin_partyId);
        if (Fin_partyId) {
            setValue('estimation_financeName', Fin_partyId?.name);
            if (Fin_amount?.toString()?.length > 0) {
                setValue('estimation_financeAmount', Fin_amount?.toString());
            }
        } else {
            setValue('estimation_financeName', null);
            setValue('estimation_financeAmount', 0);

        }
    }, [Fin_partyId, Fin_amount]);


    useEffect(() => {

        let totalEstimation = parseValidNumberOrZero(customerAmount) + (parseValidNumberOrZero(Fin_amount)) + parseValidNumberOrZero(MC_amount) + (sumOfLoopedInputs);
        console.log('787 customer Amount', parseValidNumberOrZero(customerAmount), typeof parseValidNumberOrZero(customerAmount));
        console.log('787 finance Amount', parseValidNumberOrZero(Fin_amount), typeof parseValidNumberOrZero(Fin_amount));
        console.log('787 mc Amount', parseValidNumberOrZero(MC_amount), typeof parseValidNumberOrZero(MC_amount));
        console.log('787 est Amount', sumOfLoopedInputs, typeof sumOfLoopedInputs);



        console.log('458 totalEstimation', totalEstimation);
        setEstimationValue(totalEstimation);
        setValue('totalEstimationAmount', totalEstimation);
    }, [customerAmount, Fin_amount, MC_amount, sumOfLoopedInputs]);
    // const handleLoop = () => {
    //     let allValues = getValues();
    //         i want the values of keys which are starts with 'est_'
    //         which have structure like 'est_other.2'
    //         here take 2  and prepare an array of object like below
    //     [{ fieldName: 'est_other.2', value: 2, amount: value of the key }, { fieldName: 'est_other.3', value: 3, amount: value of the key }]
    // }
    // ---------------
    // useEffect(() => {
    //     let data = processEstimationCostObject(getValues());
    //     console.log('data', data);
    // }, [setValue]);

    function processEstimationCostObject(data: Record<string, any>): { fieldName: string; value: number; amount: any }[] {
        const result: { fieldName: string; value: number; amount: any }[] = [];
        console.log('data in method', data);
        for (const key in data) {
            if (key.startsWith('est_') && key.includes('#')) {
                const parts = key.split('#');
                console.log('data with parts', parts);
                if (parts.length === 2 && !isNaN(parseInt(parts[1]))) {
                    const value = parseInt(parts[1]);
                    result.push({
                        fieldName: key,
                        value: value,
                        amount: data[key],
                    });
                }
            }
        }
        return result;
    }


    return (
        <>
            <View style={styles.estimateBlock}>
                <View style={styles.estimateBlockRow}>
                    <Text style={styles.estimateHeader}>Estimation Purchase Value  </Text>
                    <Text style={styles.estimateHeader}>{estimationValue}</Text>
                </View>
                <View style={styles.estimateBlockRowInput}>
                    {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="Customer"
                            name="estimation_customer"
                            // onChange={(e: string) => handleInputChange(e, 'estimation_customer')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                            disabled={true}
                        />
                    }
                    {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="Customer Amount"
                            name="estimation_customerAmount"
                            // onChange={(e: string) => handleInputChange(e, 'estimation_customerAmount')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                            disabled={true}

                        />
                    }
                </View>
                <View style={styles.estimateBlockRow}>
                    <View style={styles.estimateAmount}>
                        <Text style={styles.etimateText}>Repair Estimation : </Text>
                        <Text style={styles.etimateText}>{sumOfLoopedInputs}</Text>
                    </View>
                    <View style={styles.estimateLoop}>
                        {
                            estimationCostsListOptions.map((item: EstimationCostGetById, index: number) => (
                                <View
                                    key={item?.id || index}
                                    style={styles.estimateLoop}
                                >
                                    {ShowField('purchase.actualVehicleId', modulesSettingsData) && (
                                        <FormInput
                                            label={item.name}
                                            name={item.fieldName}
                                            onChange={(e: string) => handleInputChange(e, item.fieldName)}
                                            style={CommonStyles.miniInput}
                                            secureTextEntry={false}
                                            keyboardType="numeric"
                                            control={control}
                                        />
                                    )}
                                </View>
                            ))
                        }
                    </View>

                </View>
                <View style={styles.estimateBlockRowInput}>
                    {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="MC Name"
                            name="estimation_mc"
                            // onChange={(e: string) => handleInputChange(e, 'estimation_mc')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                            disabled={true}

                        />
                    }
                    {
                        ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                        <FormInput
                            label="MC Amount"
                            name="estimation_mcAmount"
                            // onChange={(e: string) => handleInputChange(e, 'estimation_mcAmount')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                            disabled={true}

                        />
                    }
                </View>

                {
                    purchaseType?.id === '2' &&
                    <View style={styles.estimateBlockRowInput}>

                        {
                            ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                            <FormInput
                                label="Finance Name"
                                name="estimation_financeName"
                                // onChange={(e: string) => handleInputChange(e, 'estimation_financeName')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                disabled={true}

                            />
                        }
                        {
                            ShowField('purchase.actualVehicleId', modulesSettingsData) &&
                            <FormInput
                                label="Finance Amount"
                                name="estimation_financeAmount"
                                // onChange={(e: string) => handleInputChange(e, 'estimation_financeAmount')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                disabled={true}

                            />
                        }
                    </View>
                }
            </View>
        </>
    );
}


