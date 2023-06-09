import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0960bd' // 配置主题的主色调
        },
        javascriptEnabled: true
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://ihrm.itheima.net',
        changeOrigin:true
      }
    }
  }
})
