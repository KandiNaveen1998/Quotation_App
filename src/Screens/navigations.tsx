import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const data = [
  { label: 'Services', icon: 'cube-outline', screen: 'ServiceForm' },
  { label: 'Enquiry', icon: 'dashboard-customize', screen: 'EnquiryCreate' },
  { label: 'Party', icon: 'account-multiple', screen: 'CreateParty' },
  { label: 'Vehicle ', icon: 'motorbike', screen: 'VehicleForm' },
  { label: 'Expenses', icon: 'cash-minus', screen: 'ExpensesCreate' },
  { label: 'Advance Receipt', icon: 'cash-plus', screen: 'AdvanceReceiptForm' },
  { label: 'Advance Payment', icon: 'cash-plus', screen: 'AdvancePaymentForm' },
  { label: 'Payment', icon: 'file-document-outline', screen: 'PaymentForm' },

  { label: 'Receipt', icon: 'cart-outline', screen: 'ReceiptForm' },
  { label: 'Link Payment', icon: 'file-certificate-outline', screen: 'LinkedPaymentForm' },
  { label: 'Banking', icon: 'bank', screen: 'BankingScreen' },
  { label: 'Bills', icon: 'file-document', screen: 'BillsScreen' },
  { label: 'Payments Made', icon: 'cash-remove', screen: 'PaymentsMadeScreen' },
  { label: 'Vendor Credits', icon: 'credit-card-refund-outline', screen: 'VendorCreditsScreen' },
  { label: 'Projects', icon: 'briefcase-outline', screen: 'ProjectsScreen' },
  { label: 'Timesheets', icon: 'clock-outline', screen: 'TimesheetsScreen' },
  { label: 'Timer', icon: 'timer-outline', screen: 'TimerScreen' },
  { label: 'Documents', icon: 'file-outline', screen: 'DocumentsScreen' },
  { label: 'Reports', icon: 'chart-bar', screen: 'ReportsScreen' },
  { label: 'Settings', icon: 'cog-outline', screen: 'SettingsScreen' },
  { label: 'e-Way Bills', icon: 'truck-fast-outline', screen: 'eWayBillsScreen' },
];

const numColumns = 5;
const size = Dimensions.get('window').width / numColumns;

const NavigationGrid = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.label}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.screen)}>
          <Icon name={item.icon} size={30} color="#448aff" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  item: {
    width: size,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 11,
    color: '#448aff',
    textAlign: 'center',
  },
});

export default NavigationGrid;
