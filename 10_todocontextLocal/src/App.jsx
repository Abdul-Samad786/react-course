import { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoForm/>
    </>
  )
}

export default App
