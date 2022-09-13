import {Plugin} from "esbuild";
import {rm} from 'fs/promises';

export const CleanPlugin: Plugin = {
	name: 'CleanPlugin',
	setup(build) {
 		build.onStart(async () => {

			try {
				// будь внимательней
				const outdir = build.initialOptions.outdir
				if (outdir) {
					await rm(outdir, {recursive: true})
				}
			} catch (e) {
				console.log('build folder error')
			}
		})
		build.onEnd(() => {
			console.log('build end')
		})
	},
}
