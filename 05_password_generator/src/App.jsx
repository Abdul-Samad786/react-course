import { useState,useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);  
  const [charAllowed,setcharAllowed]=useState(false)
  const [password, setPassword] = useState("")

  const password_generator= useCallback(() => {
    const numbers = "0123456789";
    const characters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    if (numberAllowed) {
      const allChars = numbers;
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
    } else if (charAllowed) {
      const allChars = characters + letters;
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
    } else {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        password += letters[randomIndex];
      }
    }
    setPassword(password);
  }, [length, numberAllowed, charAllowed]);
  useEffect(() => {
    password_generator();
  },[length, numberAllowed, charAllowed, password_generator]
  )
  return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          // ref={passwordRef}
        />
        <button
        // onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
           defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
               setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
               defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                   setcharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App