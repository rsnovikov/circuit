import { FC } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Btn } from '@/shared/ui/Btn/Btn';
import { Icon } from '@/shared/ui/Icon/Icon';
import { CreateBreadboardForm } from './CreateBreadboardForm';

export const CreateBreadboardBtn: FC = () => {
  const { openModal, closeModal } = useModal();

  const handleClick = async () => {
    openModal(<CreateBreadboardForm closeModal={closeModal} />);
  };

  return (
    <Btn className="flex items-center !py-1.5 !px-3" onClick={handleClick}>
      <Icon type="Add" width={25} height={25} /> <span className="text-xl">Создать</span>
    </Btn>
  );
};
