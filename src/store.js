import { applyMiddleware, createStore } from "redux"

import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import git from "./reducers/gitReducer"

const middleware = applyMiddleware(promise(), thunk);

export default createStore(git, middleware)