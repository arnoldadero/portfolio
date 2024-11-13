import React from 'react'
import ReactDOM from 'react-dom/client'
import { Portfolio, ThemeProvider } from './index.tsx' // Add .tsx extension

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}

// Make sure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
