import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
    Dimensions
} from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

interface FormButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title?: string;
    loading?: boolean;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loaderColor?: string;
    loaderSize?: 'small' | 'large';
    disabledStyle?: StyleProp<ViewStyle>;
    // rippleColor?: string; // Optional prop for ripple color
}

const FormButton: React.FC<FormButtonProps> = ({
    onPress,
    title = 'Button',
    loading = false,
    disabled = false,
    buttonStyle = {},
    textStyle = {},
    loaderColor = '#fff',
    loaderSize = 'small',
    disabledStyle = {},
    // rippleColor = 'rgba(255, 0, 0, 0.1)', // Default ripple color   
}) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                buttonStyle,
                isDisabled ? [styles.disabledButton, disabledStyle] : {},
            ]}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.buttonContent,
                    isDisabled ? [styles.disabledButton, disabledStyle] : {},
                ]}
            >
                {loading ? (
                    <ActivityIndicator size={loaderSize} color={loaderColor} />
                ) : (
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: screenWidth * .44,
        backgroundColor: 'rgba(27, 20, 100, 1)',
        borderRadius: 8,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 43,
        color: 'white',
        fontSize: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
    },
    disabledButton: {
        backgroundColor: '#D0D5DD',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FormButton;
