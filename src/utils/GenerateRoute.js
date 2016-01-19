import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Helper to generate a new react-router route, which supports multiple paths for a single
 * route
 *
 * See: https://github.com/rackt/react-router/blob/latest/docs/Introduction.md#with-react-router
 *
 * @param index
 * @param key
 * @param paths
 * @param component
 * @param children
 * @returns {*}
 */
export default function ({ index, key, paths, component, children }) {
	if (index) {
		if (!key) {
			console.warn('IndexRoute requires a custom key param');
		}
		const props = {
			component,
			key
		};

		return (
			<IndexRoute {...props} />
		);
	}

	return paths.map(function (path) {
		const props = {
			key: path,
			path,
			component
		};

		if (component.onEnter) {
			props.onEnter = component.onEnter;
		}

		if (!children || !children.length) {
			return <Route {...props} />;
		}

		return (
			<Route {...props}>
				{ children }
			</Route>
		);
	});
}