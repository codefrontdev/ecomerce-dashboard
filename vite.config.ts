import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // لتجنب تحذيرات حجم الملفات الكبيرة
  },
  server: {
    open: true, // فتح المتصفح تلقائيًا عند التشغيل
  },
  preview: {
    port: 4173, // تحديد المنفذ للمعاينة
  },
  base: "/",
});
