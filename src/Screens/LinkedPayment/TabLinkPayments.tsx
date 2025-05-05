import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  docNo: string;
  date: string;
  transaction: string;
  amount: string;
  paidAmount: string;
  pendingAmount: string;
  checked: boolean;
}

interface CardProps extends Transaction {
  onToggleCheck: () => void;
}

const initialLayout = { width: Dimensions.get('window').width };

const TransactionCard: React.FC<CardProps> = ({
  docNo,
  date,
  transaction,
  amount,
  paidAmount,
  pendingAmount,
  checked,
  onToggleCheck,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftBorder} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Doc.No</Text>
            <Text style={styles.link}>{docNo}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.link}>{date}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Transaction</Text>
            <Text style={styles.value}>{transaction}</Text>
          </View>
          <TouchableOpacity onPress={onToggleCheck}>
            {/* <Ionicons
              name={checked ? 'checkbox' : 'square-outline'}
              size={24}
              color={checked ? '#1D1D4E' : '#aaa'}
            /> */}
          </TouchableOpacity>
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <View style={styles.col}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{amount}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Paid Amount</Text>
            <Text style={styles.value}>{paidAmount}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Pend Amount</Text>
            <View style={styles.pendBox}>
              <Text style={styles.pendAmount}>{pendingAmount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const TabLinkPayment: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'receipts', title: 'Pending Receipts' },
    { key: 'payments', title: 'Pending Payments' },
  ]);

  const [receiptData, setReceiptData] = useState<Transaction[]>([
    {
      id: '1',
      docNo: '12',
      date: '24-04-2025',
      transaction: 'Sale',
      amount: '1,20,000',
      paidAmount: '20000',
      pendingAmount: '1.00.000',
      checked: true,
    },
    {
      id: '2',
      docNo: '13',
      date: '25-04-2025',
      transaction: 'Sale',
      amount: '1,00,000',
      paidAmount: '40,000',
      pendingAmount: '60,000',
      checked: false,
    },
  ]);

  const [paymentData] = useState<Transaction[]>([]);

  const toggleReceiptCheck = (id: string) => {
    setReceiptData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const renderReceipts = () => (
    <ScrollView style={styles.scene}>
      {receiptData.map((item) => (
        <TransactionCard
          key={item.id}
          {...item}
          onToggleCheck={() => toggleReceiptCheck(item.id)}
        />
      ))}
    </ScrollView>
  );

  const renderPayments = () => (
    <ScrollView style={styles.scene}>
      {paymentData.length === 0 ? (
        <Text style={styles.placeholder}>No Payments Found</Text>
      ) : (
        paymentData.map((item) => (
          <TransactionCard
            key={item.id}
            {...item}
            onToggleCheck={() => {}}
          />
        ))
      )}
    </ScrollView>
  );

  const renderScene = SceneMap({
    receipts: renderReceipts,
    payments: renderPayments,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#6BBF59' }}
          style={{ backgroundColor: '#fff' }}
          activeColor="#6BBF59"
          inactiveColor="gray"
          labelStyle={{ fontWeight: 'bold' }}
        />
      )}
    />
  );
};

export default TabLinkPayment;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7FAF8',
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9FBFA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  leftBorder: {
    width: 5,
    backgroundColor: '#6BBF59',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flex: 1,
  },
  label: {
    color: '#666',
    fontSize: 12,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0096CC',
    textDecorationLine: 'underline',
  },
  pendBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  pendAmount: {
    color: 'green',
    fontWeight: '600',
  },
});
