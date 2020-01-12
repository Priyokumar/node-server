import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { loginReducer } from "./store/reducer/login.reducer"
import { pageHeaderReducer } from "./store/reducer/page-header.reducer"
import { commonReducer } from "./store/reducer/common.reducer"
import { userReducer } from "./store/reducer/user.reducer"
import { rolesReducer } from "./store/reducer/role.reducer"

const rootReducer = combineReducers(
    {
        loginReducer: loginReducer,
        pageHeaderReducer: pageHeaderReducer,
        commonReducer: commonReducer,
        userReducer: userReducer,
        rolesReducer: rolesReducer
    }
)
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
