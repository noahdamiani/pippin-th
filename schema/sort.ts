import type { SortOpt } from './title';

export const sortEntriesOptions: SortOpt[] = [
  { key: '', label: 'Sort by', type: 'ASC' },
  { key: 'searchEffectiveDate', label: 'Oldest', type: 'ASC' },
  { key: 'searchEffectiveDate', label: 'Newest', type: 'DESC' },
  { key: 'orderNumber', label: 'Order Number ASC', type: 'ASC' },
  { key: 'orderNumber', label: 'Order Number DESC', type: 'DESC' },
];
