import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Heading from '../../reusableComponents/Heading';
import FormDropdown from '../../reusableComponents/FormDropdown';
import FormInput from '../../reusableComponents/FormInputText';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CommonStyles from '../../reusableComponents/CommonStyles';
import { styles } from '../Purchase/PurchaseForm';
import FormDate from '../../reusableComponents/FormDate';
import FormButton from '../../reusableComponents/FormButton';


export default function EnquiryCreate() {
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
            <Heading name="Create Enquiry " showBack={true}  />
            <ScrollView>
                <FormProvider {...methods}>
                    <View style={CommonStyles.mainBlock}>
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
                        <View style={CommonStyles.headerRow}>
                            <Text style={CommonStyles.subTitle}>Customer Details</Text>
                        </View>
                        <FormInput
                            label={'Customer'}
                            name={'customer'}
                            onChange={(e) => handleInputChange(e, 'customer', 'string')}
                            control={control}
                            style={CommonStyles.largeInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Mobile No'}
                            name={'mobileNo'}
                            onChange={(e) => handleInputChange(e, 'mobileNo', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
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
                            label={'Occupation '}
                            name={'email'}
                            onChange={(e) => handleInputChange(e, 'email', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Occupation '}
                            name={'occupation'}
                            onChange={(e) => handleInputChange(e, 'occupation', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormDropdown
                            control={control}
                            name="planningDays"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Planning Days'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'planningDays', 'string')}
                        />

                        <FormInput
                            label={'Budget '}
                            name={'budget'}
                            onChange={(e) => handleInputChange(e, 'budget', 'string')}
                            control={control}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                        <FormInput
                            label={'Address '}
                            name={'address'}
                            onChange={(e) => handleInputChange(e, 'address', 'string')}
                            control={control}
                            // style={styles.inputAge}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                        />
                    </View>

                    <View style={CommonStyles.mainBlock}>
                        <View style={CommonStyles.headerRow}>
                            <Text style={CommonStyles.subTitle}>Vehicle Details</Text>
                        </View>
                        <FormDropdown
                            control={control}
                            name="Make"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Make'}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'make', 'string')}
                        />
                        <FormDropdown
                            control={control}
                            name="model"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Model'}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'model', 'string')}
                        />
                        <FormDropdown
                            control={control}
                            name="modelYear"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Model Year'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'modelYear', 'string')}
                        />
                        <FormDropdown
                            control={control}
                            name="color"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Color'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'color', 'string')}
                        />
                        <FormDropdown
                            control={control}
                            name="versionType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Version Type'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'versionType', 'string')}
                        />


                        <FormDropdown
                            control={control}
                            name="fuelType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Fuel Type'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'fuelType', 'string')}
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

