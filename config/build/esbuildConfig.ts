import path from 'path'
import {BuildOptions} from "esbuild";
import svgrPlugin from "esbuild-plugin-svgr";
import {CleanPlugin} from "./plugins/CleanPlugin";
import {HTMLPlugin} from "./plugins/HTMLPlugin";

const mode = process.env.ENV_NAME || 'development'
const isDev = mode === 'development';
const isProd = mode === 'production';

const resolveRoot = (...segments: string[]) => {
  return path.resolve(__dirname, '..', '..', ...segments)
}

const JS_ENTRY_POINT = resolveRoot( 'src', 'index.jsx');

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
                '.png': 'file',
        },
        plugins: [
            svgrPlugin(),
            CleanPlugin,
            HTMLPlugin({title: 'CryptoLight'})
        ]
}
export default config;
