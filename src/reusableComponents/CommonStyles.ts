// styles/CommonStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

const CommonStyles = StyleSheet.create({

    mainBlock: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 15,
        padding: 12,
        borderRadius: 5,
        gap: 20,
        flexWrap: 'wrap',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth * 0.9,

    },
    largeInput: {
        width: screenWidth * 0.9,
    },
    miniInput: {
        width: screenWidth * 0.41,
    },
    largeDropdown: {
        width: screenWidth * 0.9,
    },
    miniDropdown: {
        width: screenWidth * 0.41,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
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
    formButtons: {
        alignItems: 'center',
        gap: 20,
        marginTop: 20, // Adjust margin if necessary
        flexDirection: 'row',
        marginHorizontal: 15,
        marginBottom: 80,
    },
        buttonCancel: {
        backgroundColor: '#fff',
        borderColor: 'rgba(225, 227, 230, 1)',
        borderWidth: 1,
    },
    buttonTextCancel: {
        color: 'rgba(128, 128, 128, 1)',
        fontSize: 16,
    },

    //   shadow: {
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 4,
    //     elevation: 4,
    //   },
    //   rounded: {
    //     borderRadius: 8,
    //   },
    //   center: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    //   textPrimary: {
    //     color: 'rgba(27, 20, 100, 1)',
    //     fontSize: 14,
    //     fontWeight: '600',
    //   },
});

export default CommonStyles;
