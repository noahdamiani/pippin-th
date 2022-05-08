import { Title } from 'schema/title';

type xhrAttempt<T> = {
  data: T | null;
  error: unknown | null;
};

type TitleRequest = () => Promise<xhrAttempt<Title[]>>;

/**
 *
 * Fetch a list of available home titles and
 * return an error in case of API failure.
 *
 * Axios and other libraries offer similar/better error handling
 * out of the box, but I've opted to keep things simple.
 *
 */
export const fetchTitles: TitleRequest = async () => {
  try {
    const response = await fetch('/api/titles');
    const data: Title[] = await response.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return { error, data: null };
  }
};
