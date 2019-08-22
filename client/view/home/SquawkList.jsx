import React from 'react';
import {FlatList, Text, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import Squawk from './Squawk';
import {connect} from 'react-redux';
import {styles} from './styles';
import {getPosts} from "../../controller/actions/post";

class SquawkList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.props.getPosts();
    }

    render() {
        return (
            <>
                {this.props.squawks.length > 0 ?
                <FlatList data={this.props.squawks}
                          renderItem={(squawk) => <Squawk squawk={squawk.item}/>}
                          keyExtractor={(squawk) => squawk._id.toString()}
                        onRefresh={() => this.props.getPosts()} refreshing={this.props.refreshing}/> :

                    <View style={styles.emptyOrErrorList}>
                        {this.props.error ?
                        <Text style={{alignSelf: 'center', color: 'red'}}>An error occured, try again later</Text>
                        : (!this.props.refreshing ? <Text style={{alignSelf: 'center'}}>No squawks at the moment. Why not post one? </Text> : null)}
                    </View>
                }
            </>);
    }
}

SquawkList.propTypes = {
  squawks:  PropTypes.array,
};

const mapStateToProps = (state) => {
    return { squawks: state.messages.posts,
        refreshing: state.messages.loading,
        error: state.messages.error,
        overLimit: state.messages.overLimit,
        startIndex: state.messages.startIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {dispatch(getPosts())},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SquawkList);
