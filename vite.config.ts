import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // define port for project run in production mode:
  preview:{
    host:true,  // expose project in public address
    port: 3000
  }
})
