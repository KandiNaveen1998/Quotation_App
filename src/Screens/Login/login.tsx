import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../../reusableComponents/FormInputText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useEffect, useState } from 'react';
import { useApi } from '../../utils/hooks/useApi';
import { endpoints } from '../../utils/API/endpoints';
import { handleParamsData } from '../../utils/API/APIRelatedMethods';
import FormButton from '../../reusableComponents/FormButton';
import { LogInStore } from '../../utils/Stores/ZustandStore';
import { LogInStoreType } from '../../utils/Stores/zustandStoreTypes';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type loginPayload = {
    email: string,
    password: string,
    tenantCode: string
}
export default function Login() {
    const {
        control,
        setValue,
        formState: { errors },
        trigger,
        getValues,
    } = useForm({
        // resolver: yupResolver(loginValidationSchema),
    });
    const updateLOGIN_Data = LogInStore((state) => state.updateLOGIN_Data);
    const LOGIN_Data = LogInStore((state) => state.LOGIN_Data);

    const { data: LoginResponse, loading: loginLoading, request: fetchLogin, status: loginApiCallStatus } = useApi<any>();
    const [logInError, setLoginError] = useState<LogInStoreType | undefined>(undefined);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();


    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = async (value: any, fieldName: string) => {
        setValue(fieldName, value);
        await trigger(fieldName);
    };
    const onSubmit = async (values: any) => {
        // console.log("value in login", values);
        await fetchLogInData(values);
    };

    const fetchLogInData = async (values: any) => {
        try {
            let payload: loginPayload = {
                'email': values?.email,
                'password': values?.password,
                'tenantCode': values?.tenantCode,
            };
            // let payload = {
            //     "uname": "admin",
            //     "pwd": "admin"
            // };
            let url = handleParamsData(endpoints?.login, {});
            // console.log('payload', payload);

            setLoginError(undefined);
            // let url = 'https://mfd.picktech.in/authenticate/skml'
            console.log('url', url);
            const response = await fetchLogin({
                url: url,
                method: 'POST',
                timeout: 10000, // 10 seconds
                data: payload,
            });
            console.log('Login response:', response);
        } catch (error) {
            setLoginError('Something went wrong, try again');
            console.error('Error fetching Login:', error);
        }
    };
    useEffect(() => {
        if (LoginResponse) {
            console.log('LoginResponse', LoginResponse);
            updateLOGIN_Data(LoginResponse);
            navigation.replace('BottomTabs');
        }
    }, [LoginResponse, updateLOGIN_Data]);

    useEffect(() => {
        console.log('errors', errors);
        console.log('errors', JSON.stringify(errors));
    }, [errors]);


    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewLogin}>
                    <Text style={styles.header}>Welcome back !</Text>
                    <View style={styles.form}>
                        <FormInput
                            label={'Tenant Code'}
                            name={'tenantCode'}
                            onChange={(e) => handleInputChange(e, 'tenantCode')}
                            placeholder={'Enter Tenant Code'}
                            control={control}
                            style={styles.input}
                            secureTextEntry={false}
                            defaultValue="SKML"
                            returnKeyType="next" // Shows "Next" on the keyboard
                        // onSubmitEditing={() => secondInputRef.current.focus()} // Move to the next input
                        />
                        <FormInput
                            label={'Email'}
                            name={'email'}
                            onChange={(e) => handleInputChange(e, 'email')}
                            placeholder={'Enter Email'}
                            control={control}
                            style={styles.input}
                            secureTextEntry={false}
                            defaultValue="pact5@gmail.com"
                            returnKeyType="next" // Shows "Next" on the keyboard
                        // onSubmitEditing={() => secondInputRef.current.focus()} // Move to the next input
                        />
                        <FormInput
                            label={'Password'}
                            name={'password'}
                            onChange={(e) => handleInputChange(e, 'password')}
                            placeholder={'Enter Password'}
                            control={control}
                            style={styles.input}
                            secureTextEntry={!passwordVisible} // Hides password when true
                            rightIcon={
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <Icon
                                        name={passwordVisible ? 'eye' : 'eye-off'}
                                        size={20}
                                        color="#808080"
                                    />
                                </TouchableOpacity>
                            }
                            defaultValue="123456"
                            // ref={secondInputRef} // Forward the ref correctly
                            returnKeyType="done" // Shows "Done" on the keyboard
                            onSubmitEditing={() => onSubmit(getValues())} // Action on done
                        />
                    </View>
                    <View style={styles.btnLogin}>
                        <FormButton
                            // onPress={handlePress}
                            onPress={() => onSubmit(getValues())}
                            title="Login"
                            loading={loginLoading}
                            disabled={loginLoading}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            loaderColor="#fff" // Customize loader color
                            loaderSize="small" // Customize loader size (small/large or a numeric value)
                        // rippleColor="rgba(255, 0, 0, 0.1)" // Customize ripple color
                        // disabledStyle={styles.customDisabledButton} // Custom disabled style
                        />
                        {logInError && <Text style={styles.errorText}>{logInError}</Text>}
                        {/* {errors && <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>} */}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewLogin: {
        flexGrow: 1, // Ensures the content can scroll
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 120, // Ensure space at the bottom for the fixed footer
        gap: 60,
    },
    bottom: {
        position: 'absolute',   // Absolute positioning to stick it to the bottom
        bottom: 15,              // Stick to the bottom
        left: 0,                // Full width starting from the left
        right: 0,               // Full width extending to the right
        paddingVertical: 10,    // Adjust padding as needed
        alignItems: 'center',   // Center the text and image horizontally
        justifyContent: 'center', // Center the content vertically
        backgroundColor: '#fff', // Optional background color
    },
    imagesPact: {
        height: 60,
    },
    btnLogin: {
        alignItems: 'center',
        gap: 10,
        marginTop: 20, // Adjust margin if necessary
    },
    header: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 40,
    },
    form: {
        gap: 40,
    },
    button: {
        width: 220,
        backgroundColor: 'rgba(27, 20, 100, 1)',
        borderRadius: 8,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '500',

    },
    input: {
        width: 350,
        fontSize: 15,
        padding: 0,
        paddingRight: 40,
        paddingLeft: 15,
        color: '#000', // <-- force black
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

