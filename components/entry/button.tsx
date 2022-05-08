import { ReactNode } from 'react';
import { useTitles } from 'services/titles/context';

type Props = {
  children: ReactNode;
  id: number;
};

type Option = {
  color: string;
  label: string;
};

const StatusColors: Record<string, Option> = {
  done: {
    color: 'bg-green',
    label: 'Done',
  },
  todo: {
    color: 'bg-blue',
    label: 'To Do',
  },
};

export const StatusButton: React.FC<Props> = ({ children, id, ...props }) => {
  const { updateStatus } = useTitles();
  if (typeof children !== 'string') {
    throw Error('Child element must be of type string.');
  }

  const options = StatusColors[children];

  return (
    <button
      className={`status-button ${options.color}`}
      onClick={() => updateStatus(id, children === 'todo' ? 'done' : 'todo')}
      {...props}
    >
      {options.label}
    </button>
  );
};
