import { createContext, useContext } from "react";

export const TodoContext = createContext();

// Custom Hook
export const useTodo = () => {
    return useContext(TodoContext);
};

// Provider Component
export function TodoProvider({ children }) {

    const addTodo = () => {};
    const deleteTodo = () => {};
    const editTodo = () => {};
    const toggleCompleteTodo = () => {};

    const todos = [
        {
            id: "1",
            todo: "Task 1",
            completed: true,
        },
    ];

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                deleteTodo,
                editTodo,
                toggleCompleteTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}