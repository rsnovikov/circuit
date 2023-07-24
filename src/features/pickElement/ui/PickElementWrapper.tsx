import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { addPickedElement, removePickedElement } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch } from '@/shared/model';

interface IPickElementWrapperProps {
  elementType: string;
}

export const PickElementWrapper: FC<PropsWithChildren<IPickElementWrapperProps>> = ({
  elementType,
  children,
}) => {
  const dispatch = useAppDispatch();
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX: x, clientY: y } = e;
    dispatch(addPickedElement({ elementType, x, y }));
  };

  const handleKeyDown = () => {
    dispatch(removePickedElement());
  };

  useKeyDown(handleKeyDown, ['Escape']);

  return (
    <div onMouseDown={handleMouseDown} className="h-full">
      {children}
    </div>
  );
};
