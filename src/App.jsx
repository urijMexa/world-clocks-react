import React, { Component } from 'react';
import './App.css';
import Clock from './components/Clock.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clocks: [],
            form: {
                name: '',
                offset: ''
            }
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, offset } = this.state.form;
        if (name.trim() && !isNaN(offset)) {
            const newClock = {
                id: Date.now(),
                name: name,
                offset: Number(offset)
            };
            this.setState(prevState => ({
                clocks: [...prevState.clocks, newClock],
                form: { name: '', offset: '' }
            }));
        }
    }

    handleDelete = (id) => {
        this.setState(prevState => ({
            clocks: prevState.clocks.filter(clock => clock.id !== id)
        }));
    }

    render() {
        return (
            <div className="App">
                <form className="clock-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Название</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="offset">Временная зона (смещение от UTC)</label>
                        <input
                            type="number"
                            id="offset"
                            name="offset"
                            value={this.state.form.offset}
                            onChange={this.handleInputChange}
                            placeholder="e.g. 3 for Moscow"
                            required
                        />
                    </div>
                    <button type="submit">Добавить</button>
                </form>

                <div className="clocks-container">
                    {this.state.clocks.map(clock => (
                        <Clock
                            key={clock.id}
                            id={clock.id}
                            name={clock.name}
                            offset={clock.offset}
                            onDelete={this.handleDelete}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
