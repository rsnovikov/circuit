import { FC } from 'react';
import { rotateSelectedElement } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
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

  const rotate = () => {
    dispatch(rotateSelectedElement(direction === 'left' ? 90 : -90));
  };

  useKeyDown({
    callback: rotate,
    codes: [direction === 'left' ? 'KeyL' : 'KeyR'],
  });

  const isBtnActive = selectedElementId || selectedNodeId || selectedWireId;

  return (
    <button
      onClick={rotate}
      style={{
        cursor: isBtnActive ? 'pointer' : 'default',
      }}
    >
      <Icon type={direction === 'right' ? 'RotateRight' : 'RotateLeft'} isDisabled={!isBtnActive} />
    </button>
  );
};
