import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

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

// Store created right when application launches; this is a good place
// Reducer is created in separate file and included here
const store = createStore(rootReducer);

// Store is connected to React app using Provider and input store argument
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

