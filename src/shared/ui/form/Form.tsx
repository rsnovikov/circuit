import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FieldValidateSchema, validateFormData } from '@/shared/lib/validateFormData';
import { Btn } from '@/shared/ui/Btn/Btn';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { TextField } from '@/shared/ui/form/TextField';
import { FormField } from '../../../features/auth/model/types';

interface IAuthFormProps {
  handleSubmit: (formData: { [key: string]: string }) => void;
  fields: FormField[];
  error?: FetchBaseQueryError | SerializedError;
  additionalValidate?: (formData: { [key: string]: string }) => { [key: string]: string };
  schema: { [key: string]: FieldValidateSchema };
  isLoading: boolean;
  btnText: string;
}

export const Form: FC<IAuthFormProps> = ({
  handleSubmit,
  fields,
  error,
  additionalValidate,
  schema,
  isLoading,

  btnText,
}) => {
  const initialFormData = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }),
    {}
  );

  const [formData, setFormData] = useState<{ [key: string]: string }>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOnceSubmitted, setIsOnceSumbitted] = useState<boolean>(false);

  const validate = () => {
    let errors = validateFormData(formData, schema);
    if (additionalValidate) {
      errors = { ...errors, ...additionalValidate(formData) };
    }

    setErrors(errors);
    if (!isOnceSubmitted) {
      setIsOnceSumbitted(true);
    }

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (!isOnceSubmitted) return;

    validate();
  }, [isOnceSubmitted, formData]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map(({ name, title, type, placeholder }) => (
        <div key={name} className="mb-6">
          <TextField
            value={formData[name]}
            name={name}
            onChange={handleChange}
            error={errors[name]}
            title={title}
            placeholder={placeholder}
            type={type}
          />
        </div>
      ))}

      <div className="mt-7">
        <Btn isLoading={isLoading}>{btnText}</Btn>

        {error && (
          <ErrorMessage className="ml-3">
            {/* todo: fix type error */}
            {/* @ts-ignore */}
            {error?.data?.message || 'Непредвиденная ошибка, попробуйте позже'}
          </ErrorMessage>
        )}
      </div>
    </form>
  );
};
