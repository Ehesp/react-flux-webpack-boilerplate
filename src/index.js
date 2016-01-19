import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes.js';

const router = {
	routes,
	history: createBrowserHistory(),
	createElement: (component, props) => {
		return React.createElement(component, { ...props });
	}
};

ReactDOM.render(
	React.createElement(Router, { ...router }),
	document.getElementById('root')
);