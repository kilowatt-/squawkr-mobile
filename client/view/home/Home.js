import React from 'react';
import Header from '../Header';
import {View} from 'react-native';
import {styles} from './Style';
import SquawkList from './SquawkList';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let squawks = [{_id: 0, poster: 'Maria', message: 'Hi!'},
            {_id: 1, poster: 'Koel', message: ' Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!Koel!'}];
        return (
            <>
                <Header/>
                <View style={styles.listContainer}>
                    <SquawkList squawks={squawks} />
                </View>
            </>
        );
    }
}

export default Home;
