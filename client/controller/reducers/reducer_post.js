import {
	GET_POSTS_BEGIN,
	GET_POSTS_SUCCESS,
	GET_POSTS_FAILURE,

	POST_MESSAGE_BEGIN,
	POST_MESSAGE_SUCCESS,
	POST_MESSAGE_FAILURE,

	DELETE_BEGIN,
	DELETE_SUCCESS,
	DELETE_FAILURE,

	GET_MORE_BEGIN,
	GET_MORE_SUCCESS,
	GET_MORE_FAILURE,

	ENABLE_DELETE,
	DISABLE_DELETE,

	NOTIFY_NEW_SQUAWK,
	REFRESH_SQUAWKS,

} from '../actions/post.js';

const initialState = {
	posts: [],
	loading: false,
	error: null,
	overLimit: false,
	startIndex: 0,
	canDelete: false,
	newSquawks: false,
	posting: false,
};

export const postReducer = (state = initialState, action) => {

	if (action.type === GET_POSTS_BEGIN ) {
		return {
			...state,
			loading: true,
			error: null,
			startIndex: 0,
		};
	}

	else if (action.type === POST_MESSAGE_BEGIN) {
		return {
			...state,
			loading: true,
			error: null,
			startIndex: 0,
			posting: true,
		};
	}

	else if (action.type === DELETE_BEGIN) {
		return {
			...state,
			loading: true,
			error: null,
			startIndex: action.payload,
		};
	}

	else if (action.type === POST_MESSAGE_SUCCESS) {
		return {
			...state,
			loading: false,
			overLimit: action.payload.overLimit,
			posts: action.payload.posts,
			error: null,
			posting: false,
		};
	}

	else if (action.type === GET_POSTS_SUCCESS || action.type === POST_MESSAGE_SUCCESS || action.type === DELETE_SUCCESS || action.type === GET_MORE_SUCCESS) {
		return {
			...state,
			loading: false,
			overLimit: action.payload.overLimit,
			posts: action.payload.posts,
			error: null,
		};
	}

	else if (action.type === GET_POSTS_FAILURE || action.type === POST_MESSAGE_FAILURE || action.type === DELETE_FAILURE || action.type === GET_MORE_FAILURE) {
		return {
			...state,
			loading: false,
			posts: [],
			error: action.payload.error,
		};
	}

	else if (action.type === GET_MORE_BEGIN) {
		let refresh = false;

		if (state.newSquawks && action.payload > 0)
			{refresh = true;}

		return {
			...state,
			loading: true,
			error: null,
			startIndex: action.payload,
			newSquawks: refresh,
		};
	}

	else if (action.type === ENABLE_DELETE) {
		return {
			...state,
			canDelete: true,
		};
	}

	else if (action.type === DISABLE_DELETE) {
		return {
			...state,
			canDelete: false,
		};
	}

	else if (action.type === NOTIFY_NEW_SQUAWK) {
		if (!state.posting)
			{return {
				...state,
				newSquawks: (!state.posting && state.posts[0]._id !== action.payload._id),
			};}
		else
			{return state;}
	}

	else if (action.type === REFRESH_SQUAWKS) {
		return {
			...state,
			newSquawks: false,
		};
	}

	else
		{return state;}
};
