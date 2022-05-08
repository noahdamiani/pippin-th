import type { SortOpt, Title } from 'schema/title';
import state from 'schema/mock.json';
import { sortEntriesOptions } from 'schema/sort';
import { createSort } from '../sort';
import moment from 'moment';
import { get } from 'lodash';

type SortValue = Title | string | Date;

type Handler = {
  expected: Title[];
  sorter: (a: Title, b: Title) => 1 | 0 | -1;
  key: string;
  input: Title[];
};

const [doNothing, dateAsc, dateDesc, orderAsc, orderDesc] = sortEntriesOptions;

const createOrderNumber = (num: number) => `PPN00000${num}`;
const createHandler = (opt: SortOpt, expected: Title[], input: Title[]) => ({
  expected,
  input,
  sorter: createSort(opt.key, opt.type),
  key: opt.key,
});

const datesAscending: Title[] = state.map((item, index) => ({
  ...item,
  searchEffectiveDate: moment(new Date())
    .add(index + 1, 'days')
    .format('M/DD/YY'),
}));

const datesDescending: Title[] = datesAscending.map((item, index) => ({
  ...item,
  searchEffectiveDate: moment(new Date())
    .add(datesAscending.length - index, 'days')
    .format('M/DD/YY'),
}));

const orderNumbersAscending: Title[] = state.map((item, index) => ({
  ...item,
  orderNumber: createOrderNumber(index + 1),
}));

const orderNumbersDescending: Title[] = state.map((item, index) => ({
  ...item,
  orderNumber: createOrderNumber(state.length - index),
}));

const cases: Record<string, Handler> = {
  default: createHandler(doNothing, state, orderNumbersAscending),
  dateAscending: createHandler(dateAsc, datesAscending, datesDescending),
  dateDescending: createHandler(dateDesc, datesDescending, datesAscending),
  orderAscending: createHandler(
    orderAsc,
    orderNumbersAscending,
    orderNumbersDescending
  ),
  orderDescending: createHandler(
    orderDesc,
    orderNumbersDescending,
    orderNumbersAscending
  ),
};

const sortTest = (name: string, { input, key, expected, sorter }: Handler) => {
  it(name, () => {
    const sorted: SortValue[] = [...input].sort(sorter);

    if (key === '') {
      expect(sorted).toEqual(expected);
    } else {
      expect(sorted.map((item) => get(item, key))).toEqual(
        expected.map((item) => get(item, key))
      );
    }
  });
};

describe('updateStatus()', () => {
  sortTest('should do nothing when default option is selected', cases.default);
  sortTest('should show oldest entries first', cases.dateAscending);
  sortTest('should show newest entries first', cases.dateDescending);
  sortTest('should show oldest order IDs first', cases.orderAscending);
  sortTest('should show newest order IDs first', cases.orderAscending);
});
