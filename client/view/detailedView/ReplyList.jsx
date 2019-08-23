import React from 'react';
import {connect} from 'react-redux';
import {styles} from '../styles';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import Squawk from '../home/Squawk';
import {getReplies} from "../../controller/actions/replies";
import PropTypes from "prop-types";

class ReplyList extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getReplies(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id)
            {this.props.getReplies(this.props.id)};
    }

    render() {
        return (
            <>
                <View style={styles.replyListContainer}>
                    <View style={styles.replyListHeaderContainer}>
                        <Text style={styles.replyListHeaderText}>Replies</Text>
                    </View>

                    {this.props.loading ? <ActivityIndicator color="#2a8dc6" size="large" /> :
                    <FlatList data={this.props.squawks}
                              renderItem={(squawk) => <Squawk squawk={squawk.item} navigation={this.props.navigation}/>}
                              keyExtractor={(squawk) => squawk._id.toString()}
                    />}
                </View>
            </>);
    }
}

const mapStateToProps = (state) => {
    return { squawks: state.replies.replies,
        loading: state.replies.replies_loading,
        error: state.replies.replies_error,};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReplies: (id) => {dispatch(getReplies(id))},
    };
};

ReplyList.propTypes = {
    id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyList);
