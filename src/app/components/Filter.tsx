import React, { useState } from 'react';

import s from './Filter.module.scss'

interface FilterProps {
    onStatusChange: (status: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onStatusChange }) => {
    const [filterStatus, setFilterStatus] = useState<string>('все');

    const handleStatusChange = () => {
        let newStatus = '';
        switch (filterStatus) {
            case 'все':
                newStatus = 'в ожидании';
                break;
            case 'в ожидании':
                newStatus = 'в работе';
                break;
            case 'в работе':
                newStatus = 'выполнено';
                break;
            case 'выполнено':
                newStatus = 'все';
                break;
            default:
                newStatus = 'все';
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