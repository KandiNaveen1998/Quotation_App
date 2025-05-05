import React from 'react';
import { View, Text,Dimensions, StyleSheet } from 'react-native';
// import Checkbox from '@react-native-community/checkbox';

import { Control, useFormContext } from 'react-hook-form';
import FormInput from '../../reusableComponents/FormInputText';
import FormDropdown from '../../reusableComponents/FormDropdown';
import CommonStyles from '../../reusableComponents/CommonStyles';
const { width: screenWidth } = Dimensions.get('window');

interface Option {
  id: string | number;
  name: string;
}

interface BankDetailsProps {
  // control: Control<any>;
  sameAsPermanent: boolean;
  setSameAsPermanent: (val: boolean) => void;
  handleInputChange: (value: any, name: string, type?: string) => void;
  districtOptions?: Option[];
  stateOptions?: Option[];
  accommodationOptions?: Option[];
}

const BankDetails: React.FC<BankDetailsProps> = ({
  // control,
  sameAsPermanent,
  setSameAsPermanent,
  handleInputChange,
  districtOptions = [],
  stateOptions = [],
  accommodationOptions = [],
}) => {

  const { control, setValue, formState: { errors }, getValues } = useFormContext();
  return (
    <View style={CommonStyles.mainBlock}>
      <View style={CommonStyles.headerRow}>
        <Text style={CommonStyles.subTitle}>Bank Details</Text>
      </View>

        <FormInput
          label="Bank Name"
          name="bankName"
          control={control}
          style={CommonStyles.largeInput}
          onChange={(e: any) => handleInputChange(e, 'bankName')}
        />
 

        <FormInput
          label="Opening Balance"
          name="openingBalance"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'openingBalance')}
        />
        <FormInput
          label="As On Date"
          name="asOnDate"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'asOnDate')}
        />
    </View>
  );
};

export default BankDetails;

const styles = StyleSheet.create({});
