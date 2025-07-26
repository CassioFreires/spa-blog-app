import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // com Popper incluso
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
)
