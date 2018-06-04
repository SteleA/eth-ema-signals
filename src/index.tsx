
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import 'rxjs';

import App from './containers/App';
import rootEpics from './epics'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import { actionToPlainObject } from './utils/actionToPlainObject';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(rootEpics);

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware),
    applyMiddleware(actionToPlainObject)
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
