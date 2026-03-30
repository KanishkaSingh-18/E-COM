import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '../context/ThemeContext'

export default function ToastProvider({ children }) {
  const { currentTheme } = useTheme()
  const theme = currentTheme === 'dark' ? 'dark' : 'light'
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        theme={theme}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
