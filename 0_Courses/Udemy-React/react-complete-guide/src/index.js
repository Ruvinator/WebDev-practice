import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Generally only render one component (the main app, usually called App)
// Can pass props to the App which are accessed using this.props
ReactDOM.render(<App appTitle="Person Manager" />, document.getElementById('root'));
registerServiceWorker();
