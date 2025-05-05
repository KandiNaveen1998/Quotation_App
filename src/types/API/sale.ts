export interface saleTypes {
  id: number;
  displayName: string;
}

export type Service = {
  serviceType: string;
  amount: number;
};

export type PaymentDetails = {
  paidAmount: number;
  payment: {
    paidAmount: number;
    paymentTypeId: number | null;
  };
};

export type Customer = {
  partyId: number | null;
  sale_amount: number;
  totalCustomerAmount: number;
  receivedAmount: number;
  dpDueDate: string | null;
  services: Service[] | [];
  payments: PaymentDetails[] | [];
};

export type FinanceDetailsType = {
  saleFinanceCompanyId: number | null;
  financeAmount: number;
  fileSuspensionAmount: number;
  emiAmount: number;
  totalEmiAmount: number;
  fileRoi: number;
  tenure: number;
};

export type CommissionDetailsType = {
  commissionPartyId: number | null;
  commissionAmount: number;
  paidAmount: number;
  paymentTypeId: number | null;
};

export type HypothecationDetailsType = {
  entityOnRcBook: string;
  nameOnRcBook: string;
  phoneNumber: string;
  hypothecationTo: string;
  tokenNumber: string;
  tokenDate: string | null;
  tokenDueDate: string | null;
  numberOfDaysExp: number;
};

// export type HypothecationHistory = {
//   purchaser: boolean;
//   purchaseFinancer: boolean;
//   sellerCustomer: boolean;
//   sellerFinancer: boolean;
//   rto: boolean;
// };

export type SaleData = {
  id?: number;
  vehicleId: number | null;
  vehicle_reading: string;
  partyId: number | null;
  locationId: number | null;
  saleType: number | null;
  documentNumber: string;
  documentDate: string;
  guarantorId: number | null;
  customer?: Customer;
  financeDetails?: FinanceDetailsType;
  commissionDetails?: CommissionDetailsType;
  hypothecationDetails?: HypothecationDetailsType;
  hypothecationHistory?: HypothecationHistory;
  remarks: string;
};

export interface SaleListItem {
  id: number;
  documentNumber: string;
  documentDate: string; // ISO date string (e.g., "2025-04-16T00:00:00.000Z")
  tenantId: number;
  showroomId: number;
  vehicleId: number;
  partyId: number;
  guarantorId: number;
  locationId: number;
  sale_amount: string; // Represented as a string like "50000.00"
  vehicle_reading: string; // Represented as a string like "3568"
  sale_type: string | null;
  if_finance: number; // assuming 0 or 1
  total_customer_amount: string; // Represented as a string like "1000.00"
  sale_finance_details_id: number;
  dpDueDate: string | null; // Nullable ISO date string
  remarks: string | null;
  deletedAt: string | null; // Nullable ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export type SaleList = SaleListItem[];

type StatusDescription = {
  status: boolean;
  description: string;
};

type Keys =
  | 'purchaser'
  | 'purchaseFinancer'
  | 'sellerCustomer'
  | 'sellerFinancer'
  | 'rto'
  | 'completed';

type HypothecationHistory = Record<Keys, StatusDescription>;

export interface entityOnRCbookOptionsTypes {
  id: number;
  displayName: string;
  value: string;
}
export type entityOnRCbookOptionsListType = entityOnRCbookOptionsTypes[];

/////////////////////get by id sale types
export type VehicleClass = {
  name: string;
};

export type VehicleModel = {
  name: string;
};

export type Vehicle = {
  id: number;
  vehicleNumber: string;
  vehicleClass: VehicleClass;
  vehicleModel: VehicleModel;
};

export type PartyDetails = {
  id: number;
  name: string;
  mobileNumber: string;
};

export type SalesFinanceDetails = {
  id: number;
  partyType: string;
  name: string;
  mobileNumber: string;
};

export type SaleFinanceDetails = {
  id: number;
  sale_finance_company_id: number;
  finance_amount: string;
  file_suspension_amount: string;
  emi_amount: string;
  total_emi_amount: string;
  file_roi: string;
  tenure: number;
  saleId: number;
  salesFinanceDetails: SalesFinanceDetails;
};

export type SaleService = {
  id: number;
  saleId: number;
  serviceType: string;
  amount: string;
};

export type Payment = {
  id: number;
  paid_amount: string;
};

export type SaleReceipt = {
  id: number;
  saleId: number;
  paymentId: number;
  payment: Payment;
};

export type CommissionParty = {
  id: number;
  name: string;
  mobileNumber: string;
};

export type SaleCommission = {
  id: number;
  commission_party_id: number;
  amount: string;
  paid_amount: string;
  pending_amount: string;
  commission_payment_type_id: number;
  commissionParty: CommissionParty;
};

export type SaleGetByIdData = {
  documentNumber: string;
  documentDate: string;
  vehicleId: number;
  partyId: number;
  guarantorId: number;
  locationId: number;
  sale_amount: string;
  vehicle_reading: string;
  sale_type: string | null;
  if_finance: number;
  total_customer_amount: string;
  sale_finance_details_id: number;
  vehicle: Vehicle;
  customerDetails: PartyDetails;
  guarantorDetails: PartyDetails;
  saleFinanceDetails: SaleFinanceDetails;
  saleServices: SaleService[];
  saleReceipts: SaleReceipt[];
  saleCommission: SaleCommission;
  saleHypothecationDetails: any;
  saleHypothecationHistoryDetails: any[];
  remarks: string;
};
