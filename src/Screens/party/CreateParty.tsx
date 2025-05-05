import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Heading from '../../reusableComponents/Heading';
import FormDropdown from '../../reusableComponents/FormDropdown';
import FormInput from '../../reusableComponents/FormInputText';
import { FormProvider, useForm } from 'react-hook-form';
const { width: screenWidth } = Dimensions.get('window');
import AddIcon from 'react-native-vector-icons/Ionicons';
import DatePickerInputForFilter from '../../reusableComponents/FormDateWithForm';
import React, { useState } from 'react';
import AddressDetails from './AddressDetails';
import BankDetails from './BankDetails';
import GstDetails from './GstDetails';
import BalanceDetails from './BalanceDetails';
import UploadImage from '../../reusableComponents/UploadImage';
import UploadedImagePreview from '../../reusableComponents/UploadedImagePreview';
import CommonStyles from '../../reusableComponents/CommonStyles';
import FormButton from '../../reusableComponents/FormButton';

const moduleSettings = {
    'id': 1,
    'tenantId': 1,
    'showroomId': 1,
    'moduleKey': 'purchase',
    'config': [
        {
            'Key': 'party.heading',
            'Iswebshow': true,
            'Displayname': 'Party Details',
            'Ismobileshow': true,
        },
        {
            'Key': 'party.name',
            'Iswebshow': false,
            'Displayname': 'Party Name',
            'Ismobileshow': false,
        },
        {
            'Key': 'party.date',
            'Iswebshow': false,
            'Displayname': 'Party Date',
            'Ismobileshow': true,
        },
        {
            'Key': 'vehicle.heading',
            'Iswebshow': false,
            'Displayname': 'Vehicle Details',
            'Ismobileshow': true,
        },
        {
            'Key': 'vehicle.amount',
            'Iswebshow': false,
            'Displayname': 'Amount',
            'Ismobileshow': false,
        },
        {
            'Key': 'vehicle.year',
            'Iswebshow': false,
            'Displayname': 'Vehicle Year',
            'Ismobileshow': true,
        },
        {
            'Key': 'approvalStatus.heading',
            'Iswebshow': false,
            'Displayname': 'Approval Status',
            'Ismobileshow': true,
        },
        {
            'Key': 'approvalStatus.ApprovalStatus',
            'Iswebshow': false,
            'Displayname': 'Approval Status',
            'Ismobileshow': true,
        },
    ],
    'createdAt': '2025-04-12T13:03:10.000Z',
    'updatedAt': '2025-04-15T13:03:22.000Z',
    'deletedAt': null,
};

export default function CreateParty() {
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
            <Heading name="Create Party " showBack={true} />
            <ScrollView>
                <FormProvider {...methods}>

                    <View style={CommonStyles.mainBlock}>
                        <FormDropdown
                            control={control}
                            name="partyType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Party Type'}
                            dropdownStyle={CommonStyles.largeDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'handLoanAgent', 'string')}
                        />

                        <FormInput
                            label={'Party Name'}
                            name={'partyName'}
                            onChange={(e) => handleInputChange(e, 'partyName', 'string')}
                            control={control}
                            style={CommonStyles.largeInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />

                        {/* } */}
                        <FormInput
                            label={'Mobile No'}
                            name={'mobileNo'}
                            onChange={(e) => handleInputChange(e, 'mobileNo', 'string')}
                            control={control}
                            style={CommonStyles.miniDropdown}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        {/* {
                        ShowField('vehicle.amount', moduleSettings) && */}
                        <FormInput
                            label={'Alternate Mobile No '}
                            name={'alternateMobileNo'}
                            onChange={(e) => handleInputChange(e, 'alternateMobileNo', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        {/* } */}
                        <FormInput
                            label={'Aadhar Number '}
                            name={'Aadhar Number'}
                            onChange={(e) => handleInputChange(e, 'Aadhar Number', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormDropdown
                            control={control}
                            name="gender"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Gender'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'gender', 'string')}
                        />
                        {/* <DatePickerInputForFilter
                            label="Date of Birth"
                            name={'date'}
                            date={date}
                            style={styles.inputDoc}
                            onConfirm={(date) => { handleDateConfirm(date, 'date'); }}
                            isDisabled={false}
                            maximumDate={new Date()}  
                            placeholder="DD-MM-YYYY"
                        /> */}
                        <FormInput
                            label={'Date Of Birth '}
                            name={'dateOfBirth'}
                            onChange={(e) => handleInputChange(e, 'dateOfBirth', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Age '}
                            name={'age'}
                            onChange={(e) => handleInputChange(e, 'age', 'string')}
                            control={control}
                            // style={styles.inputAge}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        {/* </View> */}


                        <FormInput
                            label={'Occupation '}
                            name={'occupation'}
                            onChange={(e) => handleInputChange(e, 'occupation', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />

                        <FormInput
                            label={'Monthly Income '}
                            name={'monthlyIncome'}
                            onChange={(e) => handleInputChange(e, 'monthlyIncome', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />

                        <View style={CommonStyles.uploadBox}>
                            <AddIcon name="add" size={40} color="#900" />
                        </View>
                    </View>

                    <AddressDetails
                        sameAsPermanent={sameAsPermanent}
                        setSameAsPermanent={setSameAsPermanent}
                        handleInputChange={handleInputChange}
                    />

                    <BankDetails
                        sameAsPermanent={sameAsPermanent}
                        setSameAsPermanent={setSameAsPermanent}
                        handleInputChange={handleInputChange}
                    />
                    <GstDetails
                        sameAsPermanent={sameAsPermanent}
                        setSameAsPermanent={setSameAsPermanent}
                        handleInputChange={handleInputChange}
                    />
                    <BalanceDetails
                        sameAsPermanent={sameAsPermanent}
                        setSameAsPermanent={setSameAsPermanent}
                        handleInputChange={handleInputChange}
                    />

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

