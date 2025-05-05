import React, { JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PurchaseList from '../Purchase/PurchaseList/PurchaseList';

import CreateParty from '../party/CreateParty';

import Profile from '../Profile/profile';
import SaleForm from '../Sale/saleForm';
import SaleList from '../Sale/SaleList/SaleList';
import EnquiryCreate from '../Enquiry/EnquiryForm';
import ExpensesCreate from '../Expenses/ExpensesForm';
import StockByCounter from '../stockByCounter/stockByCounter';

// import PurchaseForm from '../Purchase/PurchaseForm'; // Uncomment if needed

// 1. Define types for each screen in the bottom tab
export type BottomTabParamList = {
    PurchaseList: { refresh: boolean } | undefined;
    SaleList: { refresh: boolean } | undefined;
    Profile: undefined;
    // PurchaseForm: { selectedObjectId: number } | undefined;
    PartyCrate: undefined;
    // SaleForm: undefined;
};

// 2. Create a typed bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = (): JSX.Element => {
    return (
        <Tab.Navigator
            initialRouteName="StockByCounter"
            screenOptions={{
                tabBarActiveTintColor: 'rgba(27, 20, 100, 1)',
                tabBarInactiveTintColor: 'rgba(138, 134, 134, 1)',
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: '400',
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="PurchaseList"
                component={PurchaseList}
                options={{ lazy: true }}
            />
            <Tab.Screen
                name="SaleList"
                component={SaleList}
                options={{ lazy: true }}
            />
            <Tab.Screen
                name="PartyCrate"
                component={CreateParty}
                options={{ lazy: true }}
            />
              <Tab.Screen
                name="StockByCounter"
                component={StockByCounter}
                options={{ lazy: true }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ lazy: true }}
            />
       
        </Tab.Navigator>

    );
};

export default BottomTabs;
