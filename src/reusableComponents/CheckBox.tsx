import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CheckBoxProps {
    selected: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    checkedIcon?: string;
    uncheckedIcon?: string;
    size?: number;
    color?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    selected,
    onPress,
    style,
    checkedIcon = 'check-square',
    uncheckedIcon = 'square',
    size = 16,
    color = '#007bff',
}) => {
    return (
        <TouchableOpacity style={styles.pressable} onPress={onPress}>
            <View
                style={[
                    styles.box,
                    { borderColor: selected ? color : 'grey' },
                    style,
                ]}
            >
                <FontAwesome5
                    name={selected ? checkedIcon : uncheckedIcon}
                    size={size}
                    color={selected ? color : 'grey'}
                />
            </View>
        </TouchableOpacity>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    box: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
