import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetCircuitData } from '@/entities/circuit';
import { useGetCircuitDataQuery } from '@/entities/circuit/api/api';
import { resetNodeData } from '@/entities/node';
import { resetWireData } from '@/entities/wire';
import { useAppDispatch } from '@/shared/model';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { Spinner } from '@/shared/ui/Spinner';
import { Breadboard } from '@/widgets/Breadboard';
import { ElementPicker } from '@/widgets/ElementPicker/ui/ElementPicker';
import { SelectedElementModal } from '@/widgets/SelectedElementModal';
import { Toolbox } from '@/widgets/Toolbox';

export const CircuitPage: FC = () => {
  const { circuitId } = useParams();

  const dispatch = useAppDispatch();

  if (!circuitId) return;

  const { isLoading, error } = useGetCircuitDataQuery(circuitId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    return () => {
      dispatch(resetCircuitData());
      dispatch(resetNodeData());
      dispatch(resetWireData());
    };
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="w-full h-full relative text-[#34495e]">
      <Toolbox />

      <div className="relative flex h-full w-full justify-end items-start">
        <Breadboard />
        <SelectedElementModal />
        <ElementPicker />
      </div>
    </div>
  );
};
