import React, { Component, PropTypes } from 'react';

class Root extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    /*
        This component wraps your entire application.

        You can pass in props, context etc here.
     */

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default Root;