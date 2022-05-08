/**
 *
 * I'm using a provider pattern to decouple state from the components.
 * For more complex implementations, I would use the react reducer hooks
 * to manage state. You could also opt for redux or sagas as an alternative.
 *
 * Decoupling allows for easier debugging (no prop drilling),
 * and makes it easier to test components with mock data.
 *
 * I use closures to create handlers given a state,
 * so that the units can be tested separately.
 *
 */
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Title } from 'schema/title';
import { fetchTitles } from './fetch';
import { createSort } from './units/sort';
import { createSwap } from './units/swap';
import { createUpdateStatus } from './units/updateStatus';

const Noop = () => {
  return;
};

// Outlines the ContextType
type Context = {
  titles: Title[];
  error: string | null;
  updateStatus: (id: number, value: string) => void;
  moveEntry: (dragIndex: number, hoverIndex: number) => void;
  sortEntries: (key: string) => void;
  selected?: string;
};

// Initial state / context
export const TitleContext = createContext<Context>({
  titles: [],
  error: null,
  updateStatus: Noop,
  moveEntry: Noop,
  sortEntries: Noop,
});

export const TitleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialTitles, setInitialTitles] = useState<Title[]>([]);
  const [selected, setSelectedSort] = useState<string>('searchEffectiveDate');
  const [titles, setTitles] = useState<Title[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Update the status of a given title
  const updateStatus = useCallback((id: number, value: string) => {
    setTitles((prevState) => {
      const updateHandler = createUpdateStatus(prevState);
      return updateHandler(id, value);
    });
  }, []);

  // Move the entry when dragged and dropped
  const moveEntry = useCallback((dragIndex: number, hoverIndex: number) => {
    // Swap the items
    setTitles((prevState) => {
      const swapHandler = createSwap(prevState);
      return swapHandler(dragIndex, hoverIndex);
    });
  }, []);

  // Sort entries, given a key
  const sortEntries = useCallback(
    (value: string) => {
      const [key, type] = value.split('::');

      // If not the default Sort By option, sort the list.
      if (key !== '') {
        const sortingHandler = createSort(key, type);
        setSelectedSort(value);
        setTitles([...titles].sort(sortingHandler));
      } else {
        setTitles(initialTitles);
      }
    },
    [titles, initialTitles]
  );

  // Initial fetch of the titles and add the initial index for drag and drop.
  useEffect(() => {
    fetchTitles()
      .then(({ data }) => {
        // Titles are stored twice, once to preserve the initial sort order,
        // and then another for a mutable, sortable copy.
        setInitialTitles(data || []);
        setTitles(data || []);
      })
      .catch(() => setError('An error occured! Please try again later.'));
  }, []);

  // Memoize values.
  const values = useMemo(
    () => ({
      titles,
      error,
      updateStatus,
      moveEntry,
      sortEntries,
      selected,
    }),
    [error, titles, updateStatus, moveEntry, sortEntries, selected]
  );

  return (
    <TitleContext.Provider value={values}>{children}</TitleContext.Provider>
  );
};

// Create a hook for easy consumption
export const useTitles = () => {
  const context = React.useContext<Context>(TitleContext);
  if (context === undefined)
    throw new Error('useTitles must be used within a TitleProvider');
  return context;
};
