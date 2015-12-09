import React, { Component, PropTypes } from 'react';

class Root extends Component {

	static propTypes = {
		children: PropTypes.node,
		flux: PropTypes.object.isRequired
	};

	static childContextTypes = {
		flux: PropTypes.object.isRequired
	};

	getChildContext = () => {
		return {
			flux: this.props.flux
		};
	};

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}
}

export default Root;