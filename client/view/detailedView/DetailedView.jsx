import React from 'react';
import {Dimensions} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Header from '../Header';
import {styles} from '../styles';
import {connect} from 'react-redux';
import {getDetail, setDetail} from '../../controller/actions/detail';
import Config from '../../Config';
import ReplyList from './ReplyList';
import Quote from './Quote';

const { width, height } = Dimensions.get('window');

class DetailedView extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: navigation.getParam('header', null),
        };
    };

    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
        this.parseDate = this.parseDate.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.setCache = this.setCache.bind(this);
        this.getCacheAndRestoreScreen = this.getCacheAndRestoreScreen.bind(this);
        this.isPortrait = this.isPortrait.bind(this);

        this.state = {
            cacheFlag: false,
            isPortrait: this.isPortrait(),
        };
    }

    componentDidMount() {
        this.props.getDetail(this.props.navigation.state.params.id);
        this.props.navigation.setParams({header:  <Header title="View Squawk" button={this.createButton()} />});
        this.subscribe();
        Dimensions.addEventListener('change', () => {
            this.setState({
                isPortrait: this.isPortrait(),
                imageLoading: false,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    isPortrait() {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    }

    setCache() {
        this.props.navigation.setParams(
            {
                'cachedDetail': {
                    loading: false,
                    quote: this.props.quote,
                    post: this.props.post,
                    error: this.props.error,
                },
            }
        );
    }

    getCacheAndRestoreScreen() {
        let cache = this.props.navigation.getParam('cachedDetail', null);

        if (cache) {
            this.setState({
                cacheFlag: !this.state.cacheFlag,
            });

            this.props.setDetail(cache);
            this.props.navigation.setParams({
                'cachedDetail': null,
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
                <View style={styles.container}>
                    {this.props.loading ? <ActivityIndicator color="#2a8dc6" size="large" /> :
                       <>
                           <Quote quote={this.props.quote} navigation={this.props.navigation}/>
                           <View style={styles.detailedViewContainer}>
                               <View style={styles.detailedViewHeader}>
                                   <Text style={styles.detailedViewHeaderText}>{this.props.post.poster}</Text>
                               </View>
                               <View style={styles.detailedViewMessage}>
                                   <Text style={styles.detailedViewMessageText}>{this.props.post.message}</Text>
                                   {this.props.post.hasImage ? <>

                                       <Image
                                       resizeMode="contain"
                                       style={this.isPortrait() ? {height:(0.3 * height)} : {height: (0.1 * width)}}
                                       onLoadStart={() => this.setState({imageLoading: true})}
                                       onLoadEnd={() => this.setState({imageLoading: false})}
                                       source={{uri:
                                           imgUrl,
                                       }}/>
                                       {this.state.imageLoading  ? <ActivityIndicator color="#2a8dc6" size="small" /> : null}
                                       </> : null}
                                   <Text style={styles.datePostedText}>Posted on: {this.parseDate(this.props.post.date)}</Text>
                               </View>
                           </View>
                       </>

                        }
                    <ReplyList cacheFlag={this.state.cacheFlag} id={this.props.navigation.state.params.id} />
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

