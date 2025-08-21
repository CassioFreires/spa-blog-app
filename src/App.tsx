import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/routers'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  )
}

export default App
