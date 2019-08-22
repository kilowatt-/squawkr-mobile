import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import Squawk from './Squawk';

class SquawkList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('squawks: ' + JSON.stringify(this.props.squawks));
        return (
            <>
                <FlatList data={this.props.squawks}
                          renderItem={(squawk) => <Squawk squawk={squawk.item}/>}
                          keyExtractor={(squawk) => squawk._id.toString()}/>
            </>);
    }
}

SquawkList.propTypes = {
  squawks:  PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return { list: state.messages.posts,
        startIndex: state.messages.startIndex,
        canDelete: state.messages.canDelete  };
}

export default SquawkList;
