import { FieldValidateSchema } from '@/shared/lib/validateFormData';

export const renameCircuitSchema: { [key: string]: FieldValidateSchema } = {
  name: {
    isRequired: { message: 'Название обязателен для заполнения' },
  },
};
