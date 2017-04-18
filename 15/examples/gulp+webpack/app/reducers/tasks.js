import TodoConstants from '../constants/todo';

export default function(state = [], action) {
    switch (action.type) {
        case TodoConstants.TODO_ADD:
            return [
                ...state,
                {
                    id: Date.now() + state.length,
                    text: action.text,
                    completed: false
                }
            ];

        case TodoConstants.TODO_REMOVE:
            return state.filter(item => item.id !== action.id);

        case TodoConstants.TODO_UPDATE:
            return state.map(item => {
                if (item.id !== action.id) return item;

                return {
                    ...item,
                    text: action.text
                };
            });

        case TodoConstants.TODO_TOGGLE:
            return state.map(item => {
                if (item.id !== action.id) return item;

                return {
                    ...item,
                    completed: !item.completed
                };
            });

        case TodoConstants.TODO_TOGGLE_ALL:
            return state.map(item => {
                return {
                    ...item,
                    completed: action.completed
                };
            });

        case TodoConstants.TODO_CLEAR:
            return state.filter(item => !item.completed);

        default:
            return state;
    }
};