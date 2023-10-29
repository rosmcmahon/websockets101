import { useEffect, useState } from 'react'

export const App = () => {
	const [ws, setWs] = useState<WebSocket>()
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		const setupWsc = () => {
			// Create WebSocket connection.
			const wsc = new WebSocket('ws://localhost:8080')

			// Connection opened
			wsc.addEventListener('open', (event) => {
				console.log('Connected to WS server')
				wsc.send('Hello Server!')
			})

			// Listen for messages
			wsc.addEventListener('message', (event: MessageEvent<string>) => {
				console.log('Message from server: ', event.data)
				setMessages((prevMessages) => [...prevMessages, event.data])
			})

			// Connection closed
			wsc.addEventListener('close', (event) => {
				console.log('Disconnected from WS server. Attempting to reconnect...')
				setTimeout(setupWsc, 3_000)
			})

			setWs(wsc)
		}
		setupWsc()

		// Cleanup the connection when component is unmounted
		return () => {
			if (ws) {
				ws.close()
			}
		}
	}, [])

	const sendMessage = (message: string) => {
		if (ws) {
			ws.send(message)
		}
	}

	return (
		<div>
			<h1>WebSocket Example</h1>
			<button onClick={() => sendMessage('Hi from React!')}>
				Send Message
			</button>
			<ul>
				{messages.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>
		</div>
	)
}
