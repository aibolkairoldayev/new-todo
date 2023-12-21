import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

const Input: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const handleAddTodo = () => {
        dispatch(addTodo({ name, desc }));
        setName('');
        setDesc('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
};

export default Input;