import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            view: 'ALL',
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }

    handleSubmit(input) {
        this.setState(prevState => ({todos: prevState.todos.concat({todo: input, completed: false})}));
    }

    handleViewChange(e) {
        this.setState({view: e.target.dataset.filter});
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
                <TodoList todos={this.state.todos} view={this.state.view} />
                <AddTodo handleSubmit={this.handleSubmit} />
                <Footer handleViewChange={this.handleViewChange} />
            </div>
        );
    }
}

const TodoList = (props) => { /* the array of todos and view string from App state are on the props object */
    let todoListItems = props.todos.map((todo, i) => {
        if(props.view === 'ALL') return <TodoItem key={i} todo={todo.todo} completed={todo.completed} />;
        else if (props.view === 'ACTIVE') {
            if(todo.completed === false) return <TodoItem key={i} todo={todo.todo} completed={todo.completed} />;
        }
        else if (props.view === 'COMPLETED') {
            if(todo.completed === true) return <TodoItem key={i} todo={todo.todo} completed={todo.completed} />;
        }
    });

    return (
        <ul>
            {/* the list items based on what view is set in the state */}
            {todoListItems}
        </ul>
    );
};

const TodoItem = (props) => { /* the array of todos from App state passed to TodoList are on the props object */
    const { key, todo, completed } = props; // so you don't have to write 'props.[todo/key/completed]'

    return (
        <li 
            key={key}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {todo}
        </li>);
};

const AddTodo = (props) => { /* the handleSubmit function from App is on the props object  */
    let inputText;

    return (
        <div>
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    if(!inputText.value.trim()) return;
                    props.handleSubmit(inputText.value);
                    inputText.value = '';
                }}>
                <input ref={node => {inputText = node;}}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

const Footer = (props) => { /* the handleViewChange function from App is on the props object */
    return (
        <p>
            Show: {'  '}
            {/* 
                data-[customize this] is an custom attribute on the event object.
                It can be referenced by event.target.dataset.[customized name].
                In this case value='VALUE' and event.target.value (in handleViewChange) also works
            */}
            <button type='submit' data-filter='ALL' onClick={props.handleViewChange}>All</button>
            {'  '}
            <button type='submit' data-filter='ACTIVE' onClick={props.handleViewChange}>Active</button>
            {'  '}
            <button type='submit' data-filter='COMPLETED' onClick={props.handleViewChange}>Completed</button>
        </p>
    );
};

export default App;
