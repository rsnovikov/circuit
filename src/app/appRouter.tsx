import { createBrowserRouter } from 'react-router-dom';
import { CircuitPage } from '@/pages/circuit';
import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login/ui/Page';
import { RegisterPage } from '@/pages/register';
import { AuthGuard } from './guards/AuthGuard';
import { GuestGuard } from './guards/GuestGuard';
import { BaseLayout } from './layouts/BaseLayout';
import { CircuitLayout } from './layouts/CircuitLayout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <CircuitLayout />,
      children: [
        {
          path: '/circuit',
          element: (
            <GuestGuard>
              <CircuitPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      element: <BaseLayout />,
      children: [
        {
          element: (
            <AuthGuard>
              <RegisterPage />
            </AuthGuard>
          ),
          path: '/register',
        },
        {
          element: (
            <AuthGuard>
              <LoginPage />
            </AuthGuard>
          ),
          path: '/login',
        },
        {
          element: (
            <GuestGuard>
              <DashboardPage />
            </GuestGuard>
          ),
          path: '/dashboard',
        },
      ],
    },
  ]);
