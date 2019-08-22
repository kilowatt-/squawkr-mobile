import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={style.title}>
                <Text style={style.titleText}>{this.props.title}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    title: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
        backgroundColor : '#fff',
        height: 50,
        justifyContent: 'center',
    },
    titleText: {
        paddingLeft: 5
    },
});

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;