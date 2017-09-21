import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            view: 'ALL',
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleTodoClick = this.handleTodoClick.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
    }

    handleSubmit(input) {
        this.setState(prevState => ({todos: prevState.todos.concat({todo: input, completed: false, _id: Date.now()})}));
    }

    handleViewChange(e) {
        this.setState({view: e.target.dataset.filter});
    }

    handleTodoClick(todoID, complete){
        this.setState(prevState => ({todos: prevState.todos.map(todo => {
            if (todo._id === todoID) return {completed: !complete, todo: todo.todo, _id: todo._id};
            else return todo;
        })}));
    }

    handleClearCompleted(){
        this.setState(prevState => ({todos: prevState.todos.filter(todo => {
            return todo.completed === false;
        })}));
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Let's make a todo list</h2>
                </div>
                <AddTodo handleSubmit={this.handleSubmit} />
                <TodoList todos={this.state.todos} view={this.state.view} handleTodoClick={this.handleTodoClick} />
                <Footer handleViewChange={this.handleViewChange} handleClearCompleted={this.handleClearCompleted} />
            </div>
        );
    }
}

export default App;
