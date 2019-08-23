import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import Header from '../Header';
import {styles} from '../styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getDetail} from '../../controller/actions/detail';
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
    }

    componentDidMount() {
        this.props.getDetail(this.props.navigation.state.params.id);
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
                    <ReplyList id={this.props.navigation.state.params.id} navigation={this.props.navigation}/>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);

