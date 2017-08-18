import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import reducer from './reducers';

const store = createStore(reducer);
window.st = store;

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
