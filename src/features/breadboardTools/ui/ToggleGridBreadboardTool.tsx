import { toggleIsGridVisible } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HotkeyTooltip } from '@/shared/ui/Tooltip';

export const ToggleGridBreadboardTool = () => {
  const dispatch = useAppDispatch();

  const isGridVisible = useAppSelector((state) => state.breadboard.isGridVisible);

  const toggleGrid = () => {
    dispatch(toggleIsGridVisible());
  };

  useKeyDown({ callback: toggleGrid, codes: ['KeyG'] });

  return (
    <HotkeyTooltip text={isGridVisible ? 'Скрыть сетку' : 'Показать сетку'} hotkey="G">
      <button onClick={toggleGrid}>
        <Icon type={isGridVisible ? 'GridOff' : 'Grid'} width={33} height={33} />
      </button>
    </HotkeyTooltip>
  );
};
