import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    listContainer: {
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

});
