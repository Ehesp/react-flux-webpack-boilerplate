import React from 'react';
import { Route } from 'react-router';
import { GenerateRoute } from './utils';

export default (
	<Route component={ require('./pages/root') }>
		{ GenerateRoute({
			paths: ['/', '/home'],
			component: require('./pages/home')
		}) }
		{ GenerateRoute({
			paths: ['/account'],
			component: require('./pages/home'),
			children: [
				GenerateRoute({
					key: 'account-index',
					index: true,
					component: require('./pages/home')
				}),
				GenerateRoute({
					paths: ['profile'],
					component: require('./pages/home')
				}),
				GenerateRoute({
					paths: ['subscription-plans'],
					component: require('./pages/home')
				})
			]
		}) }
	</Route>
);