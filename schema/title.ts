export interface Title {
  id: number;
  orderNumber: string;
  searchEffectiveDate: string;
  address: string;
  image: string;
  status: string;
  [key: string]: string | number;
}

export type SortOpt = {
  key: string;
  label: string;
  type: 'ASC' | 'DESC';
};
