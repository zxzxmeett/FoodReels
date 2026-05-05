import React from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'

function App() {


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app-container">
        <AppRoutes />
      </div>
    </>
  )
}

export default App