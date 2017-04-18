import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import tasks from './tasks';
import activeLink from './activeLink';
import links from './links';

export default combineReducers({
    tasks: undoable(tasks),
    activeLink,
    links
});