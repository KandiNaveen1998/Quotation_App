export interface VehicleClass {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleModel {
  id: number;
  name: string;
  vehicleClassId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  // You can define this later when `color` is not null
}

export interface Year {
  // You can define this later when `year` is not null
}

export interface Vehicle {
  id: number;
  vehicleClassId?: number;
  vehicleNumber: string;
  fuelType?: string;
  versionType?: string | null;
  chassisNumber?: string;
  engineNumber?: string;
  registrationDate?: string;
  vehicleModelId?: number;
  vehicleYearId?: number;
  vehicleColorId?: number;
  showroomId?: number | null;
  tenantId?: number;
  createdAt?: string;
  updatedAt?: string;
  colorId?: number | null;
  yearId?: number | null;
  vehicleClass?: VehicleClass;
  vehicleModel?: VehicleModel;
  color?: Color | null;
  year?: Year | null;
}

export interface VehicleResponse {
  data: Vehicle[];
  total: number;
  page: number | null;
  limit: number | null;
}
