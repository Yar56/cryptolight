import ESBuild from 'esbuild';
import config from './esbuildConfig';
import express from 'express';
import path from "path";
import {EventEmitter} from "events"

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const emmiter = new EventEmitter();

app.use(express.static(path.resolve(__dirname, '..', '..', 'build/')))

app.get('/subscribe', (req, res) => {
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	}
	res.writeHead(200, headers);
	res.write('');

	emmiter.on('refresh', () => {
		res.write('data: message \n\n');
	})
})
function sendMessage() {
  emmiter.emit('refresh', 'refresh')
}


app.listen(PORT, () => console.log(`⚡ Server started on http://localhost:${PORT} ⚡`))


ESBuild.build({
	...config,
	watch: {
		onRebuild(err, result) {
			if (err) {
				console.error(err)
			} else {
				console.log('build...')
				sendMessage()
			}

		}
	}
})
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
