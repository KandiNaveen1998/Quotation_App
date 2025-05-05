import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { RootStackParamList } from '../Stack/StackFiles';
import { styles } from '../Purchase/PurchaseForm';
import { ActivityIndicator, Alert, InteractionManager, ScrollView, StyleSheet, Text, View } from 'react-native';
import Heading from '../../reusableComponents/Heading';
import FormButton from '../../reusableComponents/FormButton';
import { useCallback, useEffect, useState } from 'react';
import FormInput from '../../reusableComponents/FormInputText';
import FormDropdown from '../../reusableComponents/FormDropdown';
import { CommissionDetailsType, Customer, entityOnRCbookOptionsListType, entityOnRCbookOptionsTypes, FinanceDetailsType, HypothecationDetailsType, HypothecationHistory, PaymentDetails, SaleData, SaleGetByIdData, SalesFinanceDetails, saleTypes, Service } from '../../types/API/sale';
import FormDate from '../../reusableComponents/FormDate';
import SearchableApiDropdownNEW from '../../reusableComponents/SearchDropdown';
import { handleParamsData } from '../../utils/API/APIRelatedMethods';
import debounce from 'lodash.debounce';
import { Vehicle } from '../../types/API/purchase';
import { endpoints } from '../../utils/API/endpoints';
import { useApi } from '../../utils/hooks/useApi';
import { VehicleResponse } from '../../types/API/vehicle';
import { Party, PartyListResponse } from '../../types/API/party';
import { entityOnRCbook, hypothecationTo, PaymentModeGetById, PaymentModeList } from '../../types/API/masterdata';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { convertDateByMoment, convertDateByMomentUndefined, convertDateOrNullByMoment } from '../../utils/helpers/dateMethods';
import Stepper from './steps';
import { parseValidNumber, parseValidNumberOrNull, parseValidNumberOrZero, parseValidStringOrEmpty } from '../../utils/helpers/Extras';
import { returnValidValueOrDefaultOutputValue } from '../../utils/helpers/PayloadsMethods';
import CommonStyles from '../../reusableComponents/CommonStyles';
import UploadImage from '../../reusableComponents/UploadImage';
import UploadedImagePreview from '../../reusableComponents/UploadedImagePreview';
import { mapApiDataToSteps, updateStepsWithApiData } from '../../utils/extra/SaleFormMethods';
import LoadingOverlay from '../../reusableComponents/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { saleFormValidation } from './SaleFormValidations';


type SaleFormRouteProp = RouteProp<RootStackParamList, 'SaleForm'>;
export type SaleFormData = {
    sale_saleType: saleTypes;
    sale_documentNumber: string;
    sale_date: string;

    vehicle_vehicle: Vehicle;
    vehicle_reading: string;

    customer_party: Party;
    customer_guarantor: Party | null;
    customer_saleAmount: string;
    customer_RTOamount: string;
    customer_insuranceAmount: string;
    customer_receivables: string;
    customer_receivedAmount: string;
    customer_pendingAmount: string;
    customer_dpDueDate: string;
    customer_paymentMode?: PaymentModeList | null;

    finance_party: Party | null | SalesFinanceDetails;
    finance_amount: string;
    finance_suspensions: string;
    finance_roi: string;
    finance_tenure: string;
    finance_EMIamount: string;
    finance_totalEMIamount: string;

    commission_party: Party | null;
    commission_Amount: string;
    commission_paidAmount: string;
    commission_pendingAmount: string;
    commission_paymentMode: PaymentModeGetById;

    hypothecation_entityOnRcBook: entityOnRCbookOptionsTypes | null;
    hypothecation_nameOnRcBook: string;
    hypothecation_phoneNumber: string;
    hypothecation_hypothecationTo: entityOnRCbookOptionsTypes | null;
    hypothecation_tokenNumber: string;
    hypothecation_tokenDate: string;
    hypothecation_tokenExpDate: string;
    hypothecation_NoOfDaysToExpire: string;

    remarks: string;

    paymentModesList: PaymentModeList;
    steps: StepsType | null;
}
export const saleTypesOptions: saleTypes[] = [
    { id: 1, displayName: 'Direct Sale' },
    { id: 2, displayName: 'Finance Vehicle Sale' },
    { id: 3, displayName: 'Out-Side Vehicle' },
];

export type StepsType = { label: string, completed: boolean, value: string, displayName: string }[]
const steps: StepsType = [
    { label: 'Purchase', completed: false, value: 'purchaser', displayName: 'Purchase' },
    { label: 'Old Fin', completed: false, value: 'purchaseFinancer', displayName: 'Old Fin' },
    { label: 'Seller', completed: false, value: 'sellerCustomer', displayName: 'Seller' },
    { label: 'Sale Fin', completed: false, value: 'sellerFinancer', displayName: 'Sale Fin' },
    { label: 'RTO', completed: false, value: 'rto', displayName: 'RTO' },
    // { label: 'Completed', completed: false, value: 'completed' },
    { label: 'Status', completed: false, value: 'status', displayName: 'Completed' },

];

const entityOnRCBookOptions: entityOnRCbookOptionsListType = [
    {
        id: 1,
        displayName: 'Customer',
        value: 'customer',
    },
    {
        id: 2,
        displayName: 'Non-Customer',
        value: 'nonCustomer',
    },
];
const hypothecationToOptions = [
    {
        id: 1,
        displayName: 'Self',
        value: 'self',
    },
    {
        id: 2,
        displayName: 'Others',
        value: 'others',
    },
];


