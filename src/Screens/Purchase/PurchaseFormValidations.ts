import * as yup from 'yup';
import {PurchaseFormData} from './PurchaseForm';

export const purchaseFormValidation: yup.ObjectSchema<PurchaseFormData> =
  yup.object({
    // purchaseType: yup.object().required('Field is required'),
    purchaseType: yup
      .object({
        id: yup
          .mixed()
          .required('Field is required')
          .notOneOf([null], 'Please select a valid option'),
        displayName: yup.string(),
        _index: yup.number(),
      })
      .required('Field is required'),
    documentNumber: yup.string().required('Field is required'),
    documentDate: yup.string().required('Field is required'),
    party_partyId: yup
      .object({
        id: yup
          .mixed()
          .required('Field is required')
          .notOneOf([null], 'Please select a valid option'),
        displayName: yup.string(),
        _index: yup.number(),
      })
      .required('Field is required'),
    party_vehicleId: yup
      .object({
        id: yup
          .mixed()
          .required('Field is required')
          .notOneOf([null], 'Please select a valid option'),
        displayName: yup.string(),
        _index: yup.number(),
      })
      .required('Field is required'),
    // party_partyId: yup.string().required('Field is required'),
    // party_vehicleId: yup.string().required('Field is required'),

    // party_paidAmount //is a string when paid is amount has a value not string, not null, not undefined, not a white spaced string,a valid string number
    // // then make party_paymentMode required other wise not.
    // party_paymentMode //is an object
    // party_purchaseAmount

    // party_paidAmount: yup //if party_purchaseAmount has a valid number then party_paidAmount should be less than party_purchaseAmount
    //   .string()
    //   .test('is-valid-amount', 'Invalid amount', value => {
    //     // Accept empty, undefined, or null
    //     if (!value || value.trim() === '') return true;

    //     // Must be a valid number string
    //     return !isNaN(Number(value));
    //   }),

    party_paidAmount: yup
      .string()
      .test('is-valid-number', 'Invalid paid amount', value => {
        if (!value || value.trim() === '') return true;
        return !isNaN(Number(value));
      })
      .test(
        'is-less-than-purchase',
        'Must be ≤ Purchase amount',
        function (value) {
          const {party_purchaseAmount} = this.parent;

          // Skip if value is empty
          if (!value || value.trim() === '') return true;

          const paid = Number(value);
          const purchase = Number(party_purchaseAmount);

          if (isNaN(paid) || isNaN(purchase)) return true; // Skip comparison if not numbers

          return paid <= purchase;
        },
      ),

    party_paymentMode: yup
      .object()
      .nullable()
      .when('party_paidAmount', ([val], schema) =>
        val && val.trim() && !isNaN(Number(val))
          ? schema.required('Payment Mode is required')
          : schema.notRequired(),
      ),

    MC_paidAmount: yup
      .string()
      .test('is-valid-number', 'Invalid paid amount', value => {
        if (!value || value.trim() === '') return true;
        return !isNaN(Number(value));
      })
      .test(
        'is-less-than-or-equal-mcAmount',
        'Must be ≤ MC amount',
        function (value) {
          const {MC_amount} = this.parent;

          if (!value || value.trim() === '') return true;

          const paid = Number(value);
          const mcAmounts = Number(MC_amount);

          if (isNaN(paid) || isNaN(mcAmounts)) return true;

          return paid <= mcAmounts; // 👈 Changed from < to <=
        },
      ),

    MC_paymentMode: yup
      .object()
      .nullable()
      .when('MC_paidAmount', ([val], schema) =>
        val && val.trim() && !isNaN(Number(val))
          ? schema.required('Payment Mode is required')
          : schema.notRequired(),
      ),
  });
