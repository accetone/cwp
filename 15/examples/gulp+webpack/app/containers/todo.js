import {connect} from 'react-redux';
import {ActionCreators} from 'redux-undo';

import ToDo from '../views/todo';

import TodoActions from '../actions/todo';
import NavActions from '../actions/nav';

function getVisibleTasks(tasks, link) {
    if (link.title === 'All') {
        return tasks;
    } else if (link.title === 'Completed') {
        return tasks.filter(x => x.completed);
    } else {
        return tasks.filter(x => !x.completed);
    }
}

function getCompletedCount(tasks) {
    return tasks.filter(x => x.completed).length;
}

function getRemainsCount(tasks) {
    return tasks.filter(x => !x.completed).length;
}

function areAllCompleted(tasks) {
    return getRemainsCount(tasks) === 0;
}

function canUndo(model) {
    return model.past && model.past.length !== 0;
}

function canRedo(model) {
    return model.future && model.future.length !== 0;
}

const mapStateToProps = (state) => {
    return {
        tasks: getVisibleTasks(state.tasks.present, state.activeLink),
        completed: getCompletedCount(state.tasks.present),
        remains: getRemainsCount(state.tasks.present),
        areAllCompleted: areAllCompleted(state.tasks.present),

        activeLink: state.activeLink,
        links: state.links,

        canUndo: canUndo(state.tasks),
        canRedo: canRedo(state.tasks)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleItem: (id) => {
            dispatch(
                TodoActions.toggle(id)
            );
        },

        toggleAll: (status) => {
            dispatch(
                TodoActions.toggleAll(status)
            );
        },

        removeItem: (id) => {
            dispatch(
                TodoActions.remove(id)
            );
        },

        addItem: (text) => {
            dispatch(
                TodoActions.add(text)
            );
        },

        updateItem: (id, text) => {
            dispatch(
                TodoActions.update(id, text)
            );
        },

        removeCompleted: () => {
            dispatch(
                TodoActions.clear()
            );
        },

        navigate: (link) => {
            dispatch(
                NavActions.activate(link)
            );
        },

        undo: () => {
            dispatch(
                ActionCreators.undo()
            );
        },

        redo: () => {
            dispatch(
                ActionCreators.redo()
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDo);