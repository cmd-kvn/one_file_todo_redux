import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: ['hi'],
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                Let's make a todo list
                </p>
                <TodoList todos={this.state.todos}/>
            </div>
        );
    }
}

const TodoList = (props) => {
    return (
        <ul>
            {props.todos}
            {/* todos go in here */}
        </ul>);
};

export default App;
