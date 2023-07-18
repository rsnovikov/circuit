import { FC, useState } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';
import { PickerCirElementList } from './PickerCirElementList';

export const ElementPicker: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleToggleShowClick = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-[300px] bg-[#E6E7EB] transition-[right] duration-700"
      style={{
        right: !isShow ? '-290px' : '',
      }}
    >
      <PickerCirElementList />
      <button
        onClick={handleToggleShowClick}
        type="button"
        className="absolute -left-[10px] bottom-[50%] w-[20px] h-[50px] bg-[#f1f1f3] border-1 border-[#dfe3e8] border z-10"
      >
        <Icon
          type={isShow ? 'ArrowRightSLine' : 'ArrowLeftSLine'}
          className="h-[30px] w-[30px] absolute -left-[5px] top-[10px]"
        />
      </button>
    </div>
  );
};
