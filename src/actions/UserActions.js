import { Alt } from 'utils';

class UsersActions {

	add(name) {
		return name;
	}

	clear() {
		return null;
	}

}

export default Alt.createActions(UsersActions);
