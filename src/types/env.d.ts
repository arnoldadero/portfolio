/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_GITHUB_TOKEN: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GITHUB_TOKEN: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
