import moment from 'moment';

/**
 * Converts a date to a formatted string using Moment.js.
 * Returns an empty string if the date is invalid.
 *
 * @param date - The input date as string, number, Date, or Moment.
 * @param format - The desired format (defaults to Moment-compatible string).
 * @returns A formatted date string or empty string if invalid.
 */
export function convertDateByMoment(
  date: string | number | Date | moment.Moment | undefined,
  format: string,
): string {
  if (!date) return '';
  const convertedDate = moment(date).format(format);
  return convertedDate === 'Invalid date' ? '' : convertedDate;
}

export function convertDateByMomentUndefined(
  date: string | number | Date | moment.Moment | undefined,
  format: string,
): string | undefined {
  if (!date) return undefined;
  const convertedDate = moment(date).format(format);
  return convertedDate === 'Invalid date' ? undefined : convertedDate;
}
/**
 * Converts a date to a formatted string using Moment.js.
 * Returns null if the date is invalid.
 *
 * @param date - The input date as string, number, Date, or Moment.
 * @param format - The desired format (defaults to "YYYY-MM-DD").
 * @returns A formatted date string or null if invalid.
 */
export function convertDateOrNullByMoment(
  date: string | number | Date | undefined | moment.Moment,
  format: string = 'YYYY-MM-DD',
): string | null {
  const convertedDate = moment(date).format(format);
  return convertedDate === 'Invalid date' ? null : convertedDate;
}
