import type { Title } from 'schema/title';

/**
 *
 * Returns a handler given a title state, which can be used
 * to swap two items when dragging and dropping, given the index
 * of the item dragged and the index of the item hovered over
 */
export const createSwap =
  (prevState: Title[]) => (dragIndex: number, hoverIndex: number) => {
    if (
      dragIndex > prevState.length ||
      hoverIndex > prevState.length ||
      dragIndex < 0 ||
      hoverIndex < 0
    ) {
      return prevState;
    }

    const itemToDrag = prevState[dragIndex];
    const itemHovered = prevState[hoverIndex];
    const copyState = [...prevState];
    copyState[dragIndex] = itemHovered;
    copyState[hoverIndex] = itemToDrag;
    return copyState;
  };
