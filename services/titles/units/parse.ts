/**
 *
 * Returns a date object if the provided string matches date format
 * M/DD/YY. By default returns the value provided.
 */
export const parseSortValue = (
  value: string | number
): string | Date | number => {
  return typeof value !== 'string' || /^\d{1}\/\d{2}\/\d{2}$/.test(value)
    ? new Date(value)
    : value;
};
