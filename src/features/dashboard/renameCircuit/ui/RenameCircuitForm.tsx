import { FC } from 'react';
import { useUpdateCircuitMutation } from '@/entities/circuit/api/api';
import { CircuitListItem } from '@/entities/circuit/api/types';
import { useAppDispatch } from '@/shared/model';
import { FormField } from '@/shared/model/types';
import { notify } from '@/shared/notification';
import { Form } from '@/shared/ui/form/Form';
import { renameCircuitSchema } from '../model/renameCircuitSchema';

interface IRenameBreadboardForm {
  closeModal: () => void;
  circuit: CircuitListItem;
}

export const RenameBreadboardForm: FC<IRenameBreadboardForm> = ({ closeModal, circuit }) => {
  const [update, { isLoading }] = useUpdateCircuitMutation();
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
      await update({ _id: circuit._id, name: formData.name }).unwrap();
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
