import {combineReducers,createStore,applyMiddleware,compose} from 'redux'
import appReducers from './app/reducers' 
import systemReducers from './system/reducers' 
import thunk from "redux-thunk"
import sessionReducer from './session/reducers'

const rootReducers = combineReducers({
  app:appReducers,
  system:systemReducers,
  session:sessionReducer
})

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare var window: ExtendedWindow;

export type RootState = ReturnType<typeof rootReducers>
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers,composeEnhancers(applyMiddleware(thunk)))

export default store

