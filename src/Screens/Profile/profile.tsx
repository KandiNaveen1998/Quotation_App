import { useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FormDropdown from '../../reusableComponents/FormDropdown';
import { useForm } from 'react-hook-form';
import IconLogOut from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-actions-sheet';
import FormButton from '../../reusableComponents/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function Profile() {
    const handleBack = () => {
        navigation.goBack();
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [logInData, setLogInData] = useState<any>({});
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        trigger,
        reset,
        getValues,
    } = useForm({
    });
    const data = [{}];
    const logOutRef = useRef(null);
    const actionSheetRef = useRef(null);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleInputChange = () => {
        console.log('clf');
    };
    const modelOpen = () => {
        setIsModalVisible(true);

        actionSheetRef.current?.show();
        // setSelectedReceipt()
    };
    const handleClose = () => {
        handleOptionClick('Cancel'); // Call on close
    };
    const handleOptionClick = (option) => {
        modelClose(option);
        actionSheetRef.current?.hide();
    };
    const modelClose = (from) => {
        setIsModalVisible(false);
        actionSheetRef.current?.hide();
    };
    const clearStoresAndNavigate = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.clear();
            // Call clear functions for other Zustand stores similarly
            // Navigate to login screen
            navigation.replace('Login');
        } catch (error) {
            console.error('error while logout', error);

        }
    };

    return (
        <>
            <SafeAreaView style={styles.containerProfile}>
                
                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={handleBack}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View><Text style={styles.textProfile}>PROFILE</Text></View>
                    <View><Text /></View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.shadowContainer}>
                        {/* <Image source={require('../../../../assets/profile.png')} style={styles.imagesUser} /> */}
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{
                                // `${capitalizeFirstLetter(logInData?.name)} ${capitalizeFirstLetter(logInData?.surname)} `
                                logInData?.uname || ''
                            }</Text>
                            <Text style={styles.userEmail}>{logInData?.emailAddress || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.formButton}>

                        <FormDropdown
                            control={control}
                            name="handLoanAgent"
                            rules={{ required: 'This field is required' }}
                            options={data}
                            displayKey={'label'}
                            label={'Company'}
                            dropdownStyle={styles.dropdown}  // Combine styles using an array
                            labelCss={styles.labelCss}  // Combine styles using an array
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'handLoanAgent')}
                        />
                        <FormDropdown
                            control={control}
                            name="handLoanAgent"
                            rules={{ required: 'This field is required' }}
                            options={data}
                            displayKey={'label'}
                            label={'Branch'}
                            dropdownStyle={styles.dropdown}  // Combine styles using an array
                            labelCss={styles.labelCss}  // Combine styles using an array
                            valueKey={'id'}
                            onChange={(e) => handleInputChange(e, 'handLoanAgent')}
                        />
                        <TouchableOpacity style={styles.logOutBlock} onPress={() => modelOpen()}>
                            <View style={styles.iconLogOut}><IconLogOut name="logout" color="#fff" size={20} /></View>
                            <Text style={styles.textLogout}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Text>Powered by</Text>
                    {/* <Image source={require('../../../../assets/pactEazy.png')}  /> */}
                    {/* <PacteazyIcon style={styles.imagesPact} /> */}
                </View>


                <ActionSheet
                    ref={actionSheetRef}
                    gestureEnabled={true}
                    onClose={handleClose}
                >
                    {/* <View style={styles.modalBackground}> */}
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderLeft}>Logout ?</Text>
                            <Text style={styles.textPermission}>Are you sure want Logout</Text>

                            {/* <TouchableOpacity
                                onPress={() => { modelClose("close") }}
                            ><IconClose color='rgba(255, 0, 0, 0.8)' size={22} name="close" />
                            </TouchableOpacity> */}



                        </View>
                        <FormButton
                            // onPress={handlePress}
                            onPress={() => clearStoresAndNavigate()}
                            title="Confirm"
                            // loading={submitLoading}
                            // disabled={submitLoading}
                            buttonStyle={styles.buttonConfirm}
                            textStyle={styles.buttonText}
                            loaderColor="#fff" // Customize loader color
                            loaderSize="small" // Customize loader size (small/large or a numeric value)
                        // rippleColor="rgba(255, 0, 0, 0.1)" // Customize ripple color
                        // disabledStyle={styles.customDisabledButton} // Custom disabled style
                        />
                        <FormButton
                            // onPress={handlePress}
                            onPress={() => { modelClose('close'); }}
                            title="Cancel"
                            // loading={submitLoading}
                            // disabled={submitLoading}
                            buttonStyle={styles.buttonCancel}
                            textStyle={styles.buttonTextcancel}
                            loaderColor="#fff" // Customize loader color
                            loaderSize="small" // Customize loader size (small/large or a numeric value)
                        // rippleColor="rgba(255, 0, 0, 0.1)" // Customize ripple color
                        // disabledStyle={styles.customDisabledButton} // Custom disabled style
                        />
                    </View>
                    {/* </View> */}
                </ActionSheet>
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    buttonTextcancel: {
        color: 'rgba(32, 35, 37, 1)',
    },
    buttonCancel: {
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
    },
    buttonConfirm: {
        width: '100%',
        height: 40,
    },
    textPermission: {
        color: 'rgba(9, 10, 10, 1)',
        fontSize: 17,
        textAlign: 'center',
    },
    modalHeaderLeft: {
        fontWeight: '700',
        fontSize: 24,

    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingTop: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background

    },
    modalContainer: {
        backgroundColor: '#fff',
        // padding: 20,
        flexDirection: 'column',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingHorizontal: 40,
        gap: 20,
    },
    textLogout: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgba(37, 42, 68, 1)',
    },
    logOutBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20,
    },
    iconLogOut: {
        backgroundColor: 'rgba(34, 0, 165, 1)',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 12,
    },
    textProfile: {
        color: '#fff',
        letterSpacing: 0.5,
        marginRight: 20,
        fontWeight: '500',
        fontSize: 22,
        // marginTop:3
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
    },
    userEmail: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 14,
    },
    userDetails: {
        alignItems: 'center',
    },
    containerProfile: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeader: {
        // backgroundColor: 'rgba(27, 20, 100, 1)',
        backgroundColor: '#210A7D',
        height: 250,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 25,
        gap: 25,
    },
    shadowContainer: {
        backgroundColor: '#fff',
        marginTop: -120,
        height: 220,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        flexDirection: 'column',
    },
    imagesUser: {
        width: 70,
        height: 70,
    },
    bottom: {
        position: 'absolute',   // Anchor the element to the bottom of the screen
        bottom: 15,              // Set it to the bottom of the screen
        left: 0,                // Stretch across the screen width
        right: 0,               // Stretch across the screen width
        paddingVertical: 10,    // Adjust padding as needed
        alignItems: 'center',   // Center horizontally
        justifyContent: 'center', // Center vertically
        backgroundColor: '#fff', // Optional background color
        zIndex: 1,               // Make sure it appears on top if necessary
    },
    imagesPact: {
        width: 350,
        height: 60,
    },
    dropdown: {
        width: '100%',
        height: 48,
        borderRadius: 8,
    },
    labelCss: {
        marginBottom: 5,
        fontSize: 16.5,
        fontWeight: '400',
    },
    formButton: {
        gap: 20,
    },
});
