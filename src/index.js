import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'

// PWA
import * as serviceWorker from './serviceWorker';

// Google Analytics
import ReactGA from 'react-ga';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import App from './pages/app';

// Redux dev tools
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Redux Store
const store = createStore(rootReducer, reduxDevTools);

ReactGA.initialize('UA-133306128-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();