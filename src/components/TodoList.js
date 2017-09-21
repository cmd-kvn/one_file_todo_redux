import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

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

export default TodoList;