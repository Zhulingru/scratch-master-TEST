import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // GitHub Pages 使用 repository name 作為 base path
    // Repository 名稱是 "scratch-master-TEST"，所以 base 是 "/scratch-master-TEST/"
    // 如果 repository 名稱是 "your-username.github.io"，base 就是 "/"
    const base = process.env.GITHUB_REPOSITORY 
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
      : '/scratch-master-TEST/';
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
