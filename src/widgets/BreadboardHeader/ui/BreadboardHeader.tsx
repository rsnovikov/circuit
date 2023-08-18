import { FC } from 'react';
import { ChangeBreadboardNameForm } from '@/features/changeBreadboardName';
import { HeaderLogo } from './HeaderLogo';

export const BreadboardHeader: FC = () => {
  return (
    <div className="w-full bg-white flex p-2.5 shadow-[0px_1px_4px_0px_rgba(52,73,94,0.15)]">
      <div className="flex items-center">
        <div className="mr-3">
          <HeaderLogo />
        </div>
        <ChangeBreadboardNameForm />
      </div>
    </div>
  );
};
