import React, { useState } from 'react';

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
        <div>
            <span>Status: {filterStatus}</span>
            <button onClick={handleStatusChange}>Filter by Status</button>
        </div>
    );
};

export default Filter;