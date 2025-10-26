import React, { Component } from 'react';

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.calculateTime(props.offset)
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    calculateTime(offset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * offset));
    }

    tick() {
        this.setState({
            time: this.calculateTime(this.props.offset)
        });
    }

    render() {
        return (
            <div className="clock">
                <h3>{this.props.name}</h3>
                <div className="time-display">
                    {this.state.time.toLocaleTimeString()}
                </div>
                <button className="delete-btn" onClick={() => this.props.onDelete(this.props.id)}>
                    &#x2715;
                </button>
            </div>
        );
    }
}
