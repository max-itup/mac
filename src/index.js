// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

// Pages
import App from './pages/app';

// Redux dev tools
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Redux Store
const store = createStore(rootReducer, reduxDevTools);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
