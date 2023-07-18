import { FC, MouseEventHandler } from 'react';
import { removeSelectedElement } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

export const RemoveElementTool: FC = () => {
  const selectedElementId = useAppSelector(
    (state) => state.breadboard.selectedElementId
  );
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler = () => {
    dispatch(removeSelectedElement());
  };

  return (
    <button
      onClick={handleClick}
      style={{
        cursor: selectedElementId ? 'pointer' : 'default',
      }}
    >
      <Icon type="DeleteBin" isDisabled={!selectedElementId} />
    </button>
  );
};
