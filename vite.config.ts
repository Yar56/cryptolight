import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build'
    },
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    plugins: [react(), svgr()]
});
