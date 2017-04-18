import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ToDoContainer from './containers/todo';
import Store from './store';

console.log(Store.getState());

ReactDOM.render(
    <Provider store={Store}>
        <ToDoContainer/>
    </Provider>,
    document.getElementById('app')
);