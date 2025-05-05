/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput } from 'react-native';
import { useApi } from '../utils/hooks/useApi';
import { useToast } from '../utils/hooks/ToastContext';
import { ModuleConfig, ModuleConfigItem } from '../types/API/settingsApiTypes';
import { handleParamsData } from '../utils/API/APIRelatedMethods';
import { endpoints } from '../utils/API/endpoints';
import { OutputGroup, transformInputData } from '../utils/helpers/settingsMethods';
import Modules from './modulesScreen';

const UserScreen = () => {
  const { data: fieldsData, loading, request: fetchSettingsModule, status: getSettingsStatus } = useApi<ModuleConfig>();
  const {
    data: postData,
    loading: postLoading,
    request: postRequest,
    status: postStatus,
  } = useApi<any>();

  const { showToast } = useToast();


  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      let paramsDataForSettingApi: any = {
        tenantId: 1,
        showroomId: 1,
        moduleKey: 'purchase',
      };

      let url = handleParamsData(endpoints?.settings, paramsDataForSettingApi);
      console.log('url', url);
      const response = await fetchSettingsModule({
        url: url,
        method: 'GET',
        timeout: 10000, // 10 seconds
      });
      // console.log("response bit", response);
      // if (response !== null) {
      //   let realDatas = transformInputData(response?.config);
      //   setRealData(realDatas);
      // }
      console.log('Settings:', response);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const postSettings = async (mode: string) => {
    try {
      const newUser = {
        'tenantId': 1,
        'showroomId': 1,
        'moduleKey': 'purchase',
        'config': [
          {
            'Key': 'party.heading',
            'Ismobileshow': mode === 'on' ? true : false,
            'Iswebshow': false,
            'Displayname': 'Party Details',
          },
          {
            'Key': 'party.name',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Party Name',
          },
          {
            'Key': 'party.date',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Party Date',
          },
          {
            'Key': 'vehicle.heading',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Vehicle Details',
          },
          {
            'Key': 'vehicle.amount',
            'Ismobileshow': mode === 'on' ? true : false,
            'Iswebshow': false,
            'Displayname': 'Amount',
          },
          {
            'Key': 'vehicle.year',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Vehicle Year',
          },
          {
            'Key': 'approvalStatus.heading',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Approval Status',
          },
          {
            'Key': 'approvalStatus.ApprovalStatus',
            'Ismobileshow': true,
            'Iswebshow': false,
            'Displayname': 'Approval Status',
          },
        ],
      };

      let url = endpoints?.settingsPost;
      console.log('url for post', endpoints, newUser);
      await postRequest({
        method: 'POST',
        url: url,
        data: newUser,
      });

      console.log('status after post', postStatus);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };
  const [realData, setRealData] = React.useState<OutputGroup[]>([]);

  useEffect(() => {
    // console.log('fieldsData', fieldsData?.config);
    if (fieldsData != null) {
      let validObjects = fieldsData?.config.filter((obj: any) => {
        return obj?.Key !== undefined && obj?.Ismobileshow === true && obj?.Displayname !== undefined;
      }
      );
      console.log('234 fieldsData', fieldsData);
      console.log('234 validObjects', validObjects);
      let realDatas = transformInputData(validObjects);
      // console.log('realDatas', realDatas);
      let fieldsToShow = realDatas.filter((item: OutputGroup) => item.header.Ismobileshow === true);
      setRealData(fieldsToShow);
      console.log('234 fieldsToShow now', fieldsToShow);
    }
  }, [fieldsData]);

  useEffect(() => {

    if (postStatus === 200) {
      console.log('postData', postData);
      showToast('Settings updated successfully!', 'success');
      fetchSettings();
    }
  }, [postStatus]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const handleClick = () => {
    // showToast('This is a success message!', 'error');
    fetchSettings();
  };

  const findTheFeild = (key: string) => {
    const field = realData.some((item: OutputGroup) => item.header.Key === key);
    console.log('field', field);
    if (field) {
      return true;
    }
    return false;
  };

  const handlePostClick = (mode: string) => {
    postSettings(mode);
  };




  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>User Info:</Text>

      {realData?.length > 0 && findTheFeild('party.heading') && !loading && (
        <View style={{ marginVertical: 10 }}>
          <Text>Party Details</Text>
          <TextInput
            style={{ borderBlockColor: 'black', borderWidth: 1 }}
            placeholder="name"
          // value={partyDetails?.name || ''} // Use the API data for initial value
          />
          <TextInput
            style={{ borderBlockColor: 'black', borderWidth: 1 }}
            placeholder="Date"
          // value={partyDetails?.date || ''} // Use the API data for initial value
          />
        </View>
      )}



      <Button title="Show Toast" onPress={handleClick} />
      <Button title="on Settings" onPress={() => handlePostClick('on')} />
      <Button title="off Settings" onPress={() => handlePostClick('off')} />


      <Modules modulesDataOfSettings={realData} />

    </View>
  );
};

export default UserScreen;

export const modulesSettingsData: ModuleConfigItem[] = [
  {
    'Key': 'party.heading',
    'Iswebshow': false,
    'Displayname': 'Party Details',
    'Ismobileshow': true,
  },
  {
    'Key': 'party.name',
    'Iswebshow': false,
    'Displayname': 'Party Name',
    'Ismobileshow': true,
  },
  {
    'Key': 'party.date',
    'Iswebshow': false,
    'Displayname': 'Party Date',
    'Ismobileshow': true,
  },
  {
    'Key': 'vehicle.heading',
    'Iswebshow': false,
    'Displayname': 'Vehicle Details',
    'Ismobileshow': true,
  },
  {
    'Key': 'vehicle.amount',
    'Iswebshow': false,
    'Displayname': 'Amount',
    'Ismobileshow': true,
  },
  {
    'Key': 'vehicle.year',
    'Iswebshow': false,
    'Displayname': 'Vehicle Year',
    'Ismobileshow': true,
  },
  {
    'Key': 'approvalStatus.heading',
    'Iswebshow': false,
    'Displayname': 'Approval Status',
    'Ismobileshow': true,
  },
  {
    'Key': 'approvalStatus.ApprovalStatus',
    'Iswebshow': false,
    'Displayname': 'Approval Status',
    'Ismobileshow': true,
  },








  {
    'Key': 'purchase.documentNumber',
    'Iswebshow': false,
    'Displayname': 'Document Number',
    'Ismobileshow': true,
  },
  {
    'Key': 'purchase.documentDate',
    'Iswebshow': false,
    'Displayname': 'Document Date',
    'Ismobileshow': true,
  }, {
    'Key': 'purchase.partyId',
    'Iswebshow': false,
    'Displayname': 'Party',
    'Ismobileshow': true,
  }, {
    'Key': 'purchase.vehicleId',
    'Iswebshow': false,
    'Displayname': 'Vehicle',
    'Ismobileshow': true,
  }, {
    'Key': 'purchase.actualVehicleId',
    'Iswebshow': false,
    'Displayname': 'Actual Vehicle Amount',
    'Ismobileshow': true,
  },

];
