import { combineReducers } from 'redux';
import error from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
	error,
	messages,
	auth,
});
