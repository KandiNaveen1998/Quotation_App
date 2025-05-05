import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
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

interface AddressDetailsProps {
  // control: Control<any>;
  sameAsPermanent: boolean;
  setSameAsPermanent: (val: boolean) => void;
  handleInputChange: (value: any, name: string, type?: string) => void;
  districtOptions?: Option[];
  stateOptions?: Option[];
  accommodationOptions?: Option[];
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
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
        <Text style={CommonStyles.subTitle}>Present Address</Text>
        <View style={styles.checkboxRow}>
          {/* <Checkbox
            value={sameAsPermanent}
            onValueChange={setSameAsPermanent}
          /> */}
          {/* <Text style={styles.checkboxLabel}>Same as Permanent Address</Text> */}
        </View>
      </View>

        <FormInput
          label="House No"
          name="houseNo"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'houseNo')}
        />
        <FormInput
          label="Street Name"
          name="streetName"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'streetName')}
        />

        <FormInput
          label="Landmark"
          name="landmark"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'landmark')}
        />
        <FormInput
          label="City"
          name="city"
          control={control}
          style={CommonStyles.miniInput}
          onChange={(e: any) => handleInputChange(e, 'city')}
        />

        <FormDropdown
          label="District"
          name="district"
          control={control}
          options={districtOptions}
          valueKey="id"
          displayKey="name"
          dropdownStyle={CommonStyles.miniDropdown}
          onChange={(e: any) => handleInputChange(e, 'district')}
        />
        <FormDropdown
          label="State"
          name="state"
          control={control}
          options={stateOptions}
          valueKey="id"
          displayKey="name"
          dropdownStyle={CommonStyles.miniDropdown}
          onChange={(e: any) => handleInputChange(e, 'state')}
        />

        <FormInput
          label="Pincode"
          name="pincode"
          control={control}
          style={CommonStyles.miniInput}
          keyboardType="numeric"
          onChange={(e: any) => handleInputChange(e, 'pincode')}
        />
        <FormDropdown
          label="Accommodation Type"
          name="accommodationType"
          control={control}
          options={accommodationOptions}
          valueKey="id"
          displayKey="name"
          dropdownStyle={CommonStyles.miniDropdown}
          onChange={(e: any) => handleInputChange(e, 'accommodationType')}
        />
    </View>
  );
};

export default AddressDetails;

const styles = StyleSheet.create({

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
});
