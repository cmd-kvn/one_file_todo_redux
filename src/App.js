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
        this.handleTodoClick = this.handleTodoClick.bind(this);
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

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Let's make a todo list</h2>
                </div>
                <AddTodo handleSubmit={this.handleSubmit} />
                <TodoList todos={this.state.todos} view={this.state.view} handleTodoClick={this.handleTodoClick} />
                <Footer handleViewChange={this.handleViewChange} />
            </div>
        );
    }
}

const TodoList = (props) => { /* state.todos, state.view, and handleTodoClick from App are on the props object */
    let todoListItems = props.todos.map(todo => {
        if(props.view === 'ALL') {
            return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={props.handleTodoClick} />;
        } else if (props.view === 'ACTIVE') {
            if(todo.completed === false) {
                return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={props.handleTodoClick} />;
            }
        } else if (props.view === 'COMPLETED') {
            if(todo.completed === true) {
                return <TodoItem _id={todo._id} todo={todo.todo} completed={todo.completed} onClick={props.handleTodoClick} />;
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

const TodoItem = (props) => { /* state.todos.[_id/todo/completed] and handleTodoClick from TodoList via App are on the props object */
    const { _id, todo, completed, onClick } = props; // so you don't have to write 'props.[todo/_id/completed/onClick]'

    return (
        <li
            key={_id}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
            onClick={() => onClick(_id, completed)}
        >
            {todo}
        </li>
    );
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
