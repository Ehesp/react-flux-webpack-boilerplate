import React, { Component, PropTypes } from 'react';

class Root extends Component {

	static propTypes = {
		children: PropTypes.element
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const { children } = this.props;
		return (
			<div>
				{ children }
			</div>
		);
	}
}

export default Root;