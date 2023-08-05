import { toggleIsGridVisible } from '@/entities/breadboard';
import { useKeyDown } from '@/shared/lib/useKeyDown';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

export const ToggleGridBreadboardTool = () => {
  const dispatch = useAppDispatch();

  const isGridVisible = useAppSelector((state) => state.breadboard.isGridVisible);

  const toggleGrid = () => {
    dispatch(toggleIsGridVisible());
  };

  useKeyDown({ callback: toggleGrid, codes: ['KeyG'] });

  return (
    <button onClick={toggleGrid}>
      <Icon type={isGridVisible ? 'GridOff' : 'Grid'} />
    </button>
  );
};
