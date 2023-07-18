import { createBrowserRouter } from 'react-router-dom';
import { CircuitPage } from '@/pages/circuit';
import { Layout } from '@/shared/ui/Layout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>error</div>,
      children: [
        {
          path: '/circuit',
          element: <CircuitPage />,
        },
      ],
    },
  ]);
