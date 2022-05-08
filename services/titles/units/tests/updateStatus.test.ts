import state from 'schema/mock.json';
import { createUpdateStatus } from '../updateStatus';

const handler = createUpdateStatus(state);

describe('updateStatus', () => {
  it('should update an item in a list of titles', () => {
    const testStatus = 'some other random status';
    const testIndex = 0;
    const updated = handler(state[testIndex].id, testStatus);
    expect(updated[testIndex].status).toEqual(testStatus);
  });
});
