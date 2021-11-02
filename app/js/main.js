import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as shim from './utils/shim.util';

import App from './components/App';
import store from './store';

import '../css/reset.css';
import '../css/main.css';

render(
	<Provider store={store}><App/></Provider>,
	document.getElementById("app")
);
