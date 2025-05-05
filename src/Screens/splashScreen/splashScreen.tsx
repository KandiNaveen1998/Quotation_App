// import { StatusBar } from "react-native"


// const STYLES = ['default', 'dark-content', 'light-content'] as const;
// const TRANSITIONS = ['fade', 'slide', 'none'] as const;


// const SplashScreenComponent = ({ navigation }) => {

//     return (
//         <>
//             <StatusBar
//                 animated={true}
//                 backgroundColor="#61dafb"
//                 barStyle={statusBarStyle}
//                 showHideTransition={statusBarTransition}
//                 hidden={hidden}
//             />
//         </>
//     )
// }

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import PacteazyIcon from '../../reusable/Icons/PacteazyIcon';
// import { getData } from '../../utails/asyncStorageMethods/AsyncMethods';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../types/navigation'; // You need to define this
import { Text } from '@react-navigation/elements';
import { LogInStore } from '../../utils/Stores/ZustandStore';
import { RootStackParamList } from '../../types/navigation';
import { LoginData } from '../../utils/Stores/zustandStoreTypes';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreenComponent: React.FC = () => {


    const navigation = useNavigation<SplashScreenNavigationProp>();

    const LOGIN_Data = LogInStore((state) => state.LOGIN_Data);
    // const clearLOGIN_Data = LogInStore((state) => state.clearLOGIN_Data);

    const [loginData, setLoginData] = useState<LoginData | null | undefined>(); // You can define an interface for loginData instead of `any`

    useEffect(() => {
        // clearLOGIN_Data();
        const checkLoginStatus = async () => {
            try {
                // const loginData = await getData('logInData');
                // console.log("loginData in local", loginData);
                // setLoginData(loginData);

                setLoginData(LOGIN_Data);


                setTimeout(() => {
                    if (loginData?.loginToken || LOGIN_Data?.loginToken) {
                        navigation.replace('BottomTabs');
                    } else {
                        navigation.replace('Login');
                    }
                }, 1000);
            } catch (error) {
                console.error('Error checking login status:', error);
                setTimeout(() => {
                    navigation.replace('Login');
                }, 1000);
            }
        };

        checkLoginStatus();
    }, [navigation, LOGIN_Data?.loginToken]);



    return (
        <View style={styles.container}>
            {/* <StatusBar style="dark" /> */}
            {/* <PacteazyIcon /> */}
            <Text>Spalsh screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreenComponent;
