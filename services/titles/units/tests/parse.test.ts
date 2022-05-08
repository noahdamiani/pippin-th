import { parseSortValue } from '../parse';

describe('parseSortValue()', () => {
  it('should be a date object if M/DD/YY is matched', () => {
    const testValue = parseSortValue('1/22/19');
    expect(testValue instanceof Date).toBeTruthy();
  });

  it('should make no change when bad string format provided', () => {
    const input = '1-22/19';
    const testValue = parseSortValue(input);
    expect(testValue).toBe(input);
  });
});
