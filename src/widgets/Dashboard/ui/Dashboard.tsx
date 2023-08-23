import { FC } from 'react';
import { useGetAllBreadboardQuery } from '@/entities/breadboard';

export const Dashboard: FC = () => {
  const { data } = useGetAllBreadboardQuery();
  console.log(data);
  return <div className="min-h-full w-full pt-16 container mx-auto text-3xl">Ваши схемы</div>;
};
