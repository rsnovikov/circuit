import { FC, ReactNode } from 'react';
import { useAppSelector } from '@/shared/model';
import { HeaderLogo } from '@/widgets/header/ui/HeaderLogo';
import { HeaderLogin } from './HeaderLogin';
import { HeaderMenu } from './HeaderMenu';

interface IHeaderProps {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export const Header: FC<IHeaderProps> = ({ leftSlot, rightSlot }) => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return (
    <div className="w-full bg-gray-50 flex py-1.5 px-3">
      <div className="w-full flex justify-between items-center">
        <div className="flex h-full items-center">
          <HeaderLogo />

          {leftSlot && <div className="ml-3">{leftSlot}</div>}
        </div>
        <div className="flex items-center">
          {rightSlot && <div className="mr-3">{rightSlot}</div>}
          {isAuthorized ? <HeaderMenu /> : <HeaderLogin />}
        </div>
      </div>
    </div>
  );
};
