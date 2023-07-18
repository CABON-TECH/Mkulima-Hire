import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import workReducer from './reducers/workReducer';
import farmerReducer from './reducers/farmerReducer';
import jobReducer from './reducers/jobReducer';
import paymentReducer from './reducers/paymentReducer';
import ratingReducer from './reducers/ratingReducer';
import reviewReducer from './reducers/reviewReducer';

const rootReducer = combineReducers({
    workReducer,
    farmerReducer,
    jobReducer,
    paymentReducer,
    ratingReducer,
    reviewReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;