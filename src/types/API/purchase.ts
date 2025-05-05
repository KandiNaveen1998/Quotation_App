export interface VehiclePurchaseDataPayload {
  id?: number; // Optional if you're creating a new purchase record
  documentNumber: string;
  documentDate: string | null; // If you're using date strings like "09-03-2025", keep this as string. If it's a Date object, use `Date`.
  tenantId: number;
  showroomId: number;
  vehicleId: number;
  partyId: number;
  est_veh_purchase_value?: number;
  actual_veh_purchase_value: number;
  locationId: number;
}
export interface VehiclePurchase {
  id?: number;
  documentNumber: string;
  documentDate: string; // ISO string format
  tenantId: number;
  showroomId: number;
  vehicleId: number;
  partyId: number;
  locationId: number;
  mc_details_id: number | null;
  if_finance: number;
  fc_details_id: number | null;
  purchase_repair_est_id: number | null;
  est_veh_purchase_value: string;
  actual_veh_purchase_value: string | number | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  vehicle: {
    id: number;
    vehicleNumber: string;
  };
  mcDetails: any | null; // Replace `any` with specific type if available
  financeDetails: any[]; // Replace `any` with specific type if available
  purchaseRepairDetails: any[]; // Replace `any` with specific type if available
  purchasePayments: any[]; // Replace `any` with specific type if available
}

export type Payment = {
  paid_amount: number | null;
  paymentTypeId: number | null;
};

export type PurchasePayment = {
  paidAmount: number | null;
  paidDate?: string | null;
  payment: {
    amount: number | null;
    mode: string | null;
    paymentDate?: string;
    paymentTypeId: number | null;
  };
  id?: number;
};

export type McDetail = {
  name: string | null;
  partyId: number | null;
  amount: number | null;
  paid_amount: number | null;
  payments: Payment[];
  id?: number;
};

export type FinanceDetail = {
  finance_company_id: number | null;
  finance_amount: number | null;
  paid_amount: number | null;
  payments: Payment[];
  id?: number;
};
export type RepairEstimates = {
  est_for_id: number;
  amount: number;
};

export type PurchaseDocument = {
  id?: number;
  documentNumber: string | null;
  documentDate: string | null;
  vehicleId: number | null;
  partyId: number | null;
  est_veh_purchase_value?: Number | null;
  actual_veh_purchase_value?: Number | null;
  customer_type?: string | null;
  locationId: number;
  purchasePayments?: PurchasePayment[];
  mcDetails?: McDetail[];
  financeDetails?: FinanceDetail[];
  repairEstimates?: RepairEstimates[];
};

// export interface PurchaseDataGetById {
//   id: number;
//   documentNumber: string;
//   documentDate: string; // ISO string (can be converted to Date)
//   tenantId: number;
//   showroomId: number;
//   vehicleId: number;
//   partyId: number;
//   locationId: number;
//   sale_type: string | null;
//   mc_details_id: number | null;
//   if_finance: number;
//   fc_details_id: number | null;
//   purchase_repair_est_id: number | null;
//   est_veh_purchase_value: string;
//   actual_veh_purchase_value: string;
//   deletedAt: string | null;
//   createdAt: string;
//   updatedAt: string;
//   vehicle: {
//     id: number;
//     vehicleNumber: string;
//   };
//   mcDetails: any | null;
//   financeDetails: any[]; // Replace `any` with actual type if known
//   purchaseRepairDetails: any[]; // Replace `any` with actual type if known
//   purchasePayments: any[]; // Replace `any` with actual type if known
// }

// For an array of these:
export type VehiclePurchaseList = VehiclePurchase[];

export type PurchaseDataGetById = {
  id: number;
  documentNumber: string;
  documentDate: string; // ISO format date
  vehicleId: number;
  partyId: number;
  locationId: number;
  mc_details_id: number;
  if_finance: number;
  fc_details_id: number;
  est_veh_purchase_value: string;
  actual_veh_purchase_value: string;
  purchaseCustomerDetails: PartyDetails;
  vehicle: Vehicle;
  mcDetails: MCDetailedInfo;
  financeDetails: FinanceDetail[];
  purchaseRepairDetails: any[]; // Update this if you have repair structure
  purchasePayments: PurchasePaymentDetail[];
};

export type PartyDetails = {
  id: number;
  partyType: string;
  name: string;
  mobileNumber: string;
};

export type Vehicle = {
  id: number;
  vehicleNumber: string;
};

export type MCDetailedInfo = {
  id: number;
  amount: string;
  paid_amount: string;
  pending_amount: string;
  party: PartyDetails;
};

export type PurchasePaymentDetail = {
  id: number;
  paymentId: number;
  paidFor: 'mc' | 'finance' | 'repair' | string;
  referenceId: number;
  payment: Payment;
};

export type PaymentType = {
  id: number;
  name: string;
};
