import { Storage } from 'utils';

@Storage
class UsersStore {

	constructor() {
		this.bindActions(this.alt.getActions('users'));
		this.users = this.get('users') || [];
	}

	onAdd = (user) => {
		const users = [...this.users, user];
		this.users = users;
		this.set('users', users);
	}

	onClear() {
		this.users = [];
		this.del('users');
	}

}

export default UsersStore;