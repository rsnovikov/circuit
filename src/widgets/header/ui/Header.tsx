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
    <div className="w-full bg-white flex py-1.5 px-3 shadow-[0px_1px_4px_0px_rgba(52,73,94,0.15)]">
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
