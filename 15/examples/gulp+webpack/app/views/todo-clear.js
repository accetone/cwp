import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className="todo__clear"
                 onClick={this.props.removeCompleted}>
                Clear
            </div>
        );
    }
});