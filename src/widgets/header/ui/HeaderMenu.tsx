import { FC, useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HeaderBtn } from './HeaderBtn';
import { HeaderMenuDropdown } from './HeaderMenuDropdown';

export const HeaderMenu: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div>
      <HeaderBtn className="flex items-center justify-between" onClick={handleClick}>
        <Icon type="Menu" stroke="white" width={20} height={20} className="mr-1" />
        <span>Меню</span>
      </HeaderBtn>

      {isActive && <HeaderMenuDropdown />}
    </div>
  );
};
