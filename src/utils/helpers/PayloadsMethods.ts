export const removeDecimals = (
  value: string | number | null,
): string | null => {
  const num = Number(value);
  // If the number is valid, remove decimals and return as a string
  if (!isNaN(num)) {
    return Math.floor(num).toString();
  }
  // Return null if value is invalid
  return null;
};

type ValueType = 'string' | 'Number' | 'Float';

export const returnValidValueOrDefaultOutputValue = (
  value: string | number | null | undefined,
  outputValue: string | number | null,
  type: ValueType = 'string',
): string | number | null => {
  console.log('value length', value, value?.toString()?.length);
  if (value !== null && value !== undefined && value?.toString()?.length > 0) {
    if (type === 'Number') {
      return Number(value);
    } else if (type === 'Float') {
      return parseFloat(value as string);
    } else {
      return value.toString();
    }
  }

  if (outputValue === null) {
    return null;
  }

  return outputValue !== undefined ? outputValue : '';

  /*
  returnValidValueOrDefaultOutputValue('123.45', 0, 'Float'); // 123.45
  returnValidValueOrDefaultOutputValue('', 'N/A', 'string'); // 'N/A'
  returnValidValueOrDefaultOutputValue(null, 100, 'Number'); // 100
  returnValidValueOrDefaultOutputValue(undefined, null); // null
  */
};

// type ValueType = 'string' | 'Number' | 'Float';

// // Overloads for better type inference
// export function returnValidValueOrDefaultOutputValue(
//   value: string | number | null | undefined,
//   outputValue: number | null,
//   type: 'Number' | 'Float',
// ): number | null;

// export function returnValidValueOrDefaultOutputValue(
//   value: string | number | null | undefined,
//   outputValue: string | null,
//   type?: 'string',
// ): string | null;

// // Implementation
// export function returnValidValueOrDefaultOutputValue(
//   value: string | number | null | undefined,
//   outputValue: string | number | null = '',
//   type: ValueType = 'string',
// ): string | number | null {
//   if (value !== null && value !== undefined && value?.toString()?.length > 0) {
//     if (type === 'Number') {
//       return Number(value);
//     } else if (type === 'Float') {
//       return parseFloat(value as string);
//     } else {
//       return value.toString();
//     }
//   }

//   if (outputValue === null) {
//     return null;
//   }

//   return outputValue !== undefined
//     ? outputValue
//     : type === 'string'
//     ? ''
//     : null;
// }
