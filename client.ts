import { WebSocket } from 'ws'
const wsc = new WebSocket('ws://localhost:8080', {

})

wsc.on('error', console.error)

wsc.on('open', () => {
	console.log('connected')
	wsc.send('hello')
})

wsc.on('message', (data) => {
	if (data instanceof Buffer) {
		console.log('received', data.toString())
	}
})