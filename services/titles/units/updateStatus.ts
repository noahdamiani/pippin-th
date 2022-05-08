import type { Title } from 'schema/title';

/**
 *
 * Returns a handler given a title state, which can be
 * used to update the status of a title entry given
 * an id and the value to update the entry with
 */
export const createUpdateStatus =
  (prevState: Title[]) => (id: number, value: string) =>
    prevState.reduce(
      (previousValue: Title[], nextValue) => [
        ...previousValue,
        nextValue.id === id ? { ...nextValue, status: value } : nextValue,
      ],
      []
    );
