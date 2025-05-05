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
import ReceiptLinkedAmount from './ReceiptLinkedAmount';


export default function ReceiptForm() {
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
            <Heading name="Create Receipt " showBack={true} />
            <ScrollView>
                <FormProvider {...methods}>
                    <View style={CommonStyles.mainBlock}>
                        <View style={styles.dateRow}>

                            < FormInput
                                label="Receipt No"
                                name="receiptNo"
                                onChange={(e: string) => handleInputChange(e, 'receiptNo', 'string')}
                                style={CommonStyles.miniInput}
                                secureTextEntry={false}
                                keyboardType="default"
                                control={control}
                            />

                            <FormDate
                                name="receiptDate"
                                control={control}
                                label="Receipt Date"
                                placeholder=""
                                maximumDate={new Date()}
                                onDateChange={(selectedDate) => {
                                    handleInputChange(selectedDate, 'receiptDate', 'string');
                                }}
                            />
                        </View>
                    </View>


                    <View style={CommonStyles.mainBlock}>

                        <FormDropdown
                            control={control}
                            name="party"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Party'}
                            dropdownStyle={CommonStyles.largeDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'party', 'string')}
                        />
                        < FormInput
                            label="Receipt Amount"
                            name="receiptAmount"
                            onChange={(e: string) => handleInputChange(e, 'receiptAmount', 'string')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                        <FormDropdown
                            control={control}
                            name="paymentType"
                            rules={{ required: 'This field is required' }}
                            options={[]}
                            displayKey={'name'}
                            label={'Payment Type'}
                            dropdownStyle={CommonStyles.miniDropdown}
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'paymentType', 'string')}
                        />
                        < FormInput
                            label="Reference"
                            name="reference"
                            onChange={(e: string) => handleInputChange(e, 'reference', 'string')}
                            style={CommonStyles.miniInput}
                            secureTextEntry={false}
                            keyboardType="default"
                            control={control}
                        />
                    </View>
                    <ReceiptLinkedAmount/>
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

