import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
                target: 'http://localhost:3000', // Assuming your Express server is running on port 3000
      },
    },
  },
  plugins: [react()],
})
