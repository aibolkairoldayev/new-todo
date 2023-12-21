import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    name: string;
    desc: string;
    status: 'pending' | 'onwork' | 'done';
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ name: string; desc: string }>) => {
            const newTodo: Todo = {
                id: state.todos.length + 1,
                name: action.payload.name,
                desc: action.payload.desc,
                status: 'pending',
            };
            state.todos.push(newTodo);
        },
        // Добавьте другие редюсеры, такие как updateTodo, deleteTodo, и т.д.
    },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;