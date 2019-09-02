import React from 'react';
import {Image, View} from 'react-native';
import {headerStyle, styles} from '../styles';
import SquawkList from './SquawkList';
import {Button, Icon} from 'react-native-elements';

class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Image source={require('../img/logo.png')} style={headerStyle.logo} resizeMethod="scale" resizeMode="contain"/>,
            headerRight: navigation.getParam('button', null)
        };
    };

    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({button: this.createButton()});
    }

    createButton() {
        return <Button
            adjustsFontSizeToFit={true}
            icon=
                {<Icon
                    name="create"
                    size={30}
                    color="#fff"/>}
        type="clear"
            onPress={() => this.props.navigation.navigate('NewSquawk')}/>;
    }

    render() {
        return (
            <>
                <View style={styles.container} >
                    <SquawkList />
                </View>
            </>
        );
    }
}

export default Home;
