import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from "./reducers"
import { Auth } from './user';
import { useEffect } from 'react';

export const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export const getData = () => {
    useEffect(() => {
        const token = localStorage.getItem("token")
        store.dispatch(Auth(token))
    }, [])
}