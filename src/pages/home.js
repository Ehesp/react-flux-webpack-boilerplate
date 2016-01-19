import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Image } from 'components';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            users: UserStore.getState().users,
            input: ''
        };
    }

    componentDidMount() {
        UserStore.listen(this.handleUserStore);
    }

    componentWillUnmount() {
        UserStore.unlisten(this.handleUserStore);
    }

    handleUserStore = (store) => {
        this.setState({
            users: store.users
        });
    };

    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        });
    };

    addUser = () => {
        UserActions.add(this.state.input);
        this.setState({
            input: ''
        });
    };

    render() {
        const { users, input } = this.state;
        return (
            <div>
                <h1><Image file="react-logo.png" alt="Logo" style={{ width: 50 }} /> Homepage</h1>
                <hr />
                Go to my <Link to='account'>Account</Link>
                <br />
                <br />
                <input type='text' value={ input } onChange={ this.handleInputChange } />
                <button onClick={ this.addUser }>Add User</button>
                <h3>List of users:</h3>
                <ol>
                    {
                        users.map((user, i) => {
                            return (
                                <li key={ i }>{ user }</li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default Home;