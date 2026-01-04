import './styles/main.css'
import App from './App.svelte'

/* Refresh 적용 */
import { auth } from './stores'
await auth.refresh()

const app = new App({
  target: document.getElementById('app'),
})

export default app