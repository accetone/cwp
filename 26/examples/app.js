import React from 'react';
import ReactDOM from 'react-dom';

import { Hello } from './hello';

ReactDOM.render(
	<Hello />,
	document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}