import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CartContextProvider } from './stores/cart-context.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>,
)
