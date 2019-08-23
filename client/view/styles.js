import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 0.9,
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
        borderBottomColor: 'black'
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

});
