import { postReducer } from './reducer_post.js';
import { detailReducer } from './reducer_detail.js';
import { repliesReducer } from './reducer_replies.js';
import { combineReducers } from 'redux';


const reducers = combineReducers({
	messages: postReducer,
	detail: detailReducer,
	replies: repliesReducer,
});

export default reducers;
