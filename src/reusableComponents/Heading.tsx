import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import SettingsIcon from 'react-native-vector-icons/Ionicons';

// Define props with TypeScript
interface HeadingProps {
    name: string;
    backTo?: string;
    settingsBtn?: boolean;
    showBack?: boolean;
    onFilterPress?: () => void;
}

export default function Heading({
    name,
    backTo,
    settingsBtn,
    showBack = false,
    onFilterPress
}: HeadingProps) {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleBack = () => {
        if (backTo) {
            navigation.navigate(backTo);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                {showBack && (
                    <TouchableOpacity onPress={handleBack}>
                        <Icon name="chevron-left" size={27} color="rgba(138, 134, 134, 1)" />
                    </TouchableOpacity>
                )}

                <Text style={styles.header}>{name}</Text>
            </View>

            {settingsBtn && (
                <TouchableOpacity onPress={onFilterPress} style={styles.settingsBtn}>
                    <SettingsIcon name="options-outline" size={24} color="rgba(138, 134, 134, 1)" />
                    <Text style={styles.textSettings}>Settings</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    containerLeft: {
        flexDirection: "row",
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        marginBottom: 2,
        fontWeight: '500',
        color: '#210A7D',
        paddingTop: 8,
        paddingLeft: 15,
        paddingBottom: 8,
    },
    container: {
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    settingsBtn:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    textSettings:{
        color:'rgba(37, 42, 68, 1)',
        fontWeight:'600',
        letterSpacing:.5,
        fontSize:17
    }
});
