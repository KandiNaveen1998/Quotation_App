import React, { useRef, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import IconPrint from 'react-native-vector-icons/Feather';
import IconWhatApp from 'react-native-vector-icons/Fontisto';
import PDFIcon from 'react-native-vector-icons/FontAwesome';
import ExcelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/MaterialIcons';
import IconClose from 'react-native-vector-icons/AntDesign';

interface SelectAllActionsModelProps {
    isModalVisible: boolean;
    modelClose: (option: string) => void;
}

const SelectAllActionsModel: React.FC<SelectAllActionsModelProps> = ({
    isModalVisible,
    modelClose,
}) => {
    const actionSheetRef = useRef<any>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isModalVisible) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
        setOpen(isModalVisible);
    }, [isModalVisible]);

    const handleOptionClick = (option: string) => {
        modelClose(option);
        actionSheetRef.current?.hide();
    };

    const handleClose = () => {
        handleOptionClick('Cancel');
    };

    return (
        <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={true}
            onClose={handleClose}
        >
            <View>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderLeft}>More </Text>
                    <TouchableOpacity onPress={() => modelClose('close')}>
                        <IconClose color="rgba(255, 0, 0, 0.8)" size={22} name="close" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleOptionClick('Print')}
                >
                    <IconPrint color="rgba(28, 152, 203, 1)" size={24} name="printer" />
                    <Text style={styles.modalButtonText}>Print</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleOptionClick('Whatsapp')}
                >
                    <IconWhatApp
                        color="rgba(28, 152, 203, 1)"
                        size={24}
                        name="whatsapp"
                    />
                    <Text style={styles.modalButtonText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleOptionClick('Pdf')}
                >
                    <PDFIcon
                        color="rgba(28, 152, 203, 1)"
                        size={24}
                        name="file-pdf-o"
                    />
                    <Text style={styles.modalButtonText}>PDF</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleOptionClick('Excel')}
                >
                    <ExcelIcon
                        color="rgba(28, 152, 203, 1)"
                        size={24}
                        name="google-spreadsheet"
                    />
                    <Text style={styles.modalButtonText}>Excel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleOptionClick('Share')}
                >
                    <ShareIcon color="rgba(28, 152, 203, 1)" size={24} name="share" />
                    <Text style={styles.modalButtonText}>Share</Text>
                </TouchableOpacity>
            </View>
        </ActionSheet>
    );
};

export default SelectAllActionsModel;

const styles = StyleSheet.create({
    modalHeader: {
        borderBottomColor: 'rgba(225, 227, 230, 1)',
        borderBottomWidth: 1,
        padding: 20,
        paddingBottom: 15,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
    },
    modalHeaderLeft: {
        fontWeight: '600',
        fontSize: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        fontSize: 18,
        color: 'rgba(28, 152, 203, 1)',
        marginLeft: 5,
    },
    modalButtonTextDelete: {
        fontSize: 18,
        color: 'rgba(255, 0, 0, 0.7)',
        marginLeft: 5,
    },
});
