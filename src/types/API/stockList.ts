export interface Showroom {
  id: number;
  name: string;
}

export interface VehicleStock {
  id: number;
  tenantId: number;
  showroomId: number;
  purchaseId: number | null;
  actual_veh_purchase_value: string;
  locationId: number;
  vehicleId: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  vehicleModelId: number | null;
  showroom: Showroom;
  purchase: any; // Replace `any` with appropriate type if available
}
// export type vehicleStockList = VehicleStock[];
////////////////////
export interface Showroom {
  id: number;
  name: string;
}

export interface Purchase {
  id: number;
  actual_veh_purchase_value: string;
  vehicleId: number;
}

export interface VehicleClass {
  name: string;
}

export interface VehicleModel {
  name: string;
}
export interface VehicleColor {
  name: string;
}

export interface Status {
  name: string;
}

export interface Vehicle {
  id: number;
  vehicleNumber: string;
  fuelType: string;
  versionType: string | null;
  vehicleClass: VehicleClass | null;
  vehicleModel: VehicleModel | null;
  color: VehicleColor | null;
  status: Status | null;
}

export interface Location {
  id: number;
  name: string;
}

export interface VehicleRecord {
  id: number;
  tenantId: number;
  showroomId: number;
  purchaseId: number;
  actual_veh_purchase_value: string;
  locationId: number;
  vehicleId: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  vehicleModelId: number | null;
  showroom: Showroom;
  purchase: Purchase;
  vehicle: Vehicle;
  location: Location;
}

export type vehicleStockList = VehicleRecord[];
