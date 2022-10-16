import path from 'path';
import { BuildOptions } from 'esbuild';
import svgrPlugin from 'esbuild-plugin-svgr';
import cssModulesPlugin from 'esbuild-css-modules-plugin';
import { CleanPlugin } from './plugins/CleanPlugin';
import { HTMLPlugin } from './plugins/HTMLPlugin';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const mode = process.env.ENV_NAME || 'development';
const isDev = mode === 'development';
const isProd = mode === 'production';

const resolveRoot = (...segments: string[]) => {
    return path.resolve(__dirname, '..', '..', ...segments);
};

const JS_ENTRY_POINT = resolveRoot('src', 'index.tsx');

const config: BuildOptions = {
    entryPoints: [JS_ENTRY_POINT],
    outdir: resolveRoot('build/'),
    entryNames: '[dir]/bundle.[name]-[hash]',
    bundle: true,
    tsconfig: resolveRoot('tsconfig.json'),
    minify: isProd,
    sourcemap: isDev,
    metafile: true,
    loader: {
        '.svg': 'file',
        '.png': 'file'
    },
    plugins: [
        svgrPlugin(),
        CleanPlugin,
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source);
                return css;
            }
        }),
        cssModulesPlugin(),
        HTMLPlugin({ title: 'CryptoLight' })
    ]
};
export default config;
