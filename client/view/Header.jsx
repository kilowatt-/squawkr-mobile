import React from 'react';
import {View, StyleSheet,Text,Image} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Icon} from "react-native-elements";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }



    renderBackButton() {
       return <Button
            adjustsFontSizeToFit={true}
            icon=
                {<Icon
                    name='back'
                    size={30}
                    color="#fff"/>}
            type="clear" />
    }

    render() {
        return (<View style={style.title}>
            {!this.props.title ? <Image source={require('./img/logo.png')} style={style.logo} resizeMethod="scale" resizeMode="contain"/>
            : <Text style={style.titleText}>{this.props.title}</Text>}

                {this.props.button ? (<View style={{flex: 1, alignItems:'flex-end'}}>{this.props.button}</View>) : null}
            </View>
        );
    }
}

const style = StyleSheet.create({
    title: {
        shadowOffset: { width: 25, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 20,
        backgroundColor : '#2a8dc6',
        flex: 0.10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#fff'
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
