import { FC, useState } from 'react';
import { CircuitListItem } from '@/entities/breadboard/api/types';
import { Icon } from '@/shared/ui/Icon/Icon';
import { CircuitActionsList } from './CircuitActionsList';

interface ICircuitActionsProps {
  circuit: CircuitListItem;
}

export const DashboardCircuitActions: FC<ICircuitActionsProps> = ({ circuit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative" onMouseLeave={handleClose} onClick={(e) => e.stopPropagation()}>
      {isOpen && <CircuitActionsList circuit={circuit} />}

      <div className="hover:bg-gray-300 rounded-full p-2 transition-colors" onClick={handleOpen}>
        <Icon type="ThreeDotsVertical" width={20} height={20} />
      </div>
    </div>
  );
};
