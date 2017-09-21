import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ _id, todo, completed, onClick }) => { /* state.todos.[_id/todo/completed] and handleTodoClick from TodoList via App are on the props object */
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
TodoItem.propTypes = {
    _id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default TodoItem;