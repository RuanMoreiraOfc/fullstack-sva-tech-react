import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  const ENVS = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const PORT = Number(ENVS.PORT) || 3000;

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      host: true,
      port: PORT,
      hmr: {
        clientPort: PORT,
      },
      watch: {
        usePolling: true,
      },
    },
  });
};
