import React, { Component, PropTypes } from 'react';

/**
 * A global Image component. Loads an image in by file name
 * from a given path, and requires an alt string for accessibility.
 */
class Image extends Component {

    static propTypes = {
        file: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        style: PropTypes.object
    };

    render() {
        const { file, style, alt } = this.props;

        const image = require(`assets/images/${file}`);
        return (
            <img src={ image } style={ style } alt={ alt } />
        );
    }
}

export default Image;