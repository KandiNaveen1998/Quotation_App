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

interface GstDetailsProps {
  // control: Control<any>;
  sameAsPermanent: boolean;
  setSameAsPermanent: (val: boolean) => void;
  handleInputChange: (value: any, name: string, type?: string) => void;
  districtOptions?: Option[];
  stateOptions?: Option[];
  accommodationOptions?: Option[];
}

const GstDetails: React.FC<GstDetailsProps> = ({
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
        <Text style={CommonStyles.subTitle}>GST Details</Text>
      </View>

        <FormInput
          label="GSTIN"
          name="gstIn"
          control={control}
          style={CommonStyles.largeInput}
          onChange={(e: any) => handleInputChange(e, 'gstIn')}
        />
 
    </View>
  );
};

export default GstDetails;

const styles = StyleSheet.create({

});
