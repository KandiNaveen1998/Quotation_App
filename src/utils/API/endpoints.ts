// export const baseUrl = 'http://localhost:5001';
// export const baseUrl = 'http://10.0.2.2:5001';
export const baseUrl = 'http://192.168.1.12:5001';

export const endpoints = {
  settings: baseUrl + '/settings',
  settingsPost: baseUrl + '/settings/new',
  login: baseUrl + '/auth/login',
  party: baseUrl + '/party',
  vehicleGetAll: baseUrl + '/vehicle/getAll',
  purchaseCreate: baseUrl + '/purchase/new',
  purchaseGetAll: baseUrl + '/purchase',
  paymentMode: baseUrl + '/payment-type',
  EstimationCost: baseUrl + '/est',
  sale: baseUrl + '/sale',
  saleCreate: baseUrl + '/sale/new',

  saleUpdate: baseUrl + '/sale',

  stokByShowroom: baseUrl + '/stock/by-showroom',

};
