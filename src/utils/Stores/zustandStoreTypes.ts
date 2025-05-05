export type LoginData = {
  user: {
    id: number;
    email: string;
    username: string;
    phone_number: string;
  };
  loginToken: string;
  showrooms: {
    id: number;
    name: string;
    isDefault: string; // could be "0" or "1", use string unless you want to convert it to a boolean
  }[];
  selectedShowroom: {
    token: string;
    showroomId: number;
    showroomName: string;
  };
};

export type LogInStoreType = {
  LOGIN_Data: LoginData | undefined | null;
  clearLOGIN_Data: () => void;
  updateLOGIN_Data: (data: LoginData) => void;
};
