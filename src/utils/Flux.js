import Alt from 'alt';
import { flux as config } from '../config';

class Flux extends Alt {

	constructor(options = {}) {
		super(options);
		this.resolve = this.resolve.bind(this);
		config.map(this.resolve);
	}

	resolve(name) {
		this.addActions(name, require(`../actions/${name}`));
		this.addStore(name, require(`../stores/${name}`));
	}
}

export default Flux;