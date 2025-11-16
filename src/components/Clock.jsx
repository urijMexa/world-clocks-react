import React from 'react';

const Clock = ({ name, offset, onDelete, id, currentTime }) => {
    const calculateTime = () => {
        const now = currentTime;
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utc + (3600000 * offset));
        return localTime.toLocaleTimeString();
    };

    return (
        <div className="clock">
            <h3>{name}</h3>
            <div className="time-display">
                {calculateTime()}
            </div>
            <button className="delete-btn" onClick={() => onDelete(id)}>
                &#x2715;
            </button>
        </div>
    );
};

export default Clock;
