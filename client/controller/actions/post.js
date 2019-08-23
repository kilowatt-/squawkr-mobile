import Config from '../../Config.js';

export const GET_POSTS_BEGIN = 'GET_POSTS_BEGIN';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const POST_MESSAGE_BEGIN = 'POST_MESSAGE_BEGIN';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const DELETE_BEGIN = 'DELETE_BEGIN';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export const GET_MORE_BEGIN = 'SWITCH_PAGE_BEGIN';
export const GET_MORE_SUCCESS = 'SWITCH_PAGE_SUCCESS';
export const GET_MORE_FAILURE = 'SWITCH_PAGE_FAILURE';

export const ENABLE_DELETE = 'ENABLE_DELETE';
export const DISABLE_DELETE = 'DISABLE_DELETE';

export const NOTIFY_NEW_SQUAWK = 'NOTIFY_NEW_SQUAWK';
export const REFRESH_SQUAWKS = 'REFRESH_SQUAWKS';

export function getPosts() {
	return dispatch => {
		dispatch(getPostsBegin());

		return fetch(Config.API_URL + '/squawks')
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {
			dispatch(getPostsSuccess(json));
			return json;
		})
		.catch(error => {
			console.log(error);
			dispatch(getPostsFailure(error));
		});
	};
}

export function getMore(startIndex) {
	return dispatch => {
		dispatch(getMoreBegin(startIndex));

		return fetch(Config.API_URL + '/squawks/getStartingFrom/' + startIndex)
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {
			dispatch(getMoreSuccess(json));
			return json;
		})
		.catch(error => {
			console.log(error);
			dispatch(getMoreFailure(error));
		});
	};
}


function postMessage(dispatch, name, message, file, replyTo) {
	fetch(Config.API_URL + '/squawks', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				name: name,
				message: message,
				file: file,
				replyTo: replyTo,
			}),
		})
		.then(handleErrors)
		.then(res => res.json())
		.then(json=> {
			dispatch(postMessageSuccess(json));
			return json;}
			)
		.catch(error => dispatch(postMessageFailure(error)));
}

export function post (name, message, file, replyTo)  {

	return dispatch => {
		dispatch(postMessageBegin());

		postMessage(dispatch, name, message, file, replyTo);
	};
}

export function deletePost(id, startIndex) {

	return dispatch => {
	dispatch(deleteMessageBegin(startIndex));

		return fetch(Config.API_URL + '/squawks/' + id + '/' + startIndex, {
			method: 'DELETE',

		})
		.then(handleErrors)
		.then(res => res.json())
		.then(json=> {
			console.log(json);
			dispatch(deleteMessageSuccess(json));
			return json;}
			)
		.catch(error => dispatch(deleteMessageFailure(error)));
	};
}



function handleErrors(response) {

	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response;
}

//Get posts actions here (called to initialise state)

export const getPostsBegin = () => ({
	type: GET_POSTS_BEGIN,
});

export const getPostsSuccess = result => ({
	type: GET_POSTS_SUCCESS,
	payload: result,
});

export const getPostsFailure = error => ({
	type: GET_POSTS_FAILURE,
	payload: { error },
});

// Post new message onto server
export const postMessageBegin = () => ({
	type: POST_MESSAGE_BEGIN,
});

export const postMessageSuccess = result => ({
	type: POST_MESSAGE_SUCCESS,
	payload: result,
});

export const postMessageFailure = error => ({
	type: POST_MESSAGE_FAILURE,
	payload: { error },
});

// Delete a particular post
export const deleteMessageBegin = start => ({
	type: DELETE_BEGIN,
	payload: start,
});

export const deleteMessageSuccess = result => ({
	type: DELETE_SUCCESS,
	payload: result,
});

export const deleteMessageFailure = error => ({
	type: DELETE_FAILURE,
	payload: { error },
});

// Switch page (next page/previous page button)
export const getMoreBegin = start => ({
	type: GET_MORE_BEGIN,
	payload: start,
});

export const getMoreSuccess = result => ({
	type: GET_MORE_SUCCESS,
	payload: result,
});

export const getMoreFailure = error => ({
	type: GET_MORE_FAILURE,
	payload: { error },
});

export const enableDelete = () =>({
	type: ENABLE_DELETE,
});

export const disableDelete = () => ({
	type: DISABLE_DELETE,
});

export const notifyNewSquawks = (update) => ({
	type: NOTIFY_NEW_SQUAWK,
	payload: update,
});

export const refreshSquawks = () => ({
	type: REFRESH_SQUAWKS,
});
