import TodoConstants from '../constants/todo';

export default {
    add: function (text) {
        return {
            type: TodoConstants.TODO_ADD,
            text
        };
    },

    remove: function (id) {
        return {
            type: TodoConstants.TODO_REMOVE,
            id
        };
    },

    update: function (id, text) {
        return {
            type: TodoConstants.TODO_UPDATE,
            id,
            text
        };
    },

    toggle: function (id) {
        return {
            type: TodoConstants.TODO_TOGGLE,
            id: id
        };
    },

    toggleAll: function (completed) {
        return {
            type: TodoConstants.TODO_TOGGLE_ALL,
            completed
        };
    },

    clear: function () {
        return {
            type: TodoConstants.TODO_CLEAR
        };
    }
};