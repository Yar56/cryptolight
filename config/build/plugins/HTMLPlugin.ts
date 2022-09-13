import {Plugin} from "esbuild";
import {rm, writeFile} from 'fs/promises';
import path from "path";

interface HTMLPluginOptions {
	template?: string;
	title?: string
	jsPath?: string[];
	cssPath?: string[];
}

const getHtml = (options: HTMLPluginOptions): string => {
	return options?.template || `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${options?.title}</title>
    ${options?.cssPath?.map(path => `<link href=${path} rel="stylesheet">`).join(' ')}
</head>
<body>
	<div id="root"></div>
	${options?.jsPath?.map(path => `<script src=${path}></script>`).join(' ')}
	
	<script>
		const evtSource = new EventSource("http://localhost:3000/subscribe"); 
        evtSource.onmessage = function(event) {
			console.log('onmessage', event);
            window.location.reload();
		}
        evtSource.onopen = function(event) {
			console.log('onopen', event)
		}
        evtSource.onerror = function(event) {
			console.error('error', event)
		}
	</script>
</body>
</html>
`
}

const preparePath = (outputs: string[]) => {
	return outputs.reduce<Array<string[]>>((acc, item) => {
		const [js, css] = acc;
		const resultFileName = item.split('/').pop();

		if (resultFileName?.endsWith('.js')) {
			js.push(resultFileName);
		} else if (resultFileName?.endsWith('.css')) {
			css.push(resultFileName)
		}
		return acc;
	}, [[], []])
}

export const HTMLPlugin = (options:HTMLPluginOptions): Plugin  => {
	return {
		name: 'CleanPlugin',
		setup(build) {
			const outdir = build.initialOptions.outdir

			build.onStart(async () => {

				try {
					// будь внимательней
					if (outdir) {
						await rm(outdir, {recursive: true})
					}
				} catch (e) {
					console.log('build folder error')

				}
			})
			build.onEnd(async (result) => {
				console.log('build end')
				const outPuts = result.metafile?.outputs;

				const [jsPath, cssPath] = preparePath(Object.keys(outPuts as object || {}));
				console.log(jsPath)
				console.log(cssPath)
				if (outdir) {
					await writeFile(
						path.resolve(outdir, 'index.html'),
						getHtml({jsPath, cssPath, ...options})
					)
				}
			})
		},
	}
}

