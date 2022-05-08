import type { Title } from 'schema/title';
import Image from 'next/image';
import { LegacyRef, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTitles } from 'services/titles/context';
import { StatusButton } from './button';

interface TitleWithRenderIndex extends Title {
  index: number;
}

export const Entry: React.FC<TitleWithRenderIndex> = ({
  orderNumber,
  address,
  image,
  searchEffectiveDate,
  status,
  id,
  index,
}) => {
  const { moveEntry } = useTitles();

  // Handles dragging of the entry
  const [{ isDragging }, dragRef] = useDrag({
    type: 'Entry',
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handles when the entry is being dropped on
  const drop = useDrop<TitleWithRenderIndex>({
    accept: 'Entry',
    hover: (item) => {
      moveEntry(item.index, index);
      item.index = index;
    },
  });

  const dropRef = drop[1];

  const ref = useRef<HTMLDivElement>(null);
  const dragDropRef = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <div
      className="entry"
      ref={dragDropRef as LegacyRef<HTMLDivElement>}
      style={{ opacity }}
    >
      <div className="header">
        <div className="order-number text-gray">{orderNumber}</div>
        <div className="search-date text-red text-weight-700 text-lg">
          {searchEffectiveDate}
        </div>
      </div>

      <div className="image">
        <Image layout="fill" objectFit="cover" src={image} alt={address} />
      </div>

      <div className="address text-black text-weight-900 text-sm">
        {address}
      </div>

      <StatusButton id={id}>{status}</StatusButton>
    </div>
  );
};
