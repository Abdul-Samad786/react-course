import React, { useState } from "react";
import { Link,Navigate, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";  
import {Button,Input,Logo} from './index'
import {login as authLogin, login} from '../store/authSlice'
import { useForm } from "react-hook-form";

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    
    const create = async (data) => {
        try {
            const userData = await authService.createAccount(data.email,data.password)
            if (userData) {
                const user = await authService.getCurrentUser()
                if (user) dispatch(authLogin({ userdata: user }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Create your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
                </p>
                {error && <p className='text-center text-base text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Email" type="email" autoComplete="email" placeholder="Enter your email" {...register("email", { required: true })} />
                        <Input label="Password" type="password" autoComplete="current-password" placeholder="Enter your password" {...register("password", { required: true })} />
                        <Button type="submit" variant="primary" className='w-full'>Sign up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup