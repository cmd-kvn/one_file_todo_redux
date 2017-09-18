import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: ['hi', 'bye'],
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
    // the array of todos from App state are on the props object 
    return (
        <ul>
            <TodoItems todos={props.todos}/>
        </ul>);
};

const TodoItems = (props) => {
    // the array of todos from App state passed to TodoList are on the props object
    const { todos } = props; // so you don't have to write 'props.todos'
    
    return (
        <div>
            {todos.map((todo, i) => <li key={i}>{todo}</li>)}
        </div>
        
    );
};

export default App;
