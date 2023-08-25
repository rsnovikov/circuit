import { FC } from 'react';
import { rotateSelectedElement } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HotkeyTooltip } from '@/shared/ui/Tooltip';

interface IRotateElementToolProps {
  direction: 'left' | 'right';
}

export const RotateElementTool: FC<IRotateElementToolProps> = ({ direction }) => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const dispatch = useAppDispatch();
  const degree = direction === 'left' ? 90 : -90;
  const rotate = () => {
    dispatch(rotateSelectedElement(degree));
  };

  useKeyDown({
    callback: rotate,
    codes: [direction === 'left' ? 'KeyL' : 'KeyR'],
  });

  const isBtnActive = Boolean(selectedElementId || selectedNodeId || selectedWireId);

  return (
    <HotkeyTooltip
      text={`Повернуть на ${degree}`}
      hotkey={direction === 'left' ? 'L' : 'R'}
      isActive={isBtnActive}
    >
      <button
        onClick={rotate}
        style={{
          cursor: isBtnActive ? 'pointer' : 'default',
        }}
      >
        <Icon
          type={direction === 'right' ? 'RotateRight' : 'RotateLeft'}
          isDisabled={!isBtnActive}
          width={33}
          height={33}
        />
      </button>
    </HotkeyTooltip>
  );
};
