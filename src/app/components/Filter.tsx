import React, { useState } from 'react';

import s from './Filter.module.scss'

interface FilterProps {
    onStatusChange: (status: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onStatusChange }) => {
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const handleStatusChange = () => {
        let newStatus = '';
        switch (filterStatus) {
            case 'all':
                newStatus = 'pending';
                break;
            case 'pending':
                newStatus = 'onwork';
                break;
            case 'onwork':
                newStatus = 'done';
                break;
            case 'done':
                newStatus = 'all';
                break;
            default:
                newStatus = 'all';
                break;
        }
        setFilterStatus(newStatus);
        onStatusChange(newStatus);
    };

    return (
        <div className={s.filter}>
            <span className={s.show}>Показывать: {filterStatus}</span>
            <button className={`btn ${s.btn}`} onClick={handleStatusChange}>Фильтровать по</button>
        </div>
    );
};

export default Filter;