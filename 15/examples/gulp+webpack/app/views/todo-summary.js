import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div className="todo-info">
                <span className="todo-info__remains">
                    {this.props.remains} remains
                </span>
                {' '}
                <span className="todo-info__completed">
                    / {this.props.completed} completed
                </span>
            </div>
        );
    }
});