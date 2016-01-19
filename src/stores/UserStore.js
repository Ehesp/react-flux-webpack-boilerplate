import UserActions from 'actions/UserActions';
import { Alt, Storage } from 'utils';

@Storage
class UserStore {

	constructor() {
		this.users = this.get('users') || [];

		this.bindListeners({
			onAdd: UserActions.ADD,
			onClear: UserActions.CLEAR
		});
	}

	onAdd = (user) => {
		const users = [...this.users, user];
		this.users = users;
		this.set('users', users);
	};

	onClear() {
		this.users = [];
		this.del('users');
	};

}

export default Alt.createStore(UserStore, 'UserStore');