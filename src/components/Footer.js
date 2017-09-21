import React from 'react';
import PropTypes from 'prop-types';

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

export default Footer;