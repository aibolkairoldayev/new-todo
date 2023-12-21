import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import s from './Input.module.scss'
import { addTodo } from '../store/todoSlice';

const Input: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const MAX_NAME_LENGTH = 30;

    const handleAddTodo = () => {
        // Обрезаем значение name до максимальной длины перед созданием туду
        const truncatedName = name.slice(0, MAX_NAME_LENGTH);
        dispatch(addTodo({ name: truncatedName, desc }));
        setName('');
        setDesc('');
    };

    return (
        <div className={s.content}>
            <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={MAX_NAME_LENGTH}
                className={s.input}
            />
            <textarea

                placeholder="Описание"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={s.textarea}
            />
            <button className={`btn ${s.btn}`} onClick={handleAddTodo}>Добавить задачу</button>
        </div>
    );
};

export default Input;