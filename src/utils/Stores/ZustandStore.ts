import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
  LoginData,
  LogInStoreType,
  OrgLogInStoreType,
} from './zustandStoreTypes';

export const LogInStore = create<LogInStoreType>()(
  persist(
    set => ({
      LOGIN_Data: undefined,
      clearLOGIN_Data: () => set({LOGIN_Data: undefined}),
      updateLOGIN_Data: (data: LoginData) => set({LOGIN_Data: data}),
    }),
    {
      name: 'LOGIN_Data',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const OrgLogInStore = create<OrgLogInStoreType>()(
  persist(
    set => ({
      OrgLOGIN_Data: undefined,
      clearOrgLOGIN_Data: () => set({OrgLOGIN_Data: undefined}),
      updateOrgLOGIN_Data: (data: User) => set({OrgLOGIN_Data: data}),
    }),
    {
      name: 'OrgLOGIN_Data',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
