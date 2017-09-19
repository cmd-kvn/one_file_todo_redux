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
                <TodoList todos={this.state.todos} />
                <AddTodo handleSubmit={this.handleSubmit} />
                <Footer handleViewChange={this.handleViewChange} />
            </div>
        );
    }
}

const TodoList = (props) => { /* the array of todos from App state are on the props object */
    return (
        <ul>
            {/* map thru the props.todos array to populate the <ul> with <TodoItems> */}
            {props.todos.map((todo, i) => (
                <TodoItem key={i} todo={todo.todo} />
            ))}
        </ul>
    );
};

const TodoItem = (props) => { /* the array of todos from App state passed to TodoList are on the props object */
    const { todo } = props; // so you don't have to write 'props.todo'

    return <li>{todo}</li>;
};

const AddTodo = (props) => { /* the handleSubmit function from App is on the props object  */
    let input;

    return (
        <div>
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    if(!input.value.trim()) return;
                    props.handleSubmit(input.value);
                    input.value = '';
                }}>
                <input ref={node => {input = node;}}/>
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
                In this case value='VALUE' and event.target.value also works
            */}
            <button type='submit' data-filter='ALL' onClick={props.handleViewChange}>  All  </button>
            {'  '}
            <button type='submit' data-filter='ACTIVE' onClick={props.handleViewChange}>Active</button>
            {'  '}
            <button type='submit' data-filter='COMPLETED' onClick={props.handleViewChange}>Completed</button>
        </p>
    );
};

export default App;
