import React, { useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
function Login() {
    const dispatch=useDispatch()
    const navigate=navigator()
    const {register,handleSubmit}=useForm()
    const {error,setError}=useState("")

    const login=async(data)=>{
        try {
            const session=authService.login(data)
            if (session){
                const userData=authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
              <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
              </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don't have an account? <Link to="/signup" className='font-medium text-primary hover:underline'>Sign up</Link>
                </p>
        {error && <p className='text-center text-base text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input label="Email" type="email" placeholder="Enter your email" {...register("email",{required:true})} />
                <Input label="Password" type="password" placeholder="Enter your password" {...register("password",{required:true})} />
                <Button type="submit" variant="primary" className='w-full'>Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login