import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import s from './Count.module.scss'

const Count: React.FC = () => {
    const doneTodos = useSelector((state: RootState) =>
        state.todos.todos.filter((todo) => todo.status === 'выполнено')
    );

    return (
        <div>
            <h1 className={s.title}>Готовых задач: <b>{doneTodos.length}</b></h1>
        </div>
    );
};

export default Count;