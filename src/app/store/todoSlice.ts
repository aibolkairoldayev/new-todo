import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    name: string;
    desc: string;
    status: 'в ожидании' | 'в работе' | 'выполнено';
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
                status: 'в ожидании',
            };
            state.todos.push(newTodo);
        },

        updateTodoStatus: (state, action: PayloadAction<{ id: number; status: 'в ожидании' | 'в работе' | 'выполнено' }>) => {
            const todoToUpdate = state.todos.find(todo => todo.id === action.payload.id);
            if (todoToUpdate) {
                todoToUpdate.status = action.payload.status;
            }
        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            const idToDelete = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== idToDelete);
        },

        editTodo: (state, action: PayloadAction<{ id: number; name: string; desc: string }>) => {
            const { id, name, desc } = action.payload;
            const existingTodo = state.todos.find((todo) => todo.id === id);
            if (existingTodo) {
                existingTodo.name = name;
                existingTodo.desc = desc;
            }
        }

    },
});

export const { addTodo, updateTodoStatus, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;