import React from 'react';
import { View, Text,Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width: screenWidth } = Dimensions.get('window');

const UploadImage: React.FC = () => {
    const handleUpload = () => {
        // TODO: Launch image picker here
        console.log('Upload button pressed');
    };

    return (
        <View style={styles.containerUploadImage}>
            <Text style={styles.label}>Upload Image</Text>
            <View style={styles.uploadBoxRow}>
                <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
                    <Icon name="add" size={32} color='color="#900"' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UploadImage;

const styles = StyleSheet.create({
    uploadBoxRow:{
    width: screenWidth * 0.9,
        alignItems: 'center',
        marginBottom: 12,
    },
    containerUploadImage: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        gap: 12,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(27, 20, 100, 1)',
    },
    uploadBox: {
        width: 110,
        height: 110,
        borderRadius: 10,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: 'rgba(27, 20, 100, 0.5)',
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
