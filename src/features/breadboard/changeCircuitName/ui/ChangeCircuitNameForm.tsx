import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { setCircuitName } from '@/entities/circuit';
import { useUpdateCircuitMutation } from '@/entities/circuit/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { notify } from '@/shared/notification';

export const ChangeCircuitNameForm: FC = () => {
  const [update, { isLoading }] = useUpdateCircuitMutation();

  const name = useAppSelector((state) => state.circuit.name);
  const circuitId = useAppSelector((state) => state.circuit._id);

  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(name);

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const dispatch = useAppDispatch();

  const submit = async () => {
    if (!circuitId) return;

    setIsFormActive(false);

    if (inputValue.trim() === '') return;

    const prevName = name;

    try {
      dispatch(setCircuitName(inputValue));
      const data = await update({ _id: circuitId, name: inputValue }).unwrap();
      dispatch(
        notify({ message: `Название схемы успешно изменено на ${data.name}`, type: 'success' })
      );
    } catch (e) {
      dispatch(setCircuitName(prevName));
      dispatch(notify({ message: 'Ошибка при изменении названия схемы', type: 'error' }));
    }
  };

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

  return (
    <div className="min-w-[225px] text-lg font-bold">
      {isFormActive ? (
        <form onSubmit={handleFormSubmit} className="flex">
          <input
            disabled={isLoading}
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
