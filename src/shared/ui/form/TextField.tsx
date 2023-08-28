import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ErrorMessage } from '../ErrorMessage';

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
}

export const TextField: FC<ITextFieldProps> = ({
  error,
  title,
  className,
  name,
  type = 'text',
  ...rest
}) => {
  return (
    <div className="relative">
      {title && (
        <label htmlFor={name} className="block mb-2 text-md font-medium text-gray-900">
          {title}
        </label>
      )}
      <input
        id={name}
        className={clsx(
          'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 outline-blue-300 focus:border-blue-300 block w-full p-2.5',
          className
        )}
        name={name}
        autoComplete="on"
        formNoValidate={true}
        spellCheck={false}
        type={type}
        {...rest}
      />
      {error && <ErrorMessage className="absolute -bottom-[22px]">{error}</ErrorMessage>}
    </div>
  );
};
