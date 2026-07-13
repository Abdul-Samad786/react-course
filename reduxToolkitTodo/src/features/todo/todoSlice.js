import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{uid: 1, title: "Learn Redux Toolkit", completed: false}]

}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
            addTodo:(state,action)=>{  //state is the current state of the slice, action is the payload that we pass to the reducer
                const todo={
                    uid: nanoid(),
                    title: action.payload,
                }
                state.todos.push(todo)
         //       console.log("Current state of todos are",state.todos.values)
                },
            removeTodo:(state,action)=>{
                state.todos=state.todos.filter(todo=>todo.uid!==action.payload)
            },
            updateTodo:(state,action)=>{
                const {uid,title}=action.payload
                const existingTodo=state.todos.find(todo=>todo.uid===uid)
                if(existingTodo){
                    existingTodo.title=title
                }
        }}
})

export const {addTodo,removeTodo,updateTodo}=todoSlice.actions

export default todoSlice.reducer
