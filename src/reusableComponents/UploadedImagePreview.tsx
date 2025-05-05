import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface UploadedImagePreviewProps {
    title: string;
    imageUri: string;
    onDownload: () => void;
    onDelete: () => void;
}

const UploadedImagePreview: React.FC<UploadedImagePreviewProps> = ({
    title,
    imageUri,
    onDownload,
    onDelete,
}) => {
    return (
        <View style={styles.containerUploadedImagePreview}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={onDownload} style={styles.iconBtn}>
                        <Icon name="download" size={22} color="#1B1464" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                        <MaterialIcon name="delete-outline" size={22} color="#D9534F" />
                    </TouchableOpacity>
                </View>
            </View>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        </View>
    );
};

export default UploadedImagePreview;

const styles = StyleSheet.create({
    containerUploadedImagePreview: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 13,
        // fontWeight: 'bold',
        color: 'rgba(37, 42, 68, 1)',
    },
    actions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 10,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Shadow for Android
        // elevation: ,

    },
});
