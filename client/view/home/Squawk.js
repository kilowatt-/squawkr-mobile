import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';

class Squawk extends React.Component {
    render() {
        console.log('squawk: ' + JSON.stringify(this.props.squawk));
        return (<ListItem key={this.props.squawk._id}
                          title={this.props.squawk.poster}
                          subtitle={this.props.squawk.message}/>);
    }
}

Squawk.propTypes = {
    squawk: PropTypes.object.isRequired,
};

export default Squawk;
