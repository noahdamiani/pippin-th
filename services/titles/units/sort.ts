import type { Title } from 'schema/title';
import { parseSortValue } from './parse';

// Given a filter key and type, return a sorting handler
export const createSort =
  (key: string, type: string) => (a: Title, b: Title) => {
    const valueA = parseSortValue(a[key]);
    const valueB = parseSortValue(b[key]);
    if (valueA > valueB) return type === 'DESC' ? -1 : 1;
    if (valueA < valueB) return type === 'DESC' ? 1 : -1;
    return 0;
  };
