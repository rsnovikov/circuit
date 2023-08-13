import { FC } from 'react';
import { removeSelectedElement } from '@/entities/breadboard';
import { removeSelectedNode } from '@/entities/node';
import { removeSelectedWire } from '@/entities/wire/model/slice';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HotkeyTooltip } from '@/shared/ui/Tooltip';

export const RemoveElementTool: FC = () => {
  const selectedElementId = useAppSelector((state) => state.breadboard.selectedElementId);
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const dispatch = useAppDispatch();

  const removeSelected = () => {
    dispatch(removeSelectedElement());
    dispatch(removeSelectedNode());
    dispatch(removeSelectedWire());
  };

  useKeyDown({ callback: removeSelected, codes: ['Delete'] });

  const isBtnActive = Boolean(selectedElementId || selectedNodeId || selectedWireId);

  return (
    <HotkeyTooltip text="Удалить" hotkey="DELETE" isActive={isBtnActive}>
      <button
        onClick={removeSelected}
        style={{
          cursor: isBtnActive ? 'pointer' : 'default',
        }}
      >
        <Icon type="DeleteBin" isDisabled={!isBtnActive} height={33} width={33} />
      </button>
    </HotkeyTooltip>
  );
};
