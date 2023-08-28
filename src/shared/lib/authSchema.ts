import { FieldValidateSchema } from '@/shared/lib/validateFormData';

export const authSchema: { [key: string]: FieldValidateSchema } = {
  email: {
    isRequired: {
      message: 'Email обязателен для заполнения',
    },
    isEmail: {
      message: 'Email невалидный',
    },
  },
  password: {
    isRequired: { message: 'Пароль обязателен для заполнения' },
    minLength: {
      value: 6,
      message: 'Минимальная длина пароля 6 символов',
    },
    maxLength: {
      value: 30,
      message: 'Максимальная длина пароля 30 символов',
    },
    isContainDigital: {
      message: 'Пароль должен содержать цифры',
    },
    isContainDifferentCase: {
      message: 'Пароль должен содержать заглавные буквы',
    },
  },
};
