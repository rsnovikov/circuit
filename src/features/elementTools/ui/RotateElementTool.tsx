import { FC, MouseEventHandler } from 'react';
import { rotateSelectedElement } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

interface IRotateElementToolProps {
  direction: 'left' | 'right';
}

export const RotateElementTool: FC<IRotateElementToolProps> = ({ direction }) => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler = () => {
    dispatch(rotateSelectedElement(direction === 'right' ? 30 : -30));
  };

  const isBtnActive = selectedElementId || selectedNodeId || selectedWireId;

  return (
    <button
      onClick={handleClick}
      style={{
        cursor: isBtnActive ? 'pointer' : 'default',
      }}
    >
      <Icon type={direction === 'right' ? 'RotateRight' : 'RotateLeft'} isDisabled={!isBtnActive} />
    </button>
  );
};
