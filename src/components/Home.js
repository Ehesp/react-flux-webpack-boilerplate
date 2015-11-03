import React, { Component, PropTypes } from 'react';

class Home extends Component {

	static propTypes = {
		flux: PropTypes.object.isRequired
	};

	constructor(props) {
		super();
		let users = props.flux.getStore('users').getState();
		this.state = {
			users: users.users,
			user: ''
		};
		this.flux = props.flux;
	}

	componentDidMount() {
		this.flux.getStore('users').listen(this.updateUsers);
	}

	componentWillUnmount() {
		this.flux.getStore('users').unlisten(this.updateUsers);
	}

	updateUsers = (state) => {
		return this.setState({
			users: state.users
		});
	}

	addUser = () => {
		this.flux.getActions('users').add(this.state.user);
		this.setState({
			user: ''
		});
	}

	clearUsers = () => {
		this.flux.getActions('users').clear();
	}

	updateInput = (e) => {
		this.setState({
			user: e.target.value
		});
	}

	render() {
		const { users, user } = this.state;
		return (
			<div>
				<input type="text" placeholder="Username..." value={ user } onChange={ this.updateInput } />
				<button onClick={ this.addUser }>ADD</button>
				<button onClick={ this.clearUsers }>CLEAR ALL</button>
				<ul>
					{ users.map(function(user, index) {
						return <li key={ index }>{ user }</li>;
					}) }
				</ul>
			</div>
		);
	}
}

export default Home;