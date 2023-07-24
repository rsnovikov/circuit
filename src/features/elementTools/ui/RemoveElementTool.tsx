import { FC, MouseEventHandler } from 'react';
import { removeSelectedElement } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

export const RemoveElementTool: FC = () => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);

  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler = () => {
    if (selectedElementId) {
      dispatch(removeSelectedElement());
    } else if (selectedNodeId) {
    }
  };

  const isBtnActive = selectedElementId || selectedNodeId;

  return (
    <button
      onClick={handleClick}
      style={{
        cursor: isBtnActive ? 'pointer' : 'default',
      }}
    >
      <Icon type="DeleteBin" isDisabled={!isBtnActive} />
    </button>
  );
};
