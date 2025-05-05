import { HypothecationHistory } from './sale';
export interface PaymentModeGetById {
  id: number;
  name: string;
  code: string;
  type: string | null;
  tenantId: number;
  is_active: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PaymentModeList = PaymentModeGetById[];

export interface EstimationCostGetById {
  id: number;
  name: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  fieldName?: string;
}
export type EstimationCostList = EstimationCostGetById[];

export interface entityOnRCbook {
  id: number;
  name: string;
  value: string;
}
export type entityOnRCbookList = entityOnRCbook[];

export interface hypothecationTo {
  id: number;
  name: string;
  value: string;
}
export type HypothecationToList = hypothecationTo[];

