class UsersStore {

	constructor() {
		this.bindActions(this.alt.getActions('users'));
		this.users = JSON.parse(localStorage.getItem('users')) || [];
	}

	onAdd(user) {
		const users = [ ...this.users, user ];
		this.users = users;
		localStorage.setItem('users', JSON.stringify(users));
	}

	onClear() {
		this.users = [];
		localStorage.removeItem('users');
	}

}

export default UsersStore;