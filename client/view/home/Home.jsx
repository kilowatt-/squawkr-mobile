import React from 'react';
import Header from '../Header';
import {View} from 'react-native';
import {styles} from '../styles';
import SquawkList from './SquawkList';
import {Button, Icon} from 'react-native-elements';

class Home extends React.Component {
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
        type="clear" />;
    }

    render() {
        return (
            <>
                <Header button={this.createButton()}/>
                <View style={styles.container} >
                    <SquawkList />
                </View>
            </>
        );
    }
}

export default Home;
