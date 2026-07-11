import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/login'
import Profile from './components/profile'
function App() {

  return (
    <>
      <h1>Welcome to chai and code with Abdul Samad </h1>
      <UserContextProvider>
        <Login />
        <Profile />
      </UserContextProvider>
    </>
      
  )
}

export default App
