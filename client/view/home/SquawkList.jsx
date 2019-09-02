import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Squawk from './Squawk';
import {connect} from 'react-redux';
import {styles} from '../styles';
import {getMore, getPosts} from '../../controller/actions/post';
import { withNavigation } from 'react-navigation';
import Pusher from 'pusher-js/react-native';
import PusherConfig from '../../../pusher';
import Snackbar from 'react-native-snackbar';


class SquawkList extends React.Component {
    constructor(props) {
        super(props);
        this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
        this.getMore = this.getMore.bind(this);

        this.state = {
            momentum: false,
            refreshFlag: false,
        };

        this.subscribeToPusher = this.subscribeToPusher.bind(this);
        this.notifyNewSquawks = this.notifyNewSquawks.bind(this);
    }

    componentDidMount() {
       this.props.getPosts();
       this.subscribeToPusher();
    }

    subscribeToPusher() {
        this.pusher = new Pusher(PusherConfig.PUSHER_KEY, {
            cluster: PusherConfig.PUSHER_CLUSTER,
            useTLS: true,
        });

        this.channel = this.pusher.subscribe('squawks');
        this.channel.bind('inserted', this.notifyNewSquawks);
    }

    notifyNewSquawks() {


        Snackbar.show({
            title: 'New Squawks',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#2a8dc6',
            color: 'white',
            action: {
                title: 'UPDATE',
                color: '#ABFF94',
                onPress: () => {
                    this.setState({
                        refreshFlag: !this.state.refreshFlag,
                    });
                    this.props.getPosts();
                },
            },
        });
    }

    getMore() {
            let index = this.props.startIndex;
            index += 10;
            this.props.getMore(index);
    }


    renderEmptyComponent() {
       return (<View style={styles.emptyOrErrorList}>
            {this.props.error ?
                <Text style={{alignSelf: 'center', color: 'red'}}>An error occured, try again later</Text>
                : (!this.props.refreshing ? <Text style={{alignSelf: 'center'}}>No squawks at the moment. Why not post one? </Text> : null)}
        </View>);
    }
    render() {
        return (
            <>
                <FlatList data={this.props.squawks}
                          renderItem={(squawk) => <Squawk squawk={squawk.item} navigation={this.props.navigation}/>}
                          keyExtractor={(squawk) => squawk._id.toString()}
                        onRefresh={() => {
                                this.props.getPosts();
                        }}
                          refreshing={this.props.refreshing}
                        ListEmptyComponent={this.renderEmptyComponent()}
                          onEndReached={() => {
                              this.getMore();
                          }}
                          onEndReachedThreshold={0.1}
                          extraData={this.state.refreshFlag}
                 />
            </>);
    }
}

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
        getPosts: () => {dispatch(getPosts());},
        getMore: (index) => {dispatch(getMore(index));},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SquawkList));
