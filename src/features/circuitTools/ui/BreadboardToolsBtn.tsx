import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { IconType } from '@/shared/ui/Icon/icons';

interface IBreadboardToolsBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: IconType;
}

export const BreadboardToolsBtn: FC<PropsWithChildren<IBreadboardToolsBtnProps>> = ({
  iconType,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className=" p-2 border rounded-sm border-[#34495e] flex items-center justify-between shadow-sm text-xl"
    >
      <span className="h-[32px] py-1 mr-1">
        <Icon type={iconType} className="grow-0 " />
      </span>
      <span >{children}</span>
    </button>
  );
};
