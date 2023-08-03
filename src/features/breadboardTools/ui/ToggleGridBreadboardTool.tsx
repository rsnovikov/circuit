import { toggleIsGridVisible } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Icon } from '@/shared/ui/Icon/Icon';

export const ToggleGridBreadboardTool = () => {
  const dispatch = useAppDispatch();

  const isGridVisible = useAppSelector((state) => state.breadboard.isGridVisible);

  const handleClick = () => {
    dispatch(toggleIsGridVisible());
  };

  return (
    <button onClick={handleClick}>
      <Icon type={isGridVisible ? 'GridOff' : 'Grid'} />
    </button>
  );
};
