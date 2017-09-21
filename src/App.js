import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

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

const TodoList = ({ todos, view, handleTodoClick }) => { /* state.[todos/view] and handleTodoClick from App are on the props object */
    let todoListItems = todos.map(todo => {
        if(view === 'ALL') {
            return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={handleTodoClick} />;
        } else if (view === 'ACTIVE') {
            if(todo.completed === false) {
                return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={handleTodoClick} />;
            }
        } else if (view === 'COMPLETED') {
            if(todo.completed === true) {
                return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={handleTodoClick} />;
            }
        }
    });

    return (
        <ul>
            {/* the list items based on what view is set in the state */}
            {todoListItems}
        </ul>
    );
};
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.number.isRequired,
        todo: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    })).isRequired,
    view: PropTypes.string.isRequired,
    handleTodoClick: PropTypes.func.isRequired,
};

const Footer = ({ handleClearCompleted, handleViewChange }) => { /* the handleViewChange and handleClearCompleted functions from App is on the props object */
    return (
        <p>
            <button 
                type='submit'
                onClick={handleClearCompleted}
            >
                Clear completed
            </button>
            {'  '} Show: {'  '}
            {/* 
                data-[customize this] is an custom attribute on the event object.
                It can be referenced by event.target.dataset.[customized name].
                In this case value='VALUE' and event.target.value (in handleViewChange) also works
            */}
            <button type='submit' data-filter='ALL' onClick={handleViewChange}>All</button>
            {'  '}
            <button type='submit' data-filter='ACTIVE' onClick={handleViewChange}>Active</button>
            {'  '}
            <button type='submit' data-filter='COMPLETED' onClick={handleViewChange}>Completed</button>
        </p>
    );
};
Footer.propTypes = {
    handleClearCompleted: PropTypes.func.isRequired,
    handleViewChange: PropTypes.func.isRequired,
};

export default App;
