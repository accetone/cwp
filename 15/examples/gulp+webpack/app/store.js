import { createStore } from 'redux';

import reducer from './reducers';

export default createStore(reducer, {
    tasks: {
        past: [],
        present: [
            { id: 1, text: 'Sleep', completed: true },
            { id: 2, text: 'Eat', completed: false },
            { id: 3, text: 'Code', completed: false },
            { id: 4, text: 'Repeat', completed: false }
        ],
        future: []
    },
    links: [
        { title: 'All' },
        { title: 'Active' },
        { title: 'Completed' }
    ],
    activeLink: { title: 'All' }
});