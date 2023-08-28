import { FC } from 'react';
import { useKeyDown } from '@/shared/lib/hooks/useKeyDown/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HotkeyTooltip } from '@/shared/ui/Tooltip';
import { removeSelectedElementAction } from '../model/removeSelectedElementAction';
import { removeSelectedNodeAction } from '../model/removeSelectedNodeAction';
import { removeSelectedWireAction } from '../model/removeSelectedWireAction';

export const RemoveSelectedTool: FC = () => {
  const selectedElementId = useAppSelector((state) => state.cirElement.selectedElementId);
  const selectedNodeId = useAppSelector((state) => state.node.selectedNodeId);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const dispatch = useAppDispatch();

  const removeSelected = () => {
    dispatch(removeSelectedElementAction());
    dispatch(removeSelectedNodeAction());
    dispatch(removeSelectedWireAction());
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
