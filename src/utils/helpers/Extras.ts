export function parseValidNumber(input: unknown): number | null {
  if (input === null || input === undefined || input === '') return null;
  const num = Number(input);
  return !isNaN(num) ? num : null;

  //   parseValidNumber(123); // 123
  //   parseValidNumber('456'); // 456
  //   parseValidNumber(null); // null
  //   parseValidNumber(undefined); // null
  //   parseValidNumber('abc'); // null
  //   parseValidNumber(''); // 0 (since Number("") === 0, but you can change this behavior if needed)
}

export function parseValidNumberOrZero(input: unknown): number {
  if (input === null || input === undefined || input === '') return 0;
  const num = Number(input);
  return !isNaN(num) ? num : 0;

  //   parseValidNumber(123); // 123
  //   parseValidNumber('456'); // 456
  //   parseValidNumber(null); // null
  //   parseValidNumber(undefined); // null
  //   parseValidNumber('abc'); // null
  //   parseValidNumber(''); // 0 (since Number("") === 0, but you can change this behavior if needed)
}
export function parseValidNumberOrNull(input: unknown): number | null {
  if (input === null || input === undefined || input === '') return null;
  const num = Number(input);
  return !isNaN(num) ? num : null;
}
export function parseValidStringOrEmpty(input: unknown): string {
  if (typeof input === 'string') return input.trim();
  return '';
}
