import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src')},
    // { find: 'MNA', replacement: isProd ? path.resolve(__dirname, 'MNA') : path.resolve(__dirname, '..', 'MNA')}
    { find: 'MNA', replacement: path.resolve(__dirname, 'MNA') }
    ],
  },
});
