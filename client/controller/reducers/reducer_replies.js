import {
	GET_REPLIES_BEGIN,
	GET_REPLIES_SUCCESS,
	GET_REPLIES_FAILURE,
} from '../actions/replies.js';

const initialState = {
	replies: [],
	replies_loading: false,
	replies_error: null,
};

export const repliesReducer = (state = initialState, action) => {
	if (action.type === GET_REPLIES_BEGIN) {
		return {
			...state,
			replies_loading: true,
			replies_error: null,
		};
	}

	else if (action.type === GET_REPLIES_SUCCESS) {
		return {
			...state,
			replies_loading: false,
			replies_error: null,
			replies: action.payload.replies,
		};
	}

	else if (action.type === GET_REPLIES_FAILURE) {
		return {
			...state,
			replies_loading: false,
			replies_error: true,
		};
	}

	else {
		return state;
	}

};
