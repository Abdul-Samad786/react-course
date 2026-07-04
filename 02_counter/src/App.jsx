import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  
  const addValue = () => {
    if (counter < 20) {
      setCounter(counter + 1)
    }
  }
  const deceaseValue=()=>{
    if (counter>0){
      setCounter(counter-1)
    }
  }
  return (
    <>
      <h1>Counter Application using hooks(useState)</h1>
      <h2>Counter value:{counter}</h2>

      <button onClick={addValue}>Add Value </button>
      <br />
      <button onClick={deceaseValue}>decrease value</button>
    </>
  )}
export default App