export default function SaleForm() {
    const methods = useForm<SaleFormData>({
        defaultValues: {
        },
        resolver: yupResolver(saleFormValidation),
        validateCriteriaMode: 'all',
    });
    let { getValues, setValue, trigger, control, formState: { errors }, } = methods;

    const route = useRoute<SaleFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [sale_saleType] = useWatch<SaleFormData>({
        control,
        name: ['sale_saleType'],
    });

    useEffect(() => {
        console.log('errors in validation', errors);
    }, [errors]);


    useEffect(() => {
        if (sale_saleType?.id) {
            if (sale_saleType?.id == 1) {
                setValue('customer_guarantor', null);

                setValue('finance_party', null);
                setValue('finance_amount', '0');
                setValue('finance_suspensions', '0');
                setValue('finance_roi', '0');
                setValue('finance_tenure', '0');
                setValue('finance_EMIamount', '0');
                setValue('finance_totalEMIamount', '0');


                setValue('hypothecation_entityOnRcBook', null);
                setValue('hypothecation_nameOnRcBook', '0');
                setValue('hypothecation_phoneNumber', '0');
                setValue('hypothecation_hypothecationTo', null);
                setValue('hypothecation_tokenNumber', '0');

                setValue('hypothecation_tokenDate', undefined);
                setValue('hypothecation_tokenExpDate', undefined);
                setValue('hypothecation_NoOfDaysToExpire', '0');
                setValue('steps', null);
            } else if (sale_saleType?.id == 2) {

            } else if (sale_saleType?.id == 3) {

                setValue('customer_saleAmount', '0');
                setValue('customer_dpDueDate', undefined);
                setValue('customer_paymentMode', null);

                setValue('hypothecation_entityOnRcBook', null);
                setValue('hypothecation_nameOnRcBook', '0');
                setValue('hypothecation_phoneNumber', '0');
                setValue('hypothecation_hypothecationTo', null);
                setValue('hypothecation_tokenNumber', '0');
                setValue('hypothecation_tokenDate', undefined);
                setValue('hypothecation_tokenExpDate', undefined);
                setValue('hypothecation_NoOfDaysToExpire', '0');
                setValue('steps', null);
            }
        }
    }, [sale_saleType?.id]);

    const { loading: saleSubmitLoading, request: submitSale, status: statusOfSaleSubmit, error: errorOfSaleSubmit } = useApi<any>();
    const { loading: saleUpdateLoading, request: updateSale, status: statusOfSaleUpdate, error: errorOfSaleUpdate } = useApi<any>();
    const { data: paymentModeList, loading: PaymentModeGetAlltLoading, request: fetchPaymentModeGetAll, status: statusOfPaymentModeGetAll } = useApi<PaymentModeList>();
    const { data: saleItem, loading: saleGetByIdtLoading, request: fetchSaleGetById, status: statusOfSaleGetById } = useApi<SaleGetByIdData>();

    const [loadingPage, setLoadingPage] = useState<boolean>(false);

    useEffect(() => {
        if (saleSubmitLoading || saleUpdateLoading || PaymentModeGetAlltLoading || saleGetByIdtLoading) {
            setLoadingPage(true);
        } else {
            setLoadingPage(false);
        }
    }, [saleSubmitLoading, saleUpdateLoading, PaymentModeGetAlltLoading, saleGetByIdtLoading]);


    const onSubmit = async (values: SaleFormData) => {

        console.log("values", values);

        let services: Service[] = [];


        if (parseValidNumber(values?.customer_RTOamount)) {
            const service: any = {
                serviceType: 'RTO Service',
                amount: parseValidNumberOrZero(values?.customer_RTOamount),
            };

            if (values?.RTOobject?.id) {
                service.id = values.RTOobject.id;
            }
            services?.push(service);
        }

        if (parseValidNumber(values?.customer_insuranceAmount)) {
            const service: any = {
                'serviceType': 'Insurance',
                'amount': parseValidNumberOrZero(values?.customer_insuranceAmount),
            };
            if (values?.Insuranceobject?.id) {
                service.id = values.Insuranceobject.id;
            }
            services?.push(service);
        }

        let payment: PaymentDetails[] = [];
        if (parseFloat(values?.customer_receivedAmount) > 0 && values?.customer_paymentMode?.id) {
            let obj: PaymentDetails = {
                'paidAmount': parseValidNumberOrZero(values?.customer_receivedAmount),
                'payment': {
                    'paidAmount': parseValidNumberOrZero(values?.customer_receivedAmount),
                    'paymentTypeId': parseValidNumberOrZero(values?.customer_paymentMode?.id),
                    ...(saleItem?.saleReceipts[0]?.payment?.id && { id: saleItem?.saleReceipts[0]?.payment?.id }),
                },
                ...(saleItem?.saleReceipts[0]?.id && { id: saleItem?.saleReceipts[0]?.id }),
            };
            payment.push(obj);
        }

        let customer: Customer = {
            'partyId': parseValidNumberOrNull(values?.customer_party?.id),
            'sale_amount': parseValidNumberOrZero(values?.customer_saleAmount),
            'totalCustomerAmount': parseValidNumberOrZero(values?.customer_receivables),
            'receivedAmount': parseValidNumberOrZero(values?.customer_receivedAmount),
            'dpDueDate': convertDateOrNullByMoment(values?.customer_dpDueDate, 'YYYY-MM-DD'),
            'services': [],
            'payments': [],
        };
        customer = { ...customer, 'services': services };
        customer = { ...customer, 'payments': payment };
        let financeDetails: FinanceDetailsType = {
            'saleFinanceCompanyId': parseValidNumberOrNull(values?.finance_party?.id),
            'financeAmount': parseValidNumberOrZero(values?.finance_amount),
            'fileSuspensionAmount': parseValidNumberOrZero(values?.finance_suspensions),
            'emiAmount': parseValidNumberOrZero(values?.finance_EMIamount),
            'totalEmiAmount': parseValidNumberOrZero(values?.finance_totalEMIamount),
            'fileRoi': parseValidNumberOrZero(values?.finance_roi),
            'tenure': parseValidNumberOrZero(values?.finance_tenure),
        };
        let commissionDetails: CommissionDetailsType = {
            commissionPartyId: parseValidNumberOrNull(values?.commission_party?.id),
            commissionAmount: parseValidNumberOrZero(values?.commission_Amount),
            paidAmount: parseValidNumberOrZero(values?.commission_paidAmount),
            paymentTypeId: parseValidNumberOrNull(values?.commission_paymentMode?.id),
            ...(saleItem?.saleCommission?.id && { id: saleItem.saleCommission.id }),
        };

        let hypothecationDetails: HypothecationDetailsType = {
            'entityOnRcBook': parseValidStringOrEmpty(values?.hypothecation_entityOnRcBook?.value),
            'nameOnRcBook': parseValidStringOrEmpty(values?.hypothecation_nameOnRcBook),
            'phoneNumber': parseValidStringOrEmpty(values?.hypothecation_phoneNumber),
            'hypothecationTo': parseValidStringOrEmpty(values?.hypothecation_hypothecationTo?.value),
            'tokenNumber': parseValidStringOrEmpty(values?.hypothecation_tokenNumber),
            'tokenDate': convertDateOrNullByMoment(values?.hypothecation_tokenDate, 'YYYY-MM-DD'),
            'tokenDueDate': convertDateOrNullByMoment(values?.hypothecation_tokenExpDate, 'YYYY-MM-DD'),
            'numberOfDaysExp': parseValidNumberOrZero(values?.hypothecation_NoOfDaysToExpire),
        };
        let hypothecationHistory: HypothecationHistory = values?.steps;
        let payload: SaleData = {
            'vehicleId': parseValidNumberOrNull(values?.vehicle_vehicle?.id),
            'vehicle_reading': parseValidStringOrEmpty(values?.vehicle_reading),
            'partyId': parseValidNumberOrNull(values?.customer_party?.id),
            'locationId': 1,
            'saleType': parseValidNumberOrZero(values?.sale_saleType?.id),
            'documentNumber': parseValidStringOrEmpty(values?.sale_documentNumber),
            'documentDate': convertDateByMoment(values?.sale_date, 'YYYY-MM-DD'),
            'guarantorId': parseValidNumberOrNull(values.customer_guarantor?.id),
            'remarks': parseValidStringOrEmpty(values?.remarks),
            // 'hypothecationHistory': hypothecationHistory,
            // 'hypothecationHistory': hypothecationHistory,
        };
        console.log("458 selectedObjectId", selectedObjectId);
        if (selectedObjectId) {
            payload.id = selectedObjectId;

            if (saleItem) {
                payload = {
                    ...payload,
                    'customer': customer,
                    'commissionDetails': commissionDetails,
                };
                if (values?.sale_saleType?.id === 2) {
                    payload = {
                        ...payload,
                        'financeDetails': financeDetails,
                        'hypothecationDetails': hypothecationDetails,
                        'hypothecationHistory': hypothecationHistory,
                    };
                } else if (values?.sale_saleType?.id === 3) {
                    payload = {
                        ...payload,
                        'financeDetails': financeDetails,
                    };
                }

                console.log('Payload for update', payload);
                let url = handleParamsData(`${endpoints?.saleUpdate}/${selectedObjectId}`, {});
                // return;
                const response = await updateSale({
                    url: url,
                    method: 'PUT',
                    timeout: 10000, // 10 seconds
                    data: payload,
                });
                console.log('Purchase update response', response);

            }
        }
        else {
            payload = {
                ...payload,
                'customer': customer,
                'commissionDetails': commissionDetails,
            };
            if (values?.sale_saleType?.id === 2) {
                payload = {
                    ...payload,
                    'financeDetails': financeDetails,
                    'hypothecationDetails': hypothecationDetails,
                    'hypothecationHistory': hypothecationHistory,
                };
            } else if (values?.sale_saleType?.id === 3) {
                payload = {
                    ...payload,
                    'financeDetails': financeDetails,
                };
            }


            console.log('payload for create', payload);

            // return;
            let url = handleParamsData(endpoints?.saleCreate, {});
            // return;
            const response = await submitSale({
                url: url,
                method: 'POST',
                timeout: 10000, // 10 seconds
                data: payload,
            });
            console.log('Purchase create response', response);
        }

    };

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

                    // ✅ Only if payment mode fetch is successful, call getPurchaseById
                    if (paymentResponse !== null) {

                        setValue('paymentModesList', paymentResponse);
                        if (selectedObjectId) {
                            await getSaleById();
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
    const handleInputChange = async (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        await trigger(fieldName)
        console.log('value in saletype', fieldName, value)
        if (fieldName === 'sale_saleType') {
            if (value?.id === 2 || value?.id === 3) { await trigger('finance_party'); }
        }
    };

    const getSaleById = async () => {

        const url = `${endpoints?.sale}/${selectedObjectId}`;
        console.log('url for Get by sale id', url);
        await fetchSaleGetById({
            url,
            method: 'GET',
            timeout: 10000, // 10 seconds
        });
    };
    useEffect(() => {
        console.log('saleItem', saleItem);
        if (saleItem) {
            const RTOamountObj = saleItem?.saleServices?.find((item: any) => item?.serviceType === 'RTO Service');
            let RTOamount = RTOamountObj?.amount || '';
            setValue('RTOobject', RTOamountObj);
            const InsuranceamountObj = saleItem?.saleServices?.find((item: any) => item?.serviceType === 'RTO Service');
            let Insuranceamount = InsuranceamountObj?.amount || '';
            setValue('Insuranceobject', InsuranceamountObj);

            let customerPendingAmount = parseValidNumberOrZero(saleItem?.total_customer_amount) - parseValidNumberOrZero(saleItem?.saleReceipts?.[0]?.payment?.paid_amount);

            let saleTypeFromApi = saleTypesOptions?.find((itm) => itm?.id == saleItem?.sale_type) || null;

            setValue('sale_saleType', saleTypeFromApi);

            setValue('sale_documentNumber', saleItem?.documentNumber);
            setValue('sale_date', convertDateByMoment(saleItem?.documentDate, 'YYYY-MM-DD'));
            setValue('vehicle_vehicle', saleItem?.vehicle);
            setValue('vehicle_reading', saleItem?.vehicle_reading);
            setValue('customer_party', saleItem?.customerDetails);
            setValue('customer_guarantor', saleItem?.guarantorDetails);
            setValue('customer_saleAmount', saleItem?.sale_amount);
            setValue('customer_RTOamount', RTOamount);
            setValue('customer_insuranceAmount', Insuranceamount);
            setValue('customer_receivables', saleItem?.total_customer_amount);
            setValue('customer_receivedAmount', saleItem?.saleReceipts?.[0]?.payment?.paid_amount);
            setValue('customer_pendingAmount', customerPendingAmount?.toString() || '');
            console.log('due date', saleItem?.saleReceipts[0]?.payment?.paymentType?.id);
            setValue('customer_dpDueDate', convertDateByMomentUndefined(saleItem?.dpDueDate, 'YYYY-MM-DD')); // date not coming
            let partyPaymentMode = paymentModeList?.find((item: any) => item.id === saleItem?.saleReceipts[0]?.payment?.paymentType?.id);//payment type is not coming
            setValue('customer_paymentMode', partyPaymentMode);

            setValue('finance_amount', saleItem?.saleFinanceDetails?.finance_amount);
            setValue('finance_suspensions', saleItem?.saleFinanceDetails?.file_suspension_amount);
            setValue('finance_roi', saleItem?.saleFinanceDetails?.file_roi);
            setValue('finance_tenure', saleItem?.saleFinanceDetails?.tenure?.toString());
            setValue('finance_EMIamount', saleItem?.saleFinanceDetails?.emi_amount);
            setValue('finance_totalEMIamount', saleItem?.saleFinanceDetails?.total_emi_amount);
            setValue('finance_party', saleItem?.saleFinanceDetails?.salesFinanceDetails);

            setValue('commission_party', saleItem?.saleCommission?.commissionParty);
            setValue('commission_Amount', saleItem?.saleCommission?.amount);
            setValue('commission_paidAmount', saleItem?.saleCommission?.paid_amount);
            setValue('commission_pendingAmount', saleItem?.saleCommission?.pending_amount);

            let commissionPaymentMode = paymentModeList?.find((item: any) => item.id === saleItem?.saleCommission?.commission_payment_type_id);//payment type is not coming
            setValue('commission_paymentMode', commissionPaymentMode);

            let entityObject = entityOnRCBookOptions?.find((itm) => itm.value == saleItem?.saleHypothecationDetails?.entity_on_rc_book) || null;
            let hypothecationObject = hypothecationToOptions?.find((itm) => itm.value == saleItem?.saleHypothecationDetails?.hypothecation_to) || null;

            setValue('hypothecation_entityOnRcBook', entityObject);
            setValue('hypothecation_nameOnRcBook', saleItem?.saleHypothecationDetails?.name_on_rc_book);
            setValue('hypothecation_phoneNumber', saleItem?.saleHypothecationDetails?.phoneNumber);
            setValue('hypothecation_hypothecationTo', hypothecationObject);
            setValue('hypothecation_tokenNumber', saleItem?.saleHypothecationDetails?.token_number);
            setValue('hypothecation_tokenDate', convertDateByMomentUndefined(saleItem?.saleHypothecationDetails?.token_date, 'YYYY-MM-DD'));
            setValue('hypothecation_tokenExpDate', convertDateByMomentUndefined(saleItem?.saleHypothecationDetails?.token_expiry_date, 'YYYY-MM-DD'));
            setValue('hypothecation_NoOfDaysToExpire', saleItem?.saleHypothecationDetails?.number_of_days?.toString());

            // let modifiedSteps = updateStepsWithApiData(steps, saleItem?.saleHypothecationHistoryDetails)
            let modifiedSteps = mapApiDataToSteps(steps, saleItem?.saleHypothecationHistoryDetails);

            setValue('modifiedSteps', modifiedSteps);
            setValue('remarks', saleItem?.remarks);

        }
    }, [saleItem]);

    useEffect(() => {
        console.log('statusOfPurchaseUpdate', statusOfSaleUpdate);
        console.log('statusOfPurchaseSubmit', statusOfSaleSubmit);
        if (statusOfSaleUpdate === 200 || statusOfSaleSubmit === 200 || statusOfSaleUpdate === 201 || statusOfSaleSubmit === 201) {
            navigateToSaleList();
        }
    }, [statusOfSaleUpdate, statusOfSaleSubmit]);

    const navigateToSaleList = () => {
        navigation.navigate('BottomTabs', {
            screen: 'SaleList', // This works only if you're using nested navigation properly
            params: { refresh: true },
        });
    };

    useEffect(() => {
        if (errorOfSaleSubmit || errorOfSaleUpdate) {
            console.log('errorOfSaleSubmit', errorOfSaleSubmit);
            console.log('errorOfSaleUpdate', errorOfSaleUpdate);
        }
    }, [errorOfSaleSubmit]);


    return (
        <>
            <Heading name="Create Sale" showBack={true} settingsBtn={true} />
            <LoadingOverlay visible={loadingPage} />

            <ScrollView>
                <FormProvider {...methods}>
                    {
                        // loadingPage ? <ActivityIndicator size="small" color="#0000ff" /> :

                        <>
                            <SaleBlock />
                            <VehicleDetails />
                            <CustomerDetails />
                            {
                                (sale_saleType?.id === 2 || sale_saleType?.id === 3) &&
                                <FinanceDetails />
                            }
                            <CommissionDetails />
                            {
                                (sale_saleType?.id === 2) &&
                                <HypothecationDetails />
                            }
                            <View style={CommonStyles.mainBlock}>
                                < FormInput
                                    label="Remarks"
                                    name="remarks"
                                    onChange={(e: string) => handleInputChange(e, 'remarks',)}
                                    style={CommonStyles.miniInput}
                                    secureTextEntry={false}
                                    keyboardType="default"
                                    control={control}
                                />
                            </View>
                            <UploadImage />

                            <UploadedImagePreview
                                title="Aadhar Card Image (10kb)"
                                imageUri="https://th.bing.com/th/id/OIP.YFNrNSre7BYg8LVs0_tXRQHaE8?w=1146&h=764&rs=1&pid=ImgDetMain" // Replace with actual image URI
                                onDownload={() => console.log('Download clicked')}
                                onDelete={() => console.log('Delete clicked')}
                            />
                            <View
                                //  style={styles.btnLogin}
                                style={CommonStyles.formButtons}
                            >
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
                                    // loading={purchaseSubmitLoading}
                                    // disabled={purchaseSubmitLoading}

                                    loaderColor="#fff" // Customize loader color
                                    loaderSize="small" // Customize loader size (small/large or a numeric value)
                                // rippleColor="rgba(255, 0, 0, 0.1)" // Customize ripple color
                                // disabledStyle={styles.customDisabledButton} // Custom disabled style
                                />
                                {/* {logInError && <Text style={styles.errorText}>{logInError}</Text>} */}
                                {/* {errors && <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>} */}

                            </View>
                        </>
                    }
                </FormProvider>
            </ScrollView>
        </>
    );
}
function SaleBlock() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    // const [selectedObjectId, vehicleId, partyId] = useWatch<SaleFormData>({
    //     control,
    //     name: ['selectedObjectId', 'vehicleId', 'partyId'],
    // });
    const handleInputChange = async (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        await trigger(fieldName);
    };

    return (
        <>
            <View style={CommonStyles.mainBlock}>
                <FormDropdown
                    control={control}
                    label={'Sale type'}
                    name="sale_saleType"
                    rules={{ required: 'This field is required' }}
                    options={saleTypesOptions}
                    displayKey={'displayName'}
                    valueKey={'id'}
                    dropdownStyle={CommonStyles.largeDropdown}
                    onChange={(e) => handleInputChange(e, 'sale_saleType')}
                />
                <View style={styles.dateRow}>

                    < FormInput
                        label="Doc.No"
                        name="sale_documentNumber"
                        onChange={(e: string) => handleInputChange(e, 'sale_documentNumber')}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="default"
                        control={control}
                        returnKeyType="next" // Shows "Next" on the keyboard

                    />
                    <FormDate
                        name="sale_date"
                        control={control}
                        label="Document Date"
                        placeholder=""
                        maximumDate={new Date()}
                        minimumDate={new Date('2000-01-01')}
                        onDateChange={(selectedDate) => {
                            handleInputChange(selectedDate, 'sale_date');
                        }}
                    />
                </View>
            </View>
        </>
    );
}
function VehicleDetails() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const { data: vehiclesData, loading: vehicleLoading, request: fetchingVehicleData, status: statusOfFetchingVehicleData } = useApi<VehicleResponse>();

    const [vehicle_vehicle] = useWatch<SaleFormData>({
        control,
        name: ['vehicle_vehicle'],
    });
    const route = useRoute<SaleFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;


    const [vehicleOptions, setVehicleOptions] = useState<Vehicle[] | []>([]);
    const handleInputChange = async (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        await trigger(fieldName);
    };
    const handleVehicleChange = (text: string) => {
        fetchVehicleData(text);
    };
    const fetchVehicleData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            // setLoading(true);
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
                const response = await fetchingVehicleData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });

            } catch (err) {
                console.error('API Error:', err);
                setVehicleOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );
    useEffect(() => {
        if (vehiclesData !== null) {
            setVehicleOptions(vehiclesData?.data);
        }
    }, [vehiclesData]);
    useEffect(() => {
        if (selectedObjectId && vehicle_vehicle) {
            setVehicleOptions([vehicle_vehicle]);
        }
    }, [vehicle_vehicle, selectedObjectId]);

    return (
        <>
            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Vehicle Details</Text>
                </View>
                <SearchableApiDropdownNEW
                    label={'Vehicle'}
                    name="vehicle_vehicle"
                    control={control}
                    onSearchTextChange={handleVehicleChange}
                    data={vehicleOptions || []}
                    loading={vehicleLoading}
                    displayKey="vehicleNumber"
                    valueKey="id"
                    rules={{ required: true }}
                />
                < FormInput
                    label="Vehicle Reading"
                    name="vehicle_reading"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'vehicle_reading',)}
                    style={CommonStyles.largeInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
            </View>
        </>
    );
}
function CustomerDetails() {
    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const { data: guarantorPartysData, loading: guarantorPartyLoading, request: fetchingGuarantorPartyData, status: statusOfFetchingGuarantorPartyData } = useApi<PartyListResponse>();

    const route = useRoute<SaleFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;

    const [paymentModesList, sale_saleType, customer_party, customer_guarantor, customer_receivedAmount,
        customer_receivables
    ] = useWatch<SaleFormData>({
        control,
        name: ['paymentModesList', 'sale_saleType', 'customer_party', 'customer_guarantor', 'customer_receivedAmount',
            'customer_receivables'
        ],
    });

    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [guarantorPartyOptions, setGuarantorPartysOptions] = useState<Party[] | []>([]);

    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);


    const handleInputChange = async (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        await trigger(fieldName);

        if (fieldName === 'customer_receivables') {
            if (customer_receivedAmount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(value) - parseFloat(customer_receivedAmount);

                setValue('customer_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('customer_paymentMode');
            }
        } else if (fieldName === 'customer_receivedAmount') {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            setValue(fieldName, sanitizedValue);

            if (customer_receivables?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(customer_receivables) - parseFloat(value);
                setValue('customer_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('customer_paymentMode');
            } else if (value?.toString()?.length === 0) {
                let pendingAmount = parseFloat(customer_receivables) - 0;
                setValue('customer_pendingAmount', pendingAmount.toString());
                await trigger(fieldName);
                await trigger('customer_paymentMode');
            }
        }
    };
    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };
    const handleGuarantorPartyChange = (text: string) => {
        fetchGuarantorPartyData(text);
    };

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }
            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );
    const fetchGuarantorPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                await fetchingGuarantorPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setGuarantorPartysOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (partysData !== null) {
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (guarantorPartysData !== null) {
            setGuarantorPartysOptions(guarantorPartysData?.data);
        }
    }, [guarantorPartysData]);

    useEffect(() => {
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);

    useEffect(() => {
        if (selectedObjectId && customer_party) {
            setPartysOptions([customer_party]);
        }
    }, [customer_party, selectedObjectId]);
    useEffect(() => {
        if (selectedObjectId && customer_guarantor) {
            setGuarantorPartysOptions([customer_guarantor]);
        }
    }, [customer_guarantor, selectedObjectId]);

    const oneYearFromToday = new Date();
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

    return (
        <>
            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Customer Details</Text>
                </View>
                <SearchableApiDropdownNEW
                    name="customer_party"
                    control={control}
                    onSearchTextChange={handlePartyChange}
                    data={partyOptions || []}
                    loading={partyLoading}
                    displayKey="name"
                    valueKey="id"
                    rules={{ required: true }}

                />
                {
                    (sale_saleType?.id === 2 || sale_saleType?.id === 3) &&
                    <SearchableApiDropdownNEW
                        name="customer_guarantor"
                        control={control}
                        onSearchTextChange={handleGuarantorPartyChange}
                        data={guarantorPartyOptions || []}
                        loading={guarantorPartyLoading}
                        displayKey="name"
                        valueKey="id"
                        rules={{ required: true }}
                    />
                }
                {
                    sale_saleType?.id !== 3 ?
                        <View style={styles.salesCustomerBlock}>
                            < FormInput
                                label="Sale Amount"
                                name="customer_saleAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_saleAmount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="RTO Amount / Service"
                                name="customer_RTOamount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_RTOamount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Insurance Amount / Service"
                                name="customer_insuranceAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_insuranceAmount')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Custr Amt ? Receivables"
                                name="customer_receivables"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_receivables',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Received Amount"
                                name="customer_receivedAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_receivedAmount')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Pending / DP Amount"
                                name="customer_pendingAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_pendingAmount')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            <View style={styles.dateRow}>
                                <FormDate
                                    label="DP Due Date"
                                    name="customer_dpDueDate"
                                    control={control}
                                    placeholder=""
                                    minimumDate={new Date()}
                                    maximumDate={oneYearFromToday}
                                    onDateChange={(selectedDate) => {
                                        handleInputChange(selectedDate, 'customer_dpDueDate');
                                    }}
                                />
                                <FormDropdown
                                    label={'Payment Type'}
                                    control={control}
                                    name="customer_paymentMode"
                                    rules={{ required: 'This field is required' }}
                                    options={paymentModeOptions}
                                    displayKey={'name'}
                                    dropdownStyle={CommonStyles.miniDropdown}
                                    valueKey={'id'}
                                    onChange={(e) => handleInputChange(e, 'customer_paymentMode')}
                                />
                            </View>
                        </View> :
                        <View style={styles.salesCustomerBlock}>
                            < FormInput
                                label="Customer Amount"
                                name="customer_receivables"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_receivables',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Paid Amount"
                                name="customer_receivedAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_receivedAmount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Pending Amount"
                                name="customer_pendingAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_pendingAmount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            <FormDropdown
                                control={control}
                                name="party_paymentMode"
                                rules={{ required: 'This field is required' }}
                                options={paymentModeOptions}
                                displayKey={'name'}
                                label={'Payment Type'}
                                dropdownStyle={CommonStyles.miniDropdown}
                                valueKey={'id'}
                                onChange={(e) => handleInputChange(e, 'customer_paymentMode')}
                            />
                            < FormInput
                                label="RTO Amount / Service"
                                name="customer_RTOamount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_RTOamount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard

                            />
                            < FormInput
                                label="Insurance Amount / Service"
                                name="customer_insuranceAmount"
                                onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'customer_insuranceAmount',)}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="numeric"
                                control={control}
                                returnKeyType="next" // Shows "Next" on the keyboard
                            />
                        </View>
                }
            </View>
        </>
    );
}
function FinanceDetails() {
    const { control, setValue, formState: { errors } } = useFormContext();
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();
    const route = useRoute<SaleFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;
    const [paymentModesList, finance_party] = useWatch<SaleFormData>({
        control,
        name: ['paymentModesList', 'finance_party'],
    });
    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);


    const handleInputChange = (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
    };
    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }



            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (partysData !== null) {
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {

        console.log('checking selectedObjectId', selectedObjectId);
        console.log('checking finance_party', finance_party);

        if (selectedObjectId && finance_party) {
            setPartysOptions([finance_party]);
        }
    }, [finance_party, selectedObjectId]);


    useEffect(() => {

        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);



    return (
        <>

            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Finance Details</Text>
                </View>
                <SearchableApiDropdownNEW
                    name="finance_party"
                    control={control}
                    onSearchTextChange={handlePartyChange}
                    data={partyOptions || []}
                    loading={partyLoading}
                    displayKey="name"
                    valueKey="id"
                    rules={{ required: true }}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Finance Amount"
                    name="finance_amount"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9]/g, ''), 'finance_amount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="File Suspensions"
                    name="finance_suspensions"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9]/g, ''), 'finance_suspensions',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="File ROI%"
                    name="finance_roi"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9.]/g, ''), 'finance_roi',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Tenure"
                    name="finance_tenure"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9]/g, ''), 'finance_tenure',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="EMI Amount"
                    name="finance_EMIamount"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9]/g, ''), 'finance_EMIamount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Total EMI Amount"
                    name="finance_totalEMIamount"
                    onChange={(e: string) => handleInputChange(e.replace(/[^0-9]/g, ''), 'finance_totalEMIamount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />

            </View>
        </>
    );
}
function CommissionDetails() {
    const route = useRoute<SaleFormRouteProp>();
    const selectedObjectId = route.params?.selectedObjectId;

    const { control, setValue, formState: { errors }, trigger } = useFormContext();
    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();

    const [paymentModesList, commission_party, commission_Amount, commission_paidAmount] = useWatch<SaleFormData>({
        control,
        name: ['paymentModesList', 'commission_party', 'commission_Amount', 'commission_paidAmount'],
    });
    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);

    const handleInputChange = async (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        await trigger(fieldName);

        if (fieldName === 'commission_Amount') {
            if (value?.toString()?.length > 0 && commission_paidAmount?.toString()?.length > 0) {
                let pendingAmount = parseFloat(value) - parseFloat(commission_paidAmount);
                setValue('commission_pendingAmount', pendingAmount.toString());
                await trigger('commission_pendingAmount');
            }
        } else if (fieldName === 'commission_paidAmount') {
            if (commission_Amount?.toString()?.length > 0 && value?.toString()?.length > 0) {
                let pendingAmount = parseFloat(commission_Amount) - parseFloat(value);
                setValue('commission_pendingAmount', pendingAmount.toString());
                await trigger('commission_pendingAmount');
            } else if (value?.toString()?.length === 0) {
                let pendingAmount = parseFloat(commission_Amount) - 0;
                setValue('commission_pendingAmount', pendingAmount.toString());
                await trigger('commission_pendingAmount');
            }
            await trigger('commission_paymentMode');
        }
    };
    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }



            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (partysData !== null) {
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);

    useEffect(() => {
        if (selectedObjectId && commission_party) {
            setPartysOptions([commission_party]);
        }
    }, [commission_party, selectedObjectId]);


    return (
        <>

            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Commission Details</Text>
                </View>
                <SearchableApiDropdownNEW
                    name="commission_party"
                    control={control}
                    onSearchTextChange={handlePartyChange}
                    data={partyOptions || []}
                    loading={partyLoading}
                    displayKey="name"
                    valueKey="id"
                    rules={{ required: true }}
                />
                < FormInput
                    label="Amount"
                    name="commission_Amount"
                    onChange={(e: string) => handleInputChange(e, 'commission_Amount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Paid Amount"
                    name="commission_paidAmount"
                    onChange={(e: string) => handleInputChange(e, 'commission_paidAmount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Pending Amount"
                    name="commission_pendingAmount"
                    onChange={(e: string) => handleInputChange(e, 'commission_pendingAmount',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="numeric"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                <FormDropdown
                    control={control}
                    name="commission_paymentMode"
                    rules={{ required: 'This field is required' }}
                    options={paymentModeOptions}
                    displayKey={'name'}
                    label={'Payment Mode'}
                    dropdownStyle={CommonStyles.miniDropdown}
                    valueKey={'id'}
                    onChange={(e) => handleInputChange(e, 'commission_paymentMode')}
                />


            </View >
        </>
    );
}
function HypothecationDetails() {
    const { control, setValue, formState: { errors } } = useFormContext();

    const { data: partysData, loading: partyLoading, request: fetchingPartyData, status: statusOfFetchingPartyData } = useApi<PartyListResponse>();

    const [paymentModesList, finance_party, modifiedSteps] = useWatch<SaleFormData>({
        control,
        name: ['paymentModesList', 'finance_party', 'modifiedSteps'],
    });
    const [partyOptions, setPartysOptions] = useState<Party[] | []>([]);
    const [paymentModeOptions, setPaymentModeOptions] = useState<PaymentModeList>([]);
    // const [entityOnRCBookOptions, setEntityOnRCBookOptions] = useState<PaymentModeList>([]);



    const handleInputChange = (value: any, fieldName: keyof SaleFormData) => {
        setValue(fieldName, value);
        // if (fieldName === 'hypothecation_entityOnRcBook') {
        //     if (value?.value === 'customer') {
        //         let hypothecationToData = hypothecationToOptions || [];
        //         const newEntry: entityOnRCbookOptionsTypes = { displayName: finance_party?.name, id: 3, value: finance_party?.name?.replace(/\s+/g, '') };
        //         const alreadyExists = hypothecationToData.some(item => item?.value === newEntry?.value);
        //         if (!alreadyExists) {
        //             hypothecationToData = [...hypothecationToData, newEntry]; // Add only if it doesn't exist
        //         }
        //         const filteredOptionsForHypothecationOn = hypothecationToData?.filter(item => (item?.relatedTo == 'customer' || item?.relatedTo == 'both'))

        //     }
        // }
    };
    const handlePartyChange = (text: string) => {
        fetchPartyData(text);
    };

    const fetchPartyData = useCallback(
        debounce(async (text: string) => {
            if (!text) { return; }

            try {
                // let xShowroomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVuYW50SWQiOjEsInNob3dyb29tSWQiOjIsImlhdCI6MTc0NDg2OTA3MiwiZXhwIjoxNzQ0ODk3ODcyfQ.lv0lRMeyZnCSAStnFGThJO1x6k7BiwvvG59LsYe8Hl8';
                let params = {
                    // 'page': 1,
                    // 'limit': 1,
                    // 'x-showroom-token': xShowroomToken,
                    'searchKey': encodeURIComponent(text),
                    // 'partyType': 'financer',
                };
                let url = handleParamsData(endpoints?.party, params);

                await fetchingPartyData({
                    url: url,
                    method: 'GET',
                    timeout: 10000, // 10 seconds
                });
            } catch (err) {
                console.error('API Error:', err);
                setPartysOptions([]);
            } finally {
                // setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (partysData !== null) {
            setPartysOptions(partysData?.data);
        }
    }, [partysData]);

    useEffect(() => {
        if (paymentModesList?.length > 0) {
            setPaymentModeOptions(paymentModesList);
        }
    }, [paymentModesList]);

    const onStepChange = (obj: StepsType) => {
        // console.log('obj', obj);

    };
    const [stepsObject, setStepsObject] = useState(steps);

    useEffect(() => {
        if (modifiedSteps) {
            setStepsObject(modifiedSteps);
        }
    }, [modifiedSteps]);

    return (
        <>


            <View style={CommonStyles.mainBlock}>
                <View style={CommonStyles.headerRow}>
                    <Text style={CommonStyles.subTitle}>Hypothecation Details</Text>
                </View>
                <FormDropdown
                    label={'Entity On RC Book'}
                    control={control}
                    name="hypothecation_entityOnRcBook"
                    rules={{ required: 'This field is required' }}
                    options={entityOnRCBookOptions}
                    displayKey={'displayName'}
                    valueKey={'id'}
                    dropdownStyle={CommonStyles.miniDropdown}
                    onChange={(e) => handleInputChange(e, 'hypothecation_entityOnRcBook')}
                />
                < FormInput
                    label="Name on RC Book"
                    name="hypothecation_nameOnRcBook"
                    onChange={(e: string) => handleInputChange(e, 'hypothecation_nameOnRcBook',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="default"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                < FormInput
                    label="Phone Number"
                    name="hypothecation_phoneNumber"
                    onChange={(e: string) => handleInputChange(e, 'hypothecation_phoneNumber',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="default"
                    control={control}
                    returnKeyType="next" // Shows "Next" on the keyboard

                />
                <FormDropdown
                    label={'Hypothecation To'}
                    control={control}
                    name="hypothecation_hypothecationTo"
                    rules={{ required: 'This field is required' }}
                    options={hypothecationToOptions}
                    displayKey={'displayName'}
                    valueKey={'id'}
                    dropdownStyle={CommonStyles.miniDropdown}
                    onChange={(e) => handleInputChange(e, 'hypothecation_hypothecationTo')}
                />
                {/* < FormInput
                        label="Hypothecation To"
                        name="hypothecation_hypothecationTo"
                        onChange={(e: string) => handleInputChange(e, 'hypothecation_hypothecationTo',)}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="default"
                        control={control}
                        returnKeyType="next" // Shows "Next" on the keyboard

                    /> */}
                <View style={styles.dateRow}>
                    < FormInput
                        label="Token Number"
                        name="hypothecation_tokenNumber"
                        onChange={(e: string) => handleInputChange(e, 'hypothecation_tokenNumber',)}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="default"
                        control={control}
                        returnKeyType="next" // Shows "Next" on the keyboard

                    />
                    <FormDate
                        name="hypothecation_tokenDate"
                        control={control}
                        label="Token Date"
                        placeholder=""
                        maximumDate={new Date()}
                        onDateChange={(selectedDate) => {
                            handleInputChange(selectedDate, 'hypothecation_tokenDate');
                        }}
                    />
                </View>
                <View style={styles.dateRow}>

                    <FormDate
                        label="Token Exp.Date"
                        name="hypothecation_tokenExpDate"
                        control={control}
                        placeholder=""
                        maximumDate={new Date()}
                        onDateChange={(selectedDate) => {
                            handleInputChange(selectedDate, 'hypothecation_tokenExpDate');
                        }}
                    />
                    < FormInput
                        label="No.of days to Expire"
                        name="hypothecation_NoOfDaysToExpire"
                        onChange={(e: string) => handleInputChange(e, 'hypothecation_NoOfDaysToExpire',)}
                        style={CommonStyles.miniInput}
                        secureTextEntry={false}
                        keyboardType="default"
                        control={control}
                        returnKeyType="next" // Shows "Next" on the keyboard

                    />
                </View>

                {/* < FormInput
                    label="Remarks"
                    name="remarks"
                    onChange={(e: string) => handleInputChange(e, 'remarks',)}
                    style={CommonStyles.miniInput}
                    secureTextEntry={false}
                    keyboardType="default"
                    control={control}
                /> */}
                <ScrollView>
                    <Stepper initialSteps={stepsObject} onStepChange={(obj) => onStepChange(obj)} />
                </ScrollView>
            </View>
        </>
    );
}
