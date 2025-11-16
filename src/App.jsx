import React, { useState, useEffect } from 'react';
import './App.css';
import Clock from './components/Clock.jsx';

function App() {
    const [clocks, setClocks] = useState([]);
    const [form, setForm] = useState({ name: '', offset: '' });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, offset } = form;
        if (name.trim() && !isNaN(offset)) {
            const newClock = {
                id: Date.now(),
                name: name,
                offset: Number(offset)
            };
            setClocks(prevClocks => [...prevClocks, newClock]);
            setForm({ name: '', offset: '' }); // Сброс формы
        }
    };

    const handleDelete = (id) => {
        setClocks(prevClocks => prevClocks.filter(clock => clock.id !== id));
    };

    return (
        <div className="App">
            <form className="clock-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="offset">Временная зона (смещение от UTC)</label>
                    <input
                        type="number"
                        id="offset"
                        name="offset"
                        value={form.offset}
                        onChange={handleInputChange}
                        placeholder="e.g. 3 for Moscow"
                        required
                    />
                </div>
                <button type="submit">Добавить</button>
            </form>

            <div className="clocks-container">
                {clocks.map(clock => (
                    <Clock
                        key={clock.id}
                        id={clock.id}
                        name={clock.name}
                        offset={clock.offset}
                        onDelete={handleDelete}
                        currentTime={currentTime}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
