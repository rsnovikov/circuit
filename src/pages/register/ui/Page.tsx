import { FC } from 'react';
import { Authorization } from '@/widgets/authorization/ui/Authorization';

export const RegisterPage: FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-opacity-80">
      <Authorization action="register" />
    </div>
  );
};
