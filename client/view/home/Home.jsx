import React from 'react';
import Header from '../Header';
import {View} from 'react-native';
import {styles} from '../styles';
import SquawkList from './SquawkList';
import {Button, Icon} from 'react-native-elements';

class Home extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
    }



    createButton() {
        return <Button
            adjustsFontSizeToFit={true}
            icon=
                {<Icon
                    name='create'
                    size={30}
                    color="#fff"/>}
        type="clear"
            onPress={() => this.props.navigation.navigate('NewSquawk')}/>;
    }

    render() {
        return (
            <>
                <Header button={this.createButton()}/>
                <View style={styles.container} >
                    <SquawkList navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

export default Home;
