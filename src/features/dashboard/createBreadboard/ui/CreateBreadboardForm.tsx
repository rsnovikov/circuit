import { FC } from 'react';
import { useCreateCircuitMutation } from '@/entities/circuit/api/api';
import { useAppDispatch } from '@/shared/model';
import { FormField } from '@/shared/model/types';
import { notify } from '@/shared/notification';
import { Form } from '@/shared/ui/form/Form';
import { createBreadboardSchema } from '../model/createBreadboardSchema';

interface ICreateBreadboardForm {
  closeModal: () => void;
}

const formFields: FormField[] = [
  {
    name: 'name',
    title: 'Название новой схемы',
    placeholder: 'Моя любимая лаба',
  },
];

export const CreateBreadboardForm: FC<ICreateBreadboardForm> = ({ closeModal }) => {
  const [create, { isLoading }] = useCreateCircuitMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (formData: { [key: string]: string }) => {
    if (!('name' in formData)) throw new Error('Ошибка: в форме нет поля name');

    try {
      await create({ name: formData.name }).unwrap();
    } catch (e) {
      dispatch(notify({ type: 'error', message: 'Ошибка при создании схемы, попробуйте позже' }));
    } finally {
      closeModal();
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={formFields}
      schema={createBreadboardSchema}
      btnText="Создать"
      isLoading={isLoading}
    ></Form>
  );
};
