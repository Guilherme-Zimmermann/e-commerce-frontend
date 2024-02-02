import React, { useEffect } from 'react'
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZWp4YWFpaXp2Y3Vwc2l5eHV5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjczNDY1NSwiZXhwIjoyMDIyMzEwNjU1fQ.ikNDaBMA04XBmrJVsTQ9Q2K3LMktiCWwQPm8kBRJbaY"
  )

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(baseUrl+"/api/product")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Erro:', error);
        });
    }, 180000); // 180000 milissegundos equivalem a 3 minutos
  
    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
