import react from '@vitejs/plugin-react'

import Svgr from 'vite-plugin-svgr'

export default {
  plugins: [Svgr(), react()],

  css: {
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables here if needed
      },
    },
  },

  esbuild: {
    jsxInject: 'import React from "react"',
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env': JSON.stringify(process.env),
  },

  // Additional configuration can go here...
}
