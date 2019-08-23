import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {styles} from '../styles';
import TouchableScale from 'react-native-touchable-scale';

class Squawk extends React.Component {
    render() {
        return (<ListItem key={this.props.squawk._id}
                          Component={TouchableScale}
                          containerStyle={styles.squawkContainer}
                          friction={90}
                          tension={100}
                          activeScale={1.05}
                          title={this.props.squawk.poster}
                          titleStyle={styles.squawkPoster}
                          subtitle={this.props.squawk.message}
                          subtitleStyle={styles.squawkPreview}
                          bottomDivider = {true}
        />);
    }
}

Squawk.propTypes = {
    squawk: PropTypes.object.isRequired,
};

export default Squawk;
