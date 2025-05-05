import { Dimensions, ScrollView, Text, StyleSheet, View } from 'react-native';
import Heading from '../../reusableComponents/Heading';
import FormDropdown from '../../reusableComponents/FormDropdown';
import FormInput from '../../reusableComponents/FormInputText';
import { FormProvider, useForm } from 'react-hook-form';
const { width: screenWidth } = Dimensions.get('window');
import AddIcon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import CommonStyles from '../../reusableComponents/CommonStyles';
import { styles } from '../Purchase/PurchaseForm';
import FormDate from '../../reusableComponents/FormDate';
import FormButton from '../../reusableComponents/FormButton';
import UploadImage from '../../reusableComponents/UploadImage';
import UploadedImagePreview from '../../reusableComponents/UploadedImagePreview';


export default function ServiceForm() {
    const [date, setDate] = useState(new Date());


    type FormData = {
        partyType?: string;
        partyName?: string;
        mobileNo?: string;
        alternateMobileNo?: string;
        AadharNumber?: string;
        gender?: string;
        dateOfBirth?: string;
        age?: string;
        occupation?: string;
        monthlyIncome?: string;
    };

    const methods = useForm<FormData>({
        defaultValues: {},
    });
    let { getValues, setValue, control } = methods;


    const [sameAsPermanent, setSameAsPermanent] = useState(false);

    const handleInputChange = (value: any, name: any, type: any) => {
        console.log('Input Changed:', { value, name, type });
    };
    return (
        <>
            <Heading name="Create Service " showBack={true} />
            <ScrollView>
                <FormProvider {...methods}>
                    <View style={CommonStyles.mainBlock}>
                        <FormDropdown
                            control={control}
                            name="serviceType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Service Type'}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'serviceType', 'string')}
                        />
                        <FormDropdown
                            control={control}
                            name="serviceCategory"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Service Category'}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'serviceCategory', 'string')}
                        />

                        <View style={styles.dateRow}>

                            < FormInput
                                label="Doc.No"
                                name="documentNumber"
                                onChange={(e: string) => handleInputChange(e, 'documentNumber', 'string')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="default"
                                control={control}
                            />

                            <FormDate
                                name="documentDate"
                                control={control}
                                label="Doc Date"
                                placeholder=""
                                maximumDate={new Date()}
                                onDateChange={(selectedDate) => {
                                    handleInputChange(selectedDate, 'documentDate', 'string');
                                }}
                            />
                        </View>
                    </View>

                    <View style={CommonStyles.mainBlock}>
                        <FormDropdown
                            control={control}
                            name="vehicle"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Vehicle'}
                            dropdownStyle={CommonStyles.largeDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'vehicle', 'string')}
                        />
                    </View>

                    <View style={CommonStyles.mainBlock}>
                        <FormInput
                            label={'Party'}
                            name={'party'}
                            onChange={(e) => handleInputChange(e, 'party', 'string')}
                            control={control}
                            style={CommonStyles.largeInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Service Amount'}
                            name={'serviceAmount'}
                            onChange={(e) => handleInputChange(e, 'serviceAmount', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Paid Amount '}
                            name={'paidAmount'}
                            onChange={(e) => handleInputChange(e, 'paidAmount', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        {/* } */}
                        <FormInput
                            label={'Pending Amount '}
                            name={'pendingAmount'}
                            onChange={(e) => handleInputChange(e, 'pendingAmount', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormDropdown
                            control={control}
                            name="paymentType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Payment Type'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'paymentType', 'string')}
                        />

                        <FormInput
                            label={'Exp Amount on Service '}
                            name={'expAmountOnService'}
                            onChange={(e) => handleInputChange(e, 'expAmountOnService', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Profit '}
                            name={'profit'}
                            onChange={(e) => handleInputChange(e, 'profit', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                    </View>


                    <View style={CommonStyles.mainBlock}>
                        <FormInput
                            label={'Remarks '}
                            name={'Remarks'}
                            onChange={(e) => handleInputChange(e, 'Remarks', 'string')}
                            control={control}
                            // style={styles.inputAge}
                            style={CommonStyles.largeInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                    </View>
                    <UploadImage />

                    <UploadedImagePreview
                        title="Aadhar Card Image (10kb)"
                        imageUri="https://th.bing.com/th/id/OIP.YFNrNSre7BYg8LVs0_tXRQHaE8?w=1146&h=764&rs=1&pid=ImgDetMain" // Replace with actual image URI
                        onDownload={() => console.log('Download clicked')}
                        onDelete={() => console.log('Delete clicked')}
                    />
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
                            // onPress={() => onSubmit(getValues())}
                            title="Submit"
                            // loading={purchaseSubmitLoading}
                            // disabled={purchaseSubmitLoading}
                            loaderColor="#fff" // Customize loader color
                            loaderSize="small" // Customize loader size (small/large or a numeric value)
                        />

                    </View>
                </FormProvider>

            </ScrollView>
        </>
    );
}
// const styles = StyleSheet.create({
// });

