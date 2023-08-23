import { FC } from 'react';
import { useRegisterMutation } from '@/entities/auth/api/api';
import { Form } from '../../../shared/ui/form/Form';
import { authSchema } from '../model/authSchema';
import { FormField } from '../model/types';

const formFields: FormField[] = [
  {
    name: 'email',
    title: 'Email',
    placeholder: 'job.novikovroman@gmail.com',
  },
  { name: 'password', type: 'password', title: 'Пароль' },
  { name: 'repeatedPassword', type: 'password', title: 'Повторите пароль' },
];

export const RegisterForm: FC = () => {
  const [register, { error, isLoading }] = useRegisterMutation();

  // todo: add normal typing
  const handleSubmit = (formData: { [key: string]: string }) => {
    if ('email' in formData && 'password' in formData) {
      register({ email: formData.email.trim(), password: formData.password.trim() });
    } else {
      throw new Error('Type error');
    }
  };

  const validate = (formData: { [key: string]: string }) => {
    const errors: { [key: string]: string } = {};

    if (formData.password !== formData.repeatedPassword) {
      errors.repeatedPassword = 'Пароли должны совпадать';
    }
    return errors;
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={formFields}
      error={error}
      additionalValidate={validate}
      schema={authSchema}
      isLoading={isLoading}
      btnText="Зарегистрироваться"
    />
  );
};
