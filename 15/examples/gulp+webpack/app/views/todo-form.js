import React from 'react';

import ToDoTextInput from './todo-text-input';

export default React.createClass({
    render: function () {
        return (
            <div className="todo__form">
                <ToDoTextInput
                    className="todo__text-input"
                    placeholder="I need to do..."
                    onSave={this._save}/>
            </div>
        );
    },

    _save: function (text) {
        this.props.addItem(text);
    }
});