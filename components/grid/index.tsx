import { useTitles } from 'services/titles/context';
import { Entry } from 'components/entry';

export const EntryGrid = () => {
  const { titles, error } = useTitles();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="grid">
      {titles.map((title, index) => (
        <Entry {...title} key={title.id} index={index} />
      ))}
    </section>
  );
};
