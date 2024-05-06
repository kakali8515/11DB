import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const vueSrc = "./src";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/assets/styles/style.scss";
          `,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, vueSrc),
        "~@": path.resolve(__dirname, vueSrc),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    server: {
      port: process.env.VITE_PORT,
      proxy: {
        "/api/v1/": {
          target: process.env.VITE_IMAGE_BASE_URL,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 3000,
    },
  });
};
