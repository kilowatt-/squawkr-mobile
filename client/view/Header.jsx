import React from 'react';
import {View, StyleSheet,Text,Image} from 'react-native';
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={style.title}>
            {!this.props.title ? <Image source={require('./img/logo.png')} style={style.logo} resizeMethod="scale" resizeMode="contain"/> :
                <Text style={style.titleText}>{this.props.title}</Text>}
                {this.props.button ? (<View style={{alignItems:'flex-end'}}>{this.props.button}</View>) : null}
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
        flex: 0.10,
        justifyContent: 'center',
    },
    titleText: {
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    logo: {
        height: '60%',
        position: 'absolute',
        left: -20,
    },
});

Header.propTypes = {
    title: PropTypes.string,
    button: PropTypes.node,
};

export default Header;
