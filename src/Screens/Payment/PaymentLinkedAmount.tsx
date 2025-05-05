import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FormInput from '../../reusableComponents/FormInputText';
import { FormProvider, useForm } from 'react-hook-form';
import CommonStyles from '../../reusableComponents/CommonStyles';

type PaymentData = {
    id: string;
    docNo: string;
    date: string;
    transaction: string;
    amount: number;
    paidAmount: number;
    pendAmount: number;
    payAmount: number;
    isHighlighted?: boolean;
};

const payments: PaymentData[] = [
    {
        id: '1',
        docNo: '12',
        date: '24-04-2025',
        transaction: 'Purchase',
        amount: 10000,
        paidAmount: 5000,
        pendAmount: 10000,
        payAmount: 5000,
        isHighlighted: true,
    },
    {
        id: '2',
        docNo: '12',
        date: '24-04-2025',
        transaction: 'Purchase',
        amount: 10000,
        paidAmount: 5000,
        pendAmount: 10000,
        payAmount: 5000,
        isHighlighted: false,
    },
];

const PaymentLinkedAmount = () => {
    const totalPaid = payments.reduce((acc, cur) => acc + cur.paidAmount, 0);
    const methods = useForm<FormData>({
        defaultValues: {},
    });
    let { getValues, setValue, control } = methods;
    const handleInputChange = (value: any, name: any, type: any) => {
        console.log('Input Changed:', { value, name, type });
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pending Payments</Text>
                <Text style={styles.headerAmount}>Total Paid : {totalPaid.toLocaleString()}</Text>
            </View>

            {/* Cards */}
            <FlatList
                data={payments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {/* Top Row */}

                        <View style={styles.columnData}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Doc.No / Date</Text>
                                <Text style={styles.link}>{item.docNo} / {item.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Paid Amount</Text>
                                <Text style={styles.value}>{item.paidAmount}</Text>
                            </View>
                        </View>

                        <View style={styles.columnData}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Transaction</Text>
                                <Text style={styles.value}>{item.transaction}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Pend Amount</Text>
                                <Text style={styles.value}>{item.pendAmount}</Text>
                            </View>
                        </View>

                        <View style={styles.columnData}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Amount</Text>
                                <Text style={styles.value}>{item.amount.toLocaleString()}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Pay Amount</Text>
                                <FormInput
                                    name={'Remarks'}
                                    onChange={(e) => handleInputChange(e, 'Remarks', 'string')}
                                    control={control}
                                    // style={styles.inputAge}
                                    style={styles.payAmount}
                                    secureTextEntry={false}
                                    keyboardType="default"
                                />
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default PaymentLinkedAmount;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1B1464',
    },
    headerAmount: {
        fontSize: 14,
        color: '#00B2FF',
        fontWeight: '600',
    },
    card: {
        backgroundColor: 'rgba(244, 247, 246, 1)',
        borderRadius: 5,
        padding: 12,
        paddingBottom:8,
        marginBottom: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    payAmount: {
        backgroundColor: '#fff',
        width:70,
        borderBottomWidth:0,
        height:35,
        color:'rgba(25, 156, 65, 1)',
        padding:0,
        // textAlign:'center'
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 6,
        gap: 5
    },
    columnData: {
        flexDirection: 'column',
        gap: 15
    },
    label: {
        fontSize: 13,
        color: 'rgba(131, 122, 136, 1)',
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 14,
        color: 'rgba(37, 42, 68, 1)',
        fontWeight: '500',
        flex: 1,
    },
    link: {
        fontSize: 14,
        color: '#00B2FF',
        textDecorationLine: 'underline',
        fontWeight: '600',
        flex: 1,
    },
    greenText: {
        color: 'green',
    },
    dottedLine: {
        borderStyle: 'dotted',
        borderWidth: 0.5,
        borderColor: '#00B2FF',
        marginVertical: 8,
    },
});
