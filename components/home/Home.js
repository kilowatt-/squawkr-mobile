import React from 'react';
import Header from '../Header';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header title="Home" />
        );
    }
}

export default Home;