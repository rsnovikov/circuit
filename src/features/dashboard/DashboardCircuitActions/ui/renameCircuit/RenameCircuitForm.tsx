import { FC } from 'react';
import { usePartialUpdateBreadboardMutation } from '@/entities/breadboard/api/api';
import { CircuitListItem } from '@/entities/breadboard/api/types';
import { FormField } from '@/features/auth/model/types';
import { notify } from '@/features/notification';
import { useAppDispatch } from '@/shared/model';
import { Form } from '@/shared/ui/form/Form';
import { renameCircuitSchema } from './RenameCircuitSchema';

interface IRenameBreadboardForm {
  closeModal: () => void;
  circuit: CircuitListItem;
}

export const RenameBreadboardForm: FC<IRenameBreadboardForm> = ({ closeModal, circuit }) => {
  const [partialUpdate, { isLoading }] = usePartialUpdateBreadboardMutation();
  const dispatch = useAppDispatch();

  const formFields: FormField[] = [
    {
      name: 'name',
      title: 'Новое название',
      placeholder: 'Новое название',
      defaultValue: circuit.name,
    },
  ];

  const handleSubmit = async (formData: { [key: string]: string }) => {
    if (!('name' in formData)) throw new Error('Ошибка: в форме нет поля name');

    try {
      await partialUpdate({ _id: circuit._id, name: formData.name }).unwrap();
    } catch (e) {
      dispatch(
        notify({
          type: 'error',
          message: `Ошибка при переименовании схемы "${circuit.name}", попробуйте позже`,
        })
      );
    } finally {
      closeModal();
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={formFields}
      schema={renameCircuitSchema}
      btnText="Переименовать"
      isLoading={isLoading}
    />
  );
};
