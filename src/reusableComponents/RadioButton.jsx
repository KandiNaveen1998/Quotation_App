// components/RadioButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  radioLabelCss?: TextStyle;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress, radioLabelCss }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={22}
        color="rgba(27, 20, 100, 1)"
      />
      <Text style={[styles.label, radioLabelCss]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  } ,
  label: {
    marginLeft: 10,
    color: "rgba(131, 122, 136, 1)",
    fontSize: 13,
    marginBottom: 0,
  } ,
});
