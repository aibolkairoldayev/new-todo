import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTodoStatus } from '../store/todoSlice';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    const [toggleStatus, setToggleStatus] = useState<'onwork' | 'done'>('onwork');

    const handleToggleStatus = () => {
        setToggleStatus((prevStatus) => (prevStatus === 'onwork' ? 'done' : 'onwork'));
    };

    const handleUpdateStatus = (id: number, currentStatus: 'pending' | 'onwork' | 'done') => {
        const newStatus = currentStatus === 'pending' ? 'onwork' : currentStatus === 'onwork' ? 'done' : 'pending';
        dispatch(updateTodoStatus({ id, status: newStatus }));
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.status}`}>
                    <p>Name: {todo.name}</p>
                    <p>Description: {todo.desc}</p>
                    <p>Status: {todo.status}</p>
                    <button onClick={() => handleUpdateStatus(todo.id, todo.status)}>Toggle Status</button>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;