import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from '../reducers/authReducer';


const rootReducer = combineReducers({
    auth: authReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk, logger));
}

export default configureStore;