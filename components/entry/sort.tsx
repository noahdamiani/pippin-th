import type { SortOpt } from 'schema/title';
import { useTitles } from 'services/titles/context';

type Props = { options: SortOpt[] };

export const EntrySort: React.FC<Props> = ({ options }) => {
  const { selected, sortEntries } = useTitles();
  return (
    <select
      className="entry-sort"
      value={selected}
      onChange={(e) => sortEntries(e.target.value)}
    >
      {options.map(({ key, label, type }) => (
        <option key={label} value={`${key}::${type}`}>
          {label}
        </option>
      ))}
    </select>
  );
};
