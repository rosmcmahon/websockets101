import { WebSocketServer } from 'ws'
import si from 'systeminformation'

const port = 8080
const wss = new WebSocketServer({ port })

wss.on('connection', (ws) => {
	console.log(`connected on port ${port}`)
	ws.on('message', (data) => {
		console.log('received: %s', data)
		ws.send(`Hello it's server, you sent -> ${data}`)
	})

	ws.send('starting')
	setInterval(async () => {
		const loadData = await si.currentLoad()
		ws.send(`load: ${loadData.currentLoad}, cpus: ${loadData.cpus.length}`)
	}, 2_000)
})
