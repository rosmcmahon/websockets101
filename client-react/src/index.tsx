import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('app')
if (!container) {
	throw new Error('Could not find app container element')
}
const root = createRoot(container)
root.render(<App />)
