import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Count: React.FC = () => {
    const doneTodos = useSelector((state: RootState) =>
        state.todos.todos.filter((todo) => todo.status === 'done')
    );

    return (
        <div>
            <h1>Готовых задач: {doneTodos.length}</h1>
        </div>
    );
};

export default Count;