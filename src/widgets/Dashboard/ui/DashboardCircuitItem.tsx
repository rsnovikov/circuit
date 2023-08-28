import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircuitListItem } from '@/entities/circuit/api/types';
import { DashboardCircuitActions } from './DashboardCircuitActions';

interface IDashboardCircuitItemProps {
  circuit: CircuitListItem;
}

export const DashboardCircuitItem: FC<IDashboardCircuitItemProps> = ({ circuit }) => {
  const { _id, updatedAt, name } = circuit;

  const navigate = useNavigate();

  const handleOpenCircuit = () => {
    navigate(`/circuit/${_id}`);
  };

  return (
    <div
      className="2xl:w-[calc(20%-32px)] lg:w-[calc(25%-32px)] md:w-[calc(33.3%-32px)] bg-gray-50 rounded-xl shadow-xl mx-4 mb-8 hover:border-blue-400 border-4 border-transparent transition duration-300 cursor-pointer"
      onClick={handleOpenCircuit}
    >
      <div className="w-full bg-white rounded-t-lg">
        <img
          src="/images/circuitPreview.png"
          width={250}
          height={250}
          className="rounded-t-lg w-full h-auto object-cover"
        />
      </div>
      <div className="p-3">
        <div className="font-medium text-lg truncate">{name}</div>
        <div className="flex justify-between items-center">
          <div>{new Date(updatedAt).toLocaleString()}</div>
          <DashboardCircuitActions circuit={circuit} />
        </div>
      </div>
    </div>
  );
};
