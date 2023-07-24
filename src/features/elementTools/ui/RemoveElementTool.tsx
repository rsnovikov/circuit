import { FC, MouseEventHandler } from 'react';
import { removeSelectedElement } from '@/entities/breadboard';
import { removeSelectedNode } from '@/entities/node';
import { removeSelectedWire } from '@/entities/wire/model/slice';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

export const RemoveElementTool: FC = () => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);

  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler = () => {
    if (selectedElementId) {
      dispatch(removeSelectedElement());
    } else if (selectedNodeId) {
      dispatch(removeSelectedNode());
    } else if (selectedWireId) {
      dispatch(removeSelectedWire());
    }
  };

  const isBtnActive = selectedElementId || selectedNodeId || selectedWireId;

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
