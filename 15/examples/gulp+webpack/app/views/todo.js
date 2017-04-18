import React from 'react';

import Nav from './nav';
import ToDoSummary from './todo-summary';
import ToDoList from './todo-list';
import ToDoForm from './todo-form';
import ToDoClear from './todo-clear';
import TimeTravelPanel from './time-travel-panel';

export default React.createClass({
    render: function () {
        return (
            <div className="todo">
                <div className="todo__title">Time Travel ToDo</div>
                <Nav links={this.props.links} activeLink={this.props.activeLink}
                     navigate={this.props.navigate}/>
                <ToDoSummary remains={this.props.remains} completed={this.props.completed}/>
                <ToDoList tasks={this.props.tasks} areAllComplete={this.props.areAllCompleted}
                          toggleItem={this.props.toggleItem} toggleAll={this._toggleAll}
                          removeItem={this.props.removeItem} updateItem={this.props.updateItem}
                />
                <ToDoForm addItem={this.props.addItem}/>
                <ToDoClear removeCompleted={this.props.removeCompleted}/>
                <TimeTravelPanel undo={this.props.undo} redo={this.props.redo} canUndo={this.props.canUndo} canRedo={this.props.canRedo} />
            </div>
        );
    },

    _toggleAll: function () {
        this.props.toggleAll(!this.props.areAllCompleted);
    }
});