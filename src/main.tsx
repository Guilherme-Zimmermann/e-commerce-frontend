import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import App from './App.tsx'
import './global.css'
import { queryClient } from './services/queryClient.ts'
import { createClient } from '@supabase/supabase-js'

export const baseUrl = "https://ecommerce-qzia.onrender.com"
export const baseUrlImages = "https://unejxaaiizvcupsiyxuy.supabase.co/storage/v1/object/public/images"
export const supabase = createClient(
    'https://unejxaaiizvcupsiyxuy.supabase.co',
    process.env.SUPABASE_KEY as string
  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
