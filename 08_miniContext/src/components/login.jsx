import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState } from "react";
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')  
  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ username, password });
  };
  
  return (
    <div>
        <input type="text" placeholder="Enter your Username" value={username} onChange={(e)=>{ setUsername(e.target.value) }}/>
        <input type="text" placeholder="Enter your Password" value={password} onChange={(e)=>{ setPassword(e.target.value) }} />
        <button onClick={handleLogin}>Login</button>
    </div>
  )}
export default Login;