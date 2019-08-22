import React from 'react';
import Header from '../Header';
import {View} from 'react-native';
import {styles} from './styles';
import SquawkList from './SquawkList';
import {Button, Icon} from 'react-native-elements';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
    }

    createButton() {
        return <Button
            icon=
                {<Icon
                    name='create'
                    size={30}
                    color="#2a8dc6"/>}
        type="clear" title="New Squawk" />;
    }

    render() {
        return (
            <>
                <Header button={this.createButton()}/>
                <View style={styles.listContainer} >
                    <SquawkList />
                </View>
            </>
        );
    }
}

export default Home;
