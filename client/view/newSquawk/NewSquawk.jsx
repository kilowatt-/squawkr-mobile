import React from 'react';
import Header from '../Header';
import {Button, Icon, Input, Text} from 'react-native-elements';
import {View, ActivityIndicator} from 'react-native';
import {styles} from '../styles';
import {post} from '../../controller/actions/post';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';


class NewSquawk extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: navigation.getParam('header', null),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({header:   <Header title={'New Squawk'} button={this.createButton()} />});
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            message: '',
            charRemaining: 200,
            error: '',
            file: null,
            postStatusChangeFlag: false
        };

        this.createButton = this.createButton.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showImagePicker = this.showImagePicker.bind(this);
        this.handleImageSelect = this.handleImageSelect.bind(this);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.posting !== prevProps.posting) {
            if (!this.state.postStatusChangeFlag) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({postStatusChangeFlag: true});
            }
            else {
                this.props.navigation.navigate('Home');
            }
        }
    }

    showImagePicker() {
        ImagePicker.showImagePicker(null, (res) => {
            if (!res.didCancel) {
                if (res.error) {
                    this.setError(res.error);
                } else {
                    this.setState({
                        file: 'data:image/jpeg;base64,' + res.data,
                    });
                }
            }
        });
    }

    validate() {
        if (this.state.name.length > 0) {
                if (this.state.message.length > 0) {
                    this.setError('');
                    return true;
                }
                else {
                    this.setError('Squawk must be between 1 and 200 characters in length!');
                }
            }
            else {
                this.setError('Name cannot be left blank!');
            }

            return false;
        }

    handleSubmit() {
        if (this.validate()) {
            this.props.post(this.state.name, this.state.message, this.state.file,
                (this.props.navigation.state.params && this.props.navigation.state.params.replyTo && this.props.navigation.state.params.replyTo >= 0 ? this.props.navigation.state.params.replyTo : -1));
        }
    }

    createButton() {
        return <Button
            disabled={this.props.posting}
            adjustsFontSizeToFit={true}
            icon=
                {<Icon
                    name="send"
                    size={30}
                    color="#fff"/>}
            type="clear"
        onPress={() => {this.handleSubmit();}}/>;
    }

    handleImageSelect() {
        if (this.state.file) {
            this.setState({
                file: null,
            });
        }
        else {
            this.showImagePicker();
        }
    }

    handleChangeText(name, text) {
        let charRemaining = this.state.charRemaining;

        if (name === 'message') {
            if (text.length > 200) {
                text = text.substring(0,200);
            }

            charRemaining = 200 - text.length;
        }

        this.setState({
            [name]: text,
            charRemaining: charRemaining,
        });
    }

    setError(text) {
        this.setState({
            error: text,
        });
    }

    render() {
        return (
            <>
            <View style={styles.container}>
                {this.props.posting ? <ActivityIndicator color="#2a8dc6" size="large" /> : null }
                <View style={styles.replyView}>
                    {this.props.navigation.state.params && this.props.navigation.state.params.replyTo ?
                        <>
                            <Icon
                                name="reply"
                                size={20}
                                color="#C0C0C0"/>
                            <Text style={styles.replyText}>Replying to {this.props.navigation.state.params.replyToName}</Text>
                        </> : null}
                </View>

                <Input placeholder="Name" value={this.state.name} onChangeText={(text) => this.handleChangeText('name', text)} editable={!this.props.posting}/>
                <Input placeholder="Your squawk (max 200 characters)" editable={!this.props.posting} multiline={true} numberOfLines = {8} textAlignVertical="top"
                       value={this.state.message} errorMessage={this.state.error} onChangeText={(text) => this.handleChangeText('message', text)}
                />

                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-start'}}>
                    <Button icon={this.state.file ? <Icon name="cancel" size={30} color="red" /> :<Icon name="add-a-photo" size={30} color="#2a8dc6" />} adjustsFontSizeToFit={true}
                            type="clear" onPress={this.handleImageSelect} />
                    <Text style={this.state.charRemaining < 10 ? styles.charRemainingLt10 : styles.charRemaining}>
                        {this.state.charRemaining}
                    </Text>
                </View>

            </View>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        posting: state.messages.posting,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        post: (poster, message, file, replyTo) => dispatch(post(poster, message, file, replyTo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSquawk);
