import { FieldValidateSchema } from '@/shared/lib/validateFormData';

export const createBreadboardSchema: { [key: string]: FieldValidateSchema } = {
  name: {
    isRequired: { message: 'Название обязателен для заполнения' },
  },
};
