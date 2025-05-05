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
import BikeGallery from './bikeGallery';


export default function VehicleCreate() {
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
    const onSubmit = async (values: FormData) => {
    }
    return (
        <>
            <Heading name="Create Vehicle " showBack={true} />
            <ScrollView>
                <FormProvider {...methods}>
                    <View style={CommonStyles.mainBlock}>
                        <View style={CommonStyles.headerRow}>
                            <Text style={CommonStyles.subTitle}>Vehicle Details</Text>
                        </View>
                        <FormInput
                            label="Vehicle Number"
                            name="vehicleNumber"
                            onChange={(e: string) => handleInputChange(e, 'vehicleNumber')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                        />
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
                        <FormInput
                            label="Engine Number"
                            name="engineNumber"
                            onChange={(e: string) => handleInputChange(e, 'engineNumber')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                        />
                        <FormInput
                            label="Chassis Number"
                            name="chassisNumber"
                            onChange={(e: string) => handleInputChange(e, 'chassisNumber')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                        />
                        <FormDropdown
                            control={control}
                            name="vehicleColor"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Vehicle Color'}
                            // dropdownStyle={[styles.dropdown]}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            // placeholder="Select Gender"
                            onChange={(e) => handleInputChange(e, 'vehicleColor', 'string')}
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
                        <FormInput
                            label="Market Value"
                            name="marketValue"
                            onChange={(e: string) => handleInputChange(e, 'marketValue')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            control={control}
                        />
                        <BikeGallery />
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
                            onPress={() => onSubmit(getValues())}
                            title="Submit"
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

