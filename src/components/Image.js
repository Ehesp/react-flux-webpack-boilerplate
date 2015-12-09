import React, { Component, PropTypes } from 'react';

class Image extends Component {

    static propTypes = {
        file: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        styles: PropTypes.object
    };

    render() {
        const { file, styles, alt } = this.props;

        const image = require(`assets/images/${file}`);
        return (
            <img src={ image } style={ styles } alt={ alt } />
        );
    }
}

export default Image;