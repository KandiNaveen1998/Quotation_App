import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import UserScreen from '../userScreen';
import Modules from '../modulesScreen';
import CreateParty from '../party/CreateParty';
import Login from '../Login/login';
import SplashScreenComponent from '../splashScreen/splashScreen';
import BottomTabs from './BottomNavigator';
import PurchaseForm from '../Purchase/PurchaseForm';
import Header from '../../layout/header';
import SaleForm from '../Sale/saleForm';
import VehicleListShowRoom from '../stockByCounter/vehicleListScreen';
import VehicleForm from '../Vehicle/VehicleForm';
import Navigation from '../navigations';
import ServiceForm from '../Service/ServiceForm';
import ExpensesCreate from '../Expenses/ExpensesForm';
import EnquiryCreate from '../Enquiry/EnquiryForm';
import AdvanceReceiptForm from '../AdvanceReceipt/AdvanceReceiptForm';
import AdvancePaymentForm from '../AdvancePayment/AdvancePaymentForm';
import PaymentForm from '../Payment/PaymentForm';
import ReceiptForm from '../Receipt/ReceiptForm';
import LinkedPaymentForm from '../LinkedPayment/LinkedPaymentForm';

export type RootStackParamList = {
    Home: undefined;
    Modules: undefined;
    CreateParty: undefined;
    Login: undefined;
    Splash: undefined;
    PurchaseForm: { selectedObjectId: number } | undefined;
    SaleForm: { selectedObjectId: number } | undefined;
    BottomTabs: undefined;
    VehicleListShowRoom: { showroomId: number }
    VehicleForm: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackComponent: React.FC = () => {
    return (
        <NavigationContainer>

            <Header />

            <Stack.Navigator initialRouteName="Splash">
                {/* <Stack.Screen name="Home" component={UserScreen} />
                <Stack.Screen name="Modules" component={Modules} /> */}

                <Stack.Screen
                    name="CreateParty"
                    component={CreateParty}
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Splash"
                    component={SplashScreenComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PurchaseForm"
                    component={PurchaseForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SaleForm"
                    component={SaleForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LinkedPaymentForm"
                    component={LinkedPaymentForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AdvancePaymentForm"
                    component={AdvancePaymentForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PaymentForm"
                    component={PaymentForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReceiptForm"
                    component={ReceiptForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AdvanceReceiptForm"
                    component={AdvanceReceiptForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EnquiryCreate"
                    component={EnquiryCreate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ExpensesCreate"
                    component={ExpensesCreate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VehicleForm"
                    component={VehicleForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ServiceForm"
                    component={ServiceForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VehicleListShowRoom"
                    component={VehicleListShowRoom}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Navigation"
                    component={Navigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BottomTabs"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackComponent;
