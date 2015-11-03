import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { Flux } from './utils';
import routes from './routes.js';

// Create new alt instance
const flux = new Flux();

const routerProps = {
	routes,
	history: createBrowserHistory(),
	createElement: (component, props) => {
		return React.createElement(component, { ...props, flux })
	}
};

ReactDOM.render(
	React.createElement(Router, { ...routerProps }),
	document.getElementById('root')
);