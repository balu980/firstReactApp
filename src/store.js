import { applyMiddleware, createStore } from "redux"

import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import git from "./reducers/gitReducer"
// using the middleware so that we can use the function returnd for the actions
const middleware = applyMiddleware(promise(), thunk);

export default createStore(git, middleware)