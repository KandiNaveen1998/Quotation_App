import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LoginData, LogInStoreType } from './zustandStoreTypes';



export const LogInStore = create<LogInStoreType>()(
  persist(
    (set) => ({
      LOGIN_Data: undefined,
      clearLOGIN_Data: () => set({ LOGIN_Data: undefined }),
      updateLOGIN_Data: (data: LoginData) => set({ LOGIN_Data: data }),
    }),
    {
      name: 'LOGIN_Data',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
