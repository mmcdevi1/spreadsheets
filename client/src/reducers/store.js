import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducerList from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [ reduxThunk, logger ];
const reducers = combineReducers({
  ...reducerList
})

export default createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)))