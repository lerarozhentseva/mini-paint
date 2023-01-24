import React from "react";
import ReactDOM from "react-dom/client";
import "./app/index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import firebase from "firebase/compat/app";
import createSagaMiddleware from "@redux-saga/core";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import "firebase/auth";
import "firebase/firestore";
import { rootReducer } from "./core/reducers/rootReducer";
import { rootSaga } from "./core/saga/rootSaga";
import { loadState, saveState } from "./core/state";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();
const initialState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

const rrfConfig = {
  userProfile: "users",
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
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
);
