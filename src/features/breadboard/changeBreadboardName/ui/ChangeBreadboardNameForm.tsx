import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { setBreadboardName } from '@/entities/breadboard';
import { useAppDispatch, useAppSelector } from '@/shared/model';

export const ChangeBreadboardNameForm: FC = () => {
  const name = useAppSelector((state) => state.breadboard.name);

  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(name);

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const dispatch = useAppDispatch();

  const handleTextClick = () => {
    setIsFormActive(true);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = () => {
    if (inputValue.trim() === '') {
      dispatch(setBreadboardName('Новая схема'));
    } else {
      dispatch(setBreadboardName(inputValue));
    }
    setIsFormActive(false);
  };

  return (
    <div className="min-w-[225px] text-lg font-bold">
      {isFormActive ? (
        <form onSubmit={handleFormSubmit} className="flex">
          <input
            className="px-1 grow-0"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus={true}
            onBlur={submit}
          />
        </form>
      ) : (
        <div
          className="px-1 rounded hover:border-gray-500 border border-transparent"
          onClick={handleTextClick}
        >
          {name}
        </div>
      )}
    </div>
  );
};
