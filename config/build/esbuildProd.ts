import ESBuild from 'esbuild';
import config from './esbuildConfig';


ESBuild.build(config)
    .then(() => console.log("⚡ Build complete! ⚡"))
    .catch(() => process.exit(1));
