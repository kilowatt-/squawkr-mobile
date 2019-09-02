import React from 'react';
import {connect} from 'react-redux';
import {styles} from '../styles';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import Squawk from '../home/Squawk';
import {getReplies, restoreReplyCache} from '../../controller/actions/replies';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class ReplyList extends React.Component {
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);

        this.setCache = this.setCache.bind(this);
        this.getCacheAndRestoreScreen.bind(this);
    }

    componentDidMount() {
        this.props.getReplies(this.props.id);
        this.subscribe();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.cacheFlag !== this.props.cacheFlag) {
            this.getCacheAndRestoreScreen();
        }
    }

    setCache() {
        this.props.navigation.setParams(
            {
                'cachedReplies': {
                    replies: this.props.squawks,
                    replies_loading: this.props.loading,
                    replies_error: this.props.error,
                },
            }
        );
    }

    getCacheAndRestoreScreen() {
        let cachedReplies = this.props.navigation.getParam('cachedReplies', null);
        console.log("Cached Replies: " + JSON.stringify(cachedReplies));
        if (cachedReplies) {
            this.props.restoreCache(cachedReplies);
            this.props.navigation.setParams({
                'cachedReplies': null,
            });
        }
    }

    subscribe() {
        const {navigation} = this.props;
        this.willBlurListener = navigation.addListener('willBlur', () => {
            this.setCache();
        });

        this.willFocusListener = navigation.addListener('willFocus', () => {
            this.getCacheAndRestoreScreen();
        });
    }

    unsubscribe() {
        this.willBlurListener.remove();
        this.willFocusListener.remove();
    }

    render() {

        console.log("SQuawks: " + JSON.stringify(this.props.squawks));
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
                              ListEmptyComponent={() => {
                                  return <Text style={{fontWeight: 'bold', textAlign: 'center'}}>No replies</Text>;
                              }}
                              extraData={this.props.cacheFlag}
                    />}
                </View>
            </>);
    }
}

const mapStateToProps = (state) => {
    return { squawks: state.replies.replies,
        loading: state.replies.replies_loading,
        error: state.replies.replies_error};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReplies: (id) => {dispatch(getReplies(id));},
        restoreCache: (cache) => {dispatch(restoreReplyCache(cache));},
    };
};

ReplyList.propTypes = {
    id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ReplyList));
