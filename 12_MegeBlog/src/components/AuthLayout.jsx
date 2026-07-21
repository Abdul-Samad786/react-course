import React from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function AuthLayout({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authstatus=useSelector((state)=>state.auth.state)
    useEffect(()=>{
        if(authentication && authstatus!=authentication){
            navigate('/login')
        }
        else if(!authentication && authstatus==true){
            navigate('/')
        }
        setLoader(false)
    },[authstatus,authentication,navigate])
  return (
    loader ? <h2>Loading...</h2> : <>{children} </>
  )
}

export default AuthLayout