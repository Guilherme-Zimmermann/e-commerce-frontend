import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import App from './App.tsx'
import './global.css'
import { queryClient } from './services/queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
