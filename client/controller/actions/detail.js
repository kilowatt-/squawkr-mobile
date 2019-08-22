import Config from '../../Config.js';

export const CLOSE = -1;
export const VIEW_DETAIL = 'VIEW_DETAIL';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';

export const GET_DETAIL_BEGIN = 'GET_DETAIL_START';
export const GET_DETAIL_SUCCESS = 'GET_DETAIL_SUCCESS';
export const GET_DETAIL_FAIL = 'GET_DETAIL_FAIL';

export function getDetail(id) {
	return dispatch => {
		dispatch(getDetailBegin(id));

		return fetch(Config.API_URL + '/squawks/' + id)
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {
			dispatch(getDetailSuccess(json));
			return json;}
			)
		.catch(error => dispatch(getDetailFail(error)));
	};
}

export const getDetailBegin = (id) => {
	return {
		type: GET_DETAIL_BEGIN,
		payload: id,
	};
};

export const getDetailSuccess = result => {
	return {
		type: GET_DETAIL_SUCCESS,
		payload: result,
	};
};

export const getDetailFail = error => {
	return {
		type: GET_DETAIL_FAIL,
		payload: error,
	};
};

export const closeDetail = () => {
	return {
		type: CLOSE_DETAIL,
	};
};

function handleErrors(response) {

	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response;
}
