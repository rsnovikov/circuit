import { FC } from 'react';
import { useGetAllBreadboardQuery } from '@/entities/breadboard';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { Spinner } from '@/shared/ui/Spinner';
import { DashboardCircuitItem } from './DashboardCircuitItem';

export const DashboardCircuitList: FC = () => {
  const { data, error, isLoading } = useGetAllBreadboardQuery();

  if (isLoading) return <Spinner className="flex justify-center" />;

  if (error)
    return (
      <ErrorMessage>
        {error?.data?.message || 'Непредвиденная ошибка, попробуйте позже'}
      </ErrorMessage>
    );

  return (
    <div className="flex justify-start items-start -mx-4 flex-wrap">
      {data?.map((circuit) => (
        <DashboardCircuitItem key={circuit._id} circuit={circuit} />
      ))}
    </div>
  );
};
