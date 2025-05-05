export interface Address {
  id: number;
  partyId: number;
  type: 'present' | 'permanent';
  line1: string;
  lineOrStreet: string;
  landMark: string | null;
  city: string;
  pincode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Party {
  id?: number;
  partyType?: 'financer' | 'customer' | 'mc';
  name: string;
  mobileNumber?: string;
  altMobileNumber?: string;
  tenantId?: number;
  presentAddressId?: number;
  permanentAddressId?: number;
  aadharNumber?: string;
  gender?: 'male' | 'female' | string;
  dob?: string;
  age?: string;
  occupation?: string;
  monthlyIncome?: string;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  presentAddress?: Address;
  permanentAddress?: Address;
}

export interface PartyListResponse {
  data: Party[];
  total: number;
}
