/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
