import React, { Component, PropTypes } from 'react';

class Home extends Component {

    static contextTypes = {
        flux: React.PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            users: context.flux.getStore('users').getState().users,
            input: ''
        };
    }

    componentDidMount() {
        this.context.flux.getStore('users').listen(this.handleUsersStore);
    }

    handleUsersStore = (state) => {
        this.setState({
            users: state.users
        });
    };

    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    addUser = () => {
        this.context.flux.getActions('users').add(this.state.input);
        this.setState({
            input: ''
        });
    }

    render() {
        const { users, input } = this.state;
        return (
            <div>
                <h1>Homepage.</h1>
                <hr />
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