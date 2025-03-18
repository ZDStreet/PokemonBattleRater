import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.ts'
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js'
        }
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    pokemon: [
                        './resources/js/components/pokemon/api.ts',
                        './resources/js/components/pokemon/ui.ts',
                        './resources/js/components/pokemon/index.ts'
                    ]
                }
            }
        }
    }
}); 