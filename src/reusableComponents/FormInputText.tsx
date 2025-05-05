import React, { useState, forwardRef, Ref, ReactNode } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Controller, Control, FieldValues, FieldPath, RegisterOptions } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  type?: string;
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  onChange?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  style?: object;
  labelCss?: object;
  errorCss?: object;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightIconStyles?: object;
  leftIconStyles?: object;
  inputCss?: object;
  disabled?: boolean;
  maxLength?: number;
  defaultValue?: string | number; // Make sure this type matches the field type
  secureTextEntry?: boolean;
  rightIconPress?: () => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  keyboardType?: TextInputProps['keyboardType'];
}

const FormInput = forwardRef(
  <T extends FieldValues>(
    {
      type = 'text',
      name,
      control,
      label,
      placeholder,
      rules,
      onChange,
      onBlur,
      style,
      labelCss,
      errorCss,
      leftIcon,
      rightIcon,
      rightIconStyles,
      leftIconStyles,
      inputCss,
      disabled = false,
      maxLength,
      defaultValue = '', // Ensure defaultValue is properly typed
      secureTextEntry = true,
      rightIconPress,
      returnKeyType = 'done',
      onSubmitEditing,
      keyboardType = 'default',
    }: FormInputProps<T>,
    ref: Ref<TextInput>
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={[styles.inputContainer, inputCss]}>
        {label && <Text style={[styles.label, labelCss]}>{label}</Text>}

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue} // This should be compatible with the field's type
          rules={rules}
          render={({
            field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value },
            fieldState: { error },
          }) => (
            <>
              <View style={styles.inputWrapper}>
                {leftIcon && (
                  <View style={[styles.leftIcon, leftIconStyles]}>
                    {leftIcon}
                  </View>
                )}
                <TextInput
                  ref={ref}
                  secureTextEntry={secureTextEntry}
                  keyboardType={keyboardType}
                  style={[
                    styles.input,
                    style,
                    error && styles.errorInput,
                    isFocused && styles.focusedInput,
                  ]}
                  placeholder={placeholder}
                  placeholderTextColor="rgba(0, 0, 0, 0.37)"
                  editable={!disabled}
                  maxLength={maxLength}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => {
                    setIsFocused(false);
                    fieldOnBlur();
                    if (onBlur) { onBlur(e); }
                  }}
                  onChangeText={(val) => {
                    fieldOnChange(val);
                    if (onChange) { onChange(val); }
                  }}
                  value={value}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={onSubmitEditing}
                />
                {rightIcon && (
                  <TouchableOpacity
                    onPress={rightIconPress}
                    style={[styles.rightIcon, rightIconStyles]}
                  >
                    {rightIcon}
                  </TouchableOpacity>
                )}
              </View>
              {error && (
                <Text style={[styles.errorText, errorCss]}>
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {},
  label: {
    color: 'rgba(131, 122, 136, 1)',
    fontSize: 13,
    marginBottom: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 37.1,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225, 227, 230, 1)',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingLeft: 2,
    marginTop: 3,
  },
  errorInput: {
    borderColor: 'red',
  },
  focusedInput: {
    borderColor: '#1B1464',
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
    top: 15,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 10,
  },
});

export default FormInput;
