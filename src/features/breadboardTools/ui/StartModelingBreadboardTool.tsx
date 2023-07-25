import { FC } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';

export const StartModelingBreadboardTool: FC = () => {
  return (
    <button
      className="h-[32px] px-2 border rounded-sm border-[#34495e] flex items-center justify-between shadow-sm"
      // style={{
      //   cursor: isBtnActive ? 'pointer' : 'default',
      // }}
    >
      <span className="h-[32px] py-1 mr-1">
        <Icon type="PlayFill" className="grow-0 " />
      </span>
      <span> Начать моделирование</span>
    </button>
  );
};
