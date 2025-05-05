import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface RowData {
    docNo: string;
    pending: string;
    balance: string;
    link: string;
    type: 'green' | 'red';
}

interface Style {
    containerLinkSummary: ViewStyle;
    subHeading: TextStyle;
    summaryRow: ViewStyle;
    summaryBox: TextStyle;
    cashIn: TextStyle;
    cashOut: TextStyle;
    table: ViewStyle;
    tableHeader: ViewStyle;
    headerText: TextStyle;
    row: ViewStyle;
    cell: TextStyle;
    greenText: TextStyle;
    redText: TextStyle;
    cashOutText: ViewStyle;
    cellDoc: TextStyle,
    headerTextDoc: TextStyle
}

const LinkSummary: React.FC = () => {
    const rowData: RowData[] = [
        { docNo: '12', pending: '100000', balance: '80,000', link: '20,000', type: 'green' },
        { docNo: '12', pending: '100000', balance: '80,000', link: '20,000', type: 'red' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.containerLinkSummary}>
            {/* Cash-In & Cash-Out Summary */}
            <View style={styles.summaryRow}>
                <Text style={[styles.summaryBox, styles.cashIn]}>
                    Total Cash-In 1,00,000
                </Text>
                <View style={styles.cashOutText}>
                    <Text style={styles.subHeading}>You can link upto</Text>
                    <Text style={[styles.summaryBox, styles.cashOut]}>
                        Total Cash-Out 40,000
                    </Text>
                </View>
            </View>

            {/* Table Section */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={styles.headerTextDoc}>Doc No</Text>
                    <Text style={styles.headerText}>Pending Amt</Text>
                    <Text style={styles.headerText}>Balance Amt</Text>
                    <Text style={styles.headerText}>Link Amt</Text>
                </View>

                {/* Table Rows - Looped */}
                {rowData.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.cellDoc, item.type === 'green' ? styles.greenText : styles.redText]}>
                            {item.docNo}
                        </Text>
                        <Text style={[styles.cell, item.type === 'green' ? styles.greenText : styles.redText]}>
                            {item.pending}
                        </Text>
                        <Text style={styles.cell}>{item.balance}</Text>
                        <Text style={[styles.cell, item.type === 'green' ? styles.greenText : styles.redText]}>
                            {item.link}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default LinkSummary;

const styles = StyleSheet.create<Style>({
    containerLinkSummary: {
        backgroundColor: '#fff',
    },
    subHeading: {
        color: '#2C99F0',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-end',
        gap: 10,
    },
    cashOutText: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    summaryBox: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 13,
        fontWeight: '500',
    },
    cashIn: {
        backgroundColor: 'rgba(244, 247, 246, 1)',
        color: 'rgba(128, 181, 119, 1)',
    },
    cashOut: {
        backgroundColor: 'rgba(244, 247, 246, 1)',
        color: 'rgba(255, 107, 107, 1)',
    },
    table: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F4F5F6',
        paddingVertical: 10,
        flex:1
        // justifyContent: 'space-between',
    },
    headerTextDoc: {
        fontSize: 12,
        color: '#414D55',
        marginLeft: 10,
        width: 55
    },
    headerText: {
        fontSize: 12,
        color: '#414D55',
        marginLeft: 10,
        width: 100


    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        flex:1

    },
    cellDoc: {
        fontSize: 14,
        color: '#414D55',
        marginLeft: 10,
        width: 55
    },
    cell: {
        fontSize: 14,
        color: '#414D55',
        marginLeft: 10,
        width: 100


    },
    greenText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    redText: {
        color: '#F44336',
        fontWeight: 'bold',
    },
});
