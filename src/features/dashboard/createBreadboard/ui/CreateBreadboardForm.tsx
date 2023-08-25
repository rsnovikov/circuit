import { FC } from 'react';
import { useCreateBreadboardMutation } from '@/entities/breadboard/api/api';
import { FormField } from '@/features/auth/model/types';
import { notify } from '@/features/notification';
import { useAppDispatch } from '@/shared/model';
import { Form } from '@/shared/ui/form/Form';
import { createBreadboardSchema } from './createBreadboardSchema';

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
  const [createBreadboard, { isLoading }] = useCreateBreadboardMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (formData: { [key: string]: string }) => {
    if (!('name' in formData)) throw new Error('Ошибка: в форме нет поля name');

    try {
      await createBreadboard({ name: formData.name }).unwrap();
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
