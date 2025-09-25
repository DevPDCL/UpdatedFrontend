import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'react-query': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          
          // UI libraries
          'ui-vendor': ['framer-motion', '@material-tailwind/react', '@headlessui/react'],
          'icons': ['@heroicons/react'],
          
          // Utilities and tools  
          'utils-vendor': ['axios'],
          
          // Constants and static data
          'constants': [
            './src/constants/branches.js',
            './src/constants/health.js', 
            './src/constants/homepage.js',
            './src/constants/management.js'
          ],
        },
        // Optimize chunk naming for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace('.js', '')
            : 'chunk';
          return `assets/js/[name]-[hash:8].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash:8][extname]';
          }
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(name ?? '')) {
            return 'assets/media/[name]-[hash:8][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash:8][extname]';
          }
          return 'assets/[name]-[hash:8][extname]';
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.time', 'console.timeEnd']
      },
      mangle: {
        safari10: true
      }
    },
    // Performance optimizations
    chunkSizeWarningLimit: 800, // Warn if chunks exceed 800KB
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none' // Remove legal comments for smaller bundle
  },
  // Optimize deps for better performance
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      'react-spring'
    ]
  }
})
