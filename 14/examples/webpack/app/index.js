import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './comments';
import Data from './data';

ReactDOM.render(
    <Comments comments={Data.comments}/>,
    document.getElementById('app')
);