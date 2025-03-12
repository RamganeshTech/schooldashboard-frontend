import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SchoolContextProvider from './Context/SchoolContextProvider.tsx';
import { AuthProvider } from './Context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AuthProvider>
    <SchoolContextProvider>

      <App />

    </SchoolContextProvider>
  </AuthProvider>
  </StrictMode>,
)
