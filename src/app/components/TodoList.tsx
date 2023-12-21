import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <p>Name: {todo.name}</p>
                    <p>Description: {todo.desc}</p>
                    <p>Status: {todo.status}</p>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;