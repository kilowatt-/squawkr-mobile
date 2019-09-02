import React from 'react';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {styles} from '../styles';
import TouchableScale from 'react-native-touchable-scale';
import { withNavigation } from 'react-navigation';

class Squawk extends React.Component {
    render() {
        return (<ListItem key={this.props.squawk._id}
                          Component={TouchableScale}
                          containerStyle={styles.squawkContainer}
                          onPress={() => {this.props.navigation.push('DetailedView', {
                              id: this.props.squawk._id,
                          });}}
                          friction={90}
                          tension={100}
                          activeScale={1.05}
                          title={this.props.squawk.poster}
                          titleStyle={styles.squawkPoster}
                          subtitle={this.props.squawk.message}
                          subtitleProps={{numberOfLines: 1}}
                          subtitleStyle={styles.squawkPreview}
                          bottomDivider = {true}
        />);
    }
}

Squawk.propTypes = {
    squawk: PropTypes.object.isRequired,
};

export default withNavigation(Squawk);
