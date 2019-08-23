import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Header from '../Header';
import {styles} from '../styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getDetail, setDetail} from '../../controller/actions/detail';
import Config from '../../Config';
import ReplyList from './ReplyList';

class DetailedView extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
        this.parseDate = this.parseDate.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.setCache = this.setCache.bind(this);
        this.getCacheAndRestoreScreen = this.getCacheAndRestoreScreen.bind(this);

        this.state = {
            cacheFlag: false,
        };
    }

    setCache() {
        this.props.navigation.setParams(
            {
                'cache': {
                    loading: false,
                    quote: this.props.quote,
                    post: this.props.post,
                    error: this.props.error,
                },
            }
        );

        this.setState({
            cacheFlag: true,
        });
    }

    getCacheAndRestoreScreen() {
        let cache = this.props.navigation.getParam('cache', null);

        if (cache) {
            this.props.setDetail(cache);
            this.props.navigation.setParams({
                'cache': null,
            });

            this.setState({
                cacheFlag: false,
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

    componentDidMount() {
        this.props.getDetail(this.props.navigation.state.params.id);
        this.subscribe();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    createButton() {
        return <Button
            adjustsFontSizeToFit={true}
            icon=
                {<Icon
                    name="reply"
                    size={30}
                    color="#fff"/>}
            type="clear"
            onPress={() => {
                return this.props.navigation.navigate('NewSquawk', {
                    replyTo: this.props.navigation.state.params.id,
                    replyToName: this.props.post.poster,
                });
            }}
            />;
    }

    parseDate(date) {
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    render() {
        let imgUrl = Config.IMG_BUCKET_URL + this.props.navigation.state.params.id;
        return (
            <>
                <Header title="View Squawk" button={this.createButton()} />
                <View style={styles.container}>
                    {this.props.loading ? <ActivityIndicator color="#2a8dc6" size="large" /> :
                        <View style={styles.detailedViewContainer}>
                            <View style={styles.detailedViewHeader}>
                                <Text style={styles.detailedViewHeaderText}>{this.props.post.poster}</Text>
                            </View>
                            <View style={styles.detailedViewMessage}>
                                <Text style={styles.detailedViewMessageText}>{this.props.post.message}</Text>
                                {this.props.post.hasImage ? <Image
                                    style={{width: '50%', height: '50%'}}
                                    source={{uri:
                                            imgUrl,
                                    }}/> : null}
                                <Text style={styles.datePostedText}>Posted on: {this.parseDate(this.props.post.date)}</Text>
                            </View>
                        </View> }
                    <ReplyList cacheFlag={this.state.cacheFlag} id={this.props.navigation.state.params.id} navigation={this.props.navigation}/>
                </View>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        post: state.detail.post,
        quote: state.detail.quote,
        loading: state.detail.loading,
        error: state.detail.error};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail: (id) => {dispatch(getDetail(id));},
        setDetail: (cache) => {dispatch(setDetail(cache.loading, cache.quote, cache.post, cache.error));},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);

