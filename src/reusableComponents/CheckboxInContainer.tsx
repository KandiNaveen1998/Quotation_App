import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Define check states as enum for better type safety
export enum CheckState {
    UNSELECTED = 0,
    INTERMEDIATE = 1,
    SELECTED = 2,
}

interface CheckBoxItemProps {
    name: string;
    selected: CheckState;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    itemObject?: {
        itemObject?: {
            isLast?: boolean;
        };
    };
}

export const CheckBoxItem: React.FC<CheckBoxItemProps> = ({
    name,
    selected,
    onPress,
    style,
    itemObject,
}) => {
    const isLast = itemObject?.itemObject?.isLast ?? false;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                style,
                {
                    borderBottomColor: isLast ? '#1b1464' : 'transparent',
                    borderBottomWidth: isLast ? 2 : 0,
                    paddingBottom: isLast ? 5 : 0,
                },
            ]}
            onPress={onPress}
        >
            <View style={styles.checkbox}>
                {selected !== CheckState.UNSELECTED && (
                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                backgroundColor: selected === CheckState.SELECTED ? '#1b1464' : 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        {selected === CheckState.SELECTED && (
                            <FontAwesome5 name="check" size={12} color="white" />
                        )}
                        {selected === CheckState.INTERMEDIATE && (
                            <View style={styles.intermediateIndicator} />
                        )}
                    </View>
                )}
            </View>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    checkbox: {
        width: 16,
        height: 16,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intermediateIndicator: {
        width: 10,
        height: 2,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
    },
});
