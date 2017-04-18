import React from 'react';

export default React.createClass({
    getInitialState: function () {
        return {
            text: this.props.text ? this.props.text : ''
        };
    },

    render: function () {
        return (
            <input className={this.props.className}
                   placeholder={this.props.placeholder}
                   value={this.state.text}
                   onChange={this._onChange}
                   onKeyDown={this._onKeyDown}/>
        );
    },

    _save: function() {
        this.props.onSave(this.state.text);
        this.setState({ text: '' });
    },

    _onChange: function(event) {
        this.setState({
            text: event.target.value
        });
    },

    _onKeyDown: function(event) {
        if (event.keyCode !== 13) return;

        this._save();
    }
});