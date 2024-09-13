import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// XXXXXXXXXXXXXXXXXXXXXXXXXX


// XXXXXXXXXXXXXXXXXXXXXXXXXX (vite config
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
