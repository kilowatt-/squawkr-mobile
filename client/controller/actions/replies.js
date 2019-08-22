import Config from '../../Config.js';

export const GET_REPLIES_BEGIN = 'GET_REPLIES_BEGIN';
export const GET_REPLIES_SUCCESS = 'GET_REPLIES_SUCCESS';
export const GET_REPLIES_FAILURE = 'GET_REPLIES_FAILURE';

export const getRepliesBegin = () => ({
	type: GET_REPLIES_BEGIN,
});

export const getRepliesSuccess = replies => ({
	type: GET_REPLIES_SUCCESS,
	payload: {replies},
});

export const getRepliesFailure = failure => ({
	type: GET_REPLIES_FAILURE,
	payload: {failure},
});

export function getReplies(id) {

	return dispatch => {
		dispatch(getRepliesBegin());

		return fetch(Config.API_URL + '/squawks/replies/' + id, {
			method: 'GET',
		})
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {
			dispatch(getRepliesSuccess(json));
			return json;
		})
		.catch(error => {
			console.log(error);
			dispatch(getRepliesFailure(error));
		});
	};
}

function handleErrors(response) {

	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response;
}
