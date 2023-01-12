import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import firebase from 'firebase/compat/app';
import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware} from 'redux';
import {createStore} from 'redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import 'firebase/auth';
import 'firebase/firestore';
import {rootReducer} from './core/reducers/rootReducer';
import {rootSaga} from './core/saga/rootSaga';
import {loadState, saveState} from './core/state';

const sagaMiddleware = createSagaMiddleware();
const initialState = loadState();

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
};

store.subscribe(() => {
    saveState(store.getState());
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
