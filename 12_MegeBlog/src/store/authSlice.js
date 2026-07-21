import { createSlice } from "@reduxjs/toolkit";
const initialState={
    state: false,
    userdata: null,
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.state=true
            state.userdata=action.payload?.userdata ?? action.payload?.userData ?? action.payload ?? null
        },

        logout:(state)=>{
            state.state=false
            state.userdata=null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer