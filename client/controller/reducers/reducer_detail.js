import { GET_DETAIL_BEGIN, GET_DETAIL_SUCCESS, GET_DETAIL_FAIL, SET_DETAIL} from '../actions/detail.js';

const initialState = {
	loading: true,
	quote: null,
	post: null,
	error: null,
};

export const detailReducer = (state = initialState, action) => {
	if (action.type === SET_DETAIL)
		{return action.payload;}
	else if (action.type === GET_DETAIL_BEGIN) {
		return {
			...state,
			detail: action.payload,
			loading: true,
			post: null,
			error: null,
		};
	}
	else if (action.type === GET_DETAIL_SUCCESS) {
		return {
			...state,
			loading: false,
			post: action.payload.post,
			quote: action.payload.quote,
			error: null,
		};
	}

	else if (action.type === GET_DETAIL_FAIL) {
		return {
			...state,
			loading: false,
			post: null,
			quote: null,
			error: action.payload,
		};
	}
	else
		{return state;}
};
