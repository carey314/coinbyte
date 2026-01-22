import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    // host: '0.0.0.0',
    proxy: {
      //配置自定义代理规则
      // 字符串简写写法
      '/api': {
        // target: 'https://api.b2bdemo-accounting.com/api',
        target: 'https://api.b2broker.com/api/',
        changeOrigin: true, //是否跨域
        rewrite: path => path.replace(/^\/api/, '')
      },
      "/adminapi": {
        target: "http://54.153.233.93:88/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/adminapi/, ""),
      },
      // "/file": {
      //   target: "https://child.coinbyte.com.au",
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
