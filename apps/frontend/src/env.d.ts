/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_ENDPOINT: string;
  readonly VITE_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
