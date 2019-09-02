import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    emptyOrErrorList: {
        justifyContent: 'center',
    },

    squawkContainer: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },

    squawkPoster: {
        fontWeight: 'bold',
        fontSize: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },

    squawkPreview: {
    },

    replyView: {
        flex: 0.05,
        flexDirection: 'row',
        height: '5%',
        justifyContent: 'flex-start',
    },

    replyText: {
        color: '#C0C0C0',
    },

    charRemainingLt10: {
        color: 'red',
        paddingRight: 5,
        position: 'absolute',
        right: 0,
    },

    charRemaining: {
        color: '#C0C0C0',
        paddingRight: 5,
        textAlign: 'right',
        position: 'absolute',
        right: 0,
    },

    detailedViewContainer: {
        maxHeight: '50%',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        backgroundColor: '#FFF',
    },

    detailedViewHeader: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        paddingLeft: 5,
        paddingTop: 5,
    },

    detailedViewHeaderText: {
        fontWeight: 'bold',
        fontSize: 25,
    },

    detailedViewMessage: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    detailedViewMessageText: {

    },

    datePostedText: {
        fontSize: 10,
        paddingBottom: 10,
        paddingLeft: 5
    },

    replyListContainer: {
        flex:0.5,
    },

    replyListHeaderContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },

    replyListHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

});
