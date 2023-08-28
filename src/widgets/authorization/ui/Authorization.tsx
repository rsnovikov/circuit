import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import { RegisterForm } from '@/features/auth/register/ui/RegisterForm';

interface IAuthorizationProps {
  action: 'register' | 'login';
}

export const Authorization: FC<IAuthorizationProps> = ({ action }) => {
  return (
    <div className="max-w-[800px] grow p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {action === 'register' ? 'Регистрация' : 'Авторизация'}
      </h2>

      {action === 'register' ? <RegisterForm /> : <LoginForm />}

      <div className="text-sm  text-gray-900 mt-4">
        {action === 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
        <Link
          to={action === 'register' ? '/login' : '/register'}
          className="text-blue-600 hover:underline"
        >
          {action === 'register' ? 'Войти' : 'Зарегистрироваться'}
        </Link>
      </div>
    </div>
  );
};
