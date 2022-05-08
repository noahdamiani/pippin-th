import type { NextPage } from 'next';
import { TitleProvider } from 'services/titles/context';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EntryGrid } from 'components/grid';
import { EntrySort } from 'components/entry/sort';
import { sortEntriesOptions } from 'schema/sort';

const Home: NextPage = () => {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <TitleProvider>
          <EntrySort options={sortEntriesOptions} />
          <EntryGrid />
        </TitleProvider>
      </DndProvider>
    </main>
  );
};

export default Home;
