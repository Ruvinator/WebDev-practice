import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// Merging together multiple reducers into one single reducer
const rootReducer = combineReducers({
    counterReducer: counterReducer,
    resultReducer:  resultReducer
});

// Middleware can be added at point in time where store is initialized
// Function below is simple middleware which logs each issued action
// All functions below are executed automatically by redux
const logger = store => {
    // Returns function which can be executed to let action continue to reducer
    return next => {
        // Returns another function which receives action dispatched as input
        return action => {
            // Code here is run between action and reducer
            console.log('[Middleware] Dispatching', action);

            // Allows action to continue 
            const result = next(action);

            console.log('[Middleware] Next state', store.getState())
            return result;
        }
    }
};

// Used for React Devtools extension (holds a function)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store created right when application launches; this is a good place
// Reducer is created in separate file and included here
// compose combines multiple enhancers (middleware)
// thunk is added for asynchronous handling (already middleware)
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

// Store is connected to React app using Provider and input store argument
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

