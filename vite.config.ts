import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'path';
import viteServerStartedHook from './plugins/vite-server-started-hook';
import {devElectron} from './script/dev';

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  plugins: [vue(), viteServerStartedHook(devElectron)],
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
