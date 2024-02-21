/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string;
  readonly VITE_ARTIFICIAL_NETWORK_DELAY_IN_MILISECONDS: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
