import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className="time-panel">
                <div className={'time-panel__button ' + (this.props.canUndo ? '' : 'time-panel__button_disabled')} onClick={this.props.undo}>Undo</div>
                <div className={'time-panel__button ' + (this.props.canRedo ? '' : 'time-panel__button_disabled')} onClick={this.props.redo}>Redo</div>
            </div>
        )
    }
});