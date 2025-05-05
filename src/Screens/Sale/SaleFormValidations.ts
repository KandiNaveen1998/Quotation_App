import * as yup from 'yup';
import {SaleFormData} from './saleForm';

export const saleFormValidation: yup.ObjectSchema<SaleFormData> = yup.object({
  // purchaseType: yup.object().required('Field is required'),
  sale_saleType: yup
    .object({
      id: yup
        .mixed()
        .required('Field is required')
        .notOneOf([null], 'Please select a valid option'),
      displayName: yup.string(),
      _index: yup.number(),
    })
    .required('Field is required'),
  sale_documentNumber: yup.string().required('Field is required'),
  sale_date: yup.string().required('Field is required'),

  vehicle_vehicle: yup
    .object({
      id: yup
        .mixed()
        .required('Field is required')
        .notOneOf([null], 'Please select a valid option'),
      displayName: yup.string(),
      _index: yup.number(),
    })
    .required('Field is required'),

  vehicle_reading: yup
    .string()
    .trim()
    .test('is-valid-number', 'Invalid vehicle reading', value => {
      if (!value) return true; // Optional
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 500000;
    }),

  customer_party: yup
    .object({
      id: yup
        .mixed()
        .required('Field is required')
        .notOneOf([null], 'Please select a valid option'),
      displayName: yup.string(),
      _index: yup.number(),
    })
    .required('Field is required'),

  customer_receivedAmount: yup
    .string()
    .test('is-valid-number', 'Invalid paid amount', value => {
      if (!value || value.trim() === '') return true;
      return !isNaN(Number(value));
    })
    .test(
      'is-less-than-receivables',
      'Must be ≤ Customer amount',
      function (value) {
        const {customer_receivables} = this.parent;

        // Skip if value is empty
        if (!value || value.trim() === '') return true;

        const paid = Number(value);
        const purchase = Number(customer_receivables);

        if (isNaN(paid) || isNaN(purchase)) return true; // Skip comparison if not numbers

        return paid <= purchase;
      },
    ),

  customer_paymentMode: yup
    .object()
    .nullable()
    .when('customer_receivedAmount', ([val], schema) =>
      val && val.trim() && !isNaN(Number(val))
        ? schema.required('Payment Mode is required')
        : schema.notRequired(),
    ),

  commission_paidAmount: yup
    .string()
    .test('is-valid-number', 'Invalid paid amount', value => {
      if (!value || value.trim() === '') return true;
      return !isNaN(Number(value));
    })
    .test(
      'is-less-than-commissionAmount',
      'Must be ≤ Commission amount',
      function (value) {
        const {commission_Amount} = this.parent;

        // Skip if value is empty
        if (!value || value.trim() === '') return true;

        const paid = Number(value);
        const purchase = Number(commission_Amount);

        if (isNaN(paid) || isNaN(purchase)) return true; // Skip comparison if not numbers

        return paid <= purchase;
      },
    ),

  commission_paymentMode: yup
    .object()
    .when('commission_paidAmount', ([val], schema) =>
      val && val.trim() && !isNaN(Number(val))
        ? schema.required('Payment Mode is required')
        : schema.notRequired(),
    ),

  //if sale_date?.id == 2 then finance_party is required

  finance_party: yup
    .object()
    .nullable()
    .when('sale_saleType', {
      is: (val: any) => val?.id === 2 || val?.id === 3,
      then: schema => schema.required('Finance party is required'),
      otherwise: schema => schema.nullable(),
    }),
});
