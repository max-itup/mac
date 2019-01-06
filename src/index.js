import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import App from './pages/app';
import * as serviceWorker from './serviceWorker';

// Redux dev tools
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Redux Store
const store = createStore(rootReducer, reduxDevTools);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.register();
