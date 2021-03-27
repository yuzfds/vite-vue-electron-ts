import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  plugins: [vue()],
  base:'./',
  server: {
    port: 8099
  },
  resolve:{
    alias:{

    }
  },
  build:{
    outDir: join(__dirname, 'dist/render'),
    sourcemap: true,
    minify: false,
    rollupOptions:{
      external: ['electron']
    }
  }

})
