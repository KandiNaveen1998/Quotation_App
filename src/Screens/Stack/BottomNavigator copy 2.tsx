import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import PurchaseList from '../Purchase/PurchaseList/PurchaseList';
import CreateParty from '../party/CreateParty';
import Profile from '../Profile/profile';
import SaleList from '../Sale/SaleList/SaleList';
import StockByCounter from '../stockByCounter/stockByCounter';
import VehicleCreate from '../Vehicle/VehicleForm';
import Navigation from '../navigations';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          if (route.name === 'PartyCrate') {
            return (
              <View key={route.name} style={styles.plusButtonWrapper}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                  <View style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          const iconName = getIconName(route.name);
          const label = getLabel(route.name);
          const color = isFocused ? '#1B1464' : '#8A8686';

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Icon name={iconName} size={26} color={color} />
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="PurchaseList" component={PurchaseList} />
      <Tab.Screen name="SaleList" component={CreateParty} />
      <Tab.Screen name="PartyCrate" component={Navigation} />
      <Tab.Screen name="StockByCounter" component={StockByCounter} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

// ----------------------------------------
// 🎨 Styles (perfect match with screenshot)
// ----------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    elevation: 20,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:10,
    // paddingBottom: Platform.OS === 'ios' ? 25 : 10,
  
    // iOS Shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 }, // Even shadow in all directions
    shadowRadius: 15,
  
    // Android shadow
    elevation: 0,
  
    // Required for proper shadow rendering
    zIndex: 10,
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden', // Needed to allow shadow to show
  },
  
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#8A8686',
    marginTop: 4,
  },
  labelFocused: {
    color: '#1B1464',
    fontWeight: '600',
  },
  plusButtonWrapper: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    // Android shadow
    elevation: 12,
    zIndex: 10,
  },   
  plusButton: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#1B1464',
    justifyContent: 'center',
    alignItems: 'center',
        // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  
    // Android shadow
    elevation: 12,
  },
  plusText: {
    fontSize: 32,
    color: '#fff',
    marginTop: -2,
  },
});

const getIconName = (name: string) => {
  switch (name) {
    case 'PurchaseList':
      return 'home';
    case 'SaleList':
      return 'search';
    case 'StockByCounter':
      return 'book-open';
    case 'Profile':
      return 'user';
    default:
      return 'circle';
  }
};

const getLabel = (name: string) => {
  switch (name) {
    case 'PurchaseList':
      return 'Home';
    case 'SaleList':
      return 'Search';
    case 'StockByCounter':
      return 'Day Sheet';
    case 'Profile':
      return 'Profile';
    default:
      return '';
  }
};
