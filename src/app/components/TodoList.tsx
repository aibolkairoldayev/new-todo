import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTodoStatus, deleteTodo } from '../store/todoSlice';
import Filter from './Filter';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    const [toggleStatus, setToggleStatus] = useState<'onwork' | 'done'>('onwork');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const handleToggleStatus = () => {
        setToggleStatus((prevStatus) => (prevStatus === 'onwork' ? 'done' : 'onwork'));
    };

    const handleUpdateStatus = (id: number, currentStatus: 'pending' | 'onwork' | 'done') => {
        const newStatus = currentStatus === 'pending' ? 'onwork' : currentStatus === 'onwork' ? 'done' : 'pending';
        dispatch(updateTodoStatus({ id, status: newStatus }));
    };

    const handleFilterStatusChange = (status: string) => {
        setFilterStatus(status);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const filteredTodos =
        filterStatus === 'all' ? todos : todos.filter((todo) => todo.status === filterStatus);

    return (
        <div>
            <Filter onStatusChange={handleFilterStatusChange} />

            {filteredTodos.map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.status}`}>
                    <p>Name: {todo.name}</p>
                    <p>Description: {todo.desc}</p>
                    <p>Status: {todo.status}</p>
                    <button onClick={() => handleUpdateStatus(todo.id, todo.status)}>Toggle Status</button>
                    <button >Update</button>
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;