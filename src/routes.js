import React from 'react';
import { Route } from 'react-router';
import { GenerateRoute } from './utils';

export default (
	<Route component={ require('./pages/root') }>
		{ GenerateRoute({
			paths: ['/', '/test'],
			component: require('./components/Home')
		}) }
	</Route>
);