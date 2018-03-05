import React from 'react'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'

import Login from './container/login/login'
import Register from './container/register/register'
import reducer from './reducer'

import './index.css'

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  devTools
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)