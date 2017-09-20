import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ handleSubmit }) => { /* the handleSubmit function from App is on the props object  */
    let inputText;

    return (
        <div>
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    if(!inputText.value.trim()) return;
                    handleSubmit(inputText.value);
                    inputText.value = '';
                }}>
                <input ref={node => {inputText = node;}}/>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};
AddTodo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default AddTodo;