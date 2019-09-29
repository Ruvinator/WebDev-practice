import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Generally only render one component (the main app, usually called App)
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
