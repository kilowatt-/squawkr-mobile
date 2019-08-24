import React from 'react';
import {styles} from '../styles';
import {View,Text} from 'react-native';
import Squawk from '../home/Squawk';
import {Icon} from "react-native-elements";

class Quote extends React.Component {

    render() {
        if (this.props.quote !== null && this.props.quote !== undefined) {
            return (
                <>
                    <Icon
                        name="reply"
                        size={15}
                        color="#c0c0c0"/>
                    <Squawk squawk={this.props.quote} navigation={this.props.navigation} />
                </>
            );
        }
        else if (this.props.quote !== null) {
            return (
                <>
                    <Icon
                        name="reply"
                        size={15}
                        color="#c0c0c0"/>
                    <View style={styles.squawkContainer}>
                        <Text style={{fontStyle: 'italic'}}>Message Deleted</Text>
                    </View>
                </>
            );
        }

        else {
            return null;
        }
    }


}

export default Quote;
