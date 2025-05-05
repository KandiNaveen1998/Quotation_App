import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
// import Checkbox from '@react-native-community/checkbox';

import { Control, useFormContext } from 'react-hook-form';
import FormInput from '../../reusableComponents/FormInputText';
import FormDropdown from '../../reusableComponents/FormDropdown';
import RadioButton from '../../reusableComponents/RadioButton';
import CommonStyles from '../../reusableComponents/CommonStyles';
const { width: screenWidth } = Dimensions.get('window');

interface Option {
  id: string | number;
  name: string;
}

interface BalanceDetailsProps {
  // control: Control<any>;
  sameAsPermanent: boolean;
  setSameAsPermanent: (val: boolean) => void;
  handleInputChange: (value: any, name: string, type?: string) => void;
  districtOptions?: Option[];
  stateOptions?: Option[];
  accommodationOptions?: Option[];
}

const BalanceDetails: React.FC<BalanceDetailsProps> = ({
  // control,
  sameAsPermanent,
  setSameAsPermanent,
  handleInputChange,
  districtOptions = [],
  stateOptions = [],
  accommodationOptions = [],
}) => {

  const { control, setValue, formState: { errors }, getValues } = useFormContext();
  const radioOptions = [
    { label: 'To Pay', value: 'pay' },
    { label: 'To Receive', value: 'receive' },
  ];
  const [selectedType, setSelectedType] = useState('pay');

  return (
    <View style={CommonStyles.mainBlock}>
      <View style={CommonStyles.headerRow}>
        <Text style={CommonStyles.subTitle}>Balance Details</Text>
      </View>

      <View style={styles.rowRadioBtns}>
        {radioOptions.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            selected={selectedType === option.value}
            onPress={() => setSelectedType(option.value)}
          />
        ))}
      </View>

        <FormInput
          label="Account Number"
          name="accountNumber"
          control={control}
          style={CommonStyles.largeInput}
          onChange={(e: any) => handleInputChange(e, 'accountNumber')}
        />
        <FormInput
          label="IFSC Code"
          name="ifscCode"
          control={control}
          style={CommonStyles.largeInput}
          onChange={(e: any) => handleInputChange(e, 'ifscCode')}
        />
    </View>
  );
};

export default BalanceDetails;

const styles = StyleSheet.create({
  rowRadioBtns: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
});
