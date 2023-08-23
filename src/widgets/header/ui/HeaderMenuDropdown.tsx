import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoutBtn } from '@/features/auth';
import { truncateStr } from '@/shared/lib/truncateStr';
import { useAppSelector } from '@/shared/model';
import { HeaderMenuItem } from './HeaderMenuItem';

export const HeaderMenuDropdown: FC = () => {
  const email = useAppSelector((state) => state.auth.email);

  return (
    <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-2 top-[38px]">
      <div className="px-4 py-3">
        <span className="block text-sm  text-gray-500 truncate">
          {email && truncateStr(email, 12)}
        </span>
      </div>
      <ul className="py-2">
        <HeaderMenuItem>
          <Link to="/dashboard">Мои схемы</Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <LogoutBtn />
        </HeaderMenuItem>
      </ul>
    </div>
  );
};
