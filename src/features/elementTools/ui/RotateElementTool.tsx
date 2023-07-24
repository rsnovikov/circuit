import { FC, MouseEventHandler } from 'react';
import { rotateSelectedElement } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

interface IRotateElementToolProps {
  direction: 'left' | 'right';
}

export const RotateElementTool: FC<IRotateElementToolProps> = ({ direction }) => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler = () => {
    dispatch(rotateSelectedElement(direction === 'right' ? 30 : -30));
  };

  return (
    <button onClick={handleClick}>
      <Icon
        type={direction === 'right' ? 'RotateRight' : 'RotateLeft'}
        isDisabled={!selectedElementId}
      />
    </button>
  );
};
