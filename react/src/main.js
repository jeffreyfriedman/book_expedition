// import 'babel-polyfill';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import App from "./components/App"
//
// $(document).ready(function() {
//   if ($('#div').selector.length > 0) {
//     $(function() {
//       ReactDOM.render(
//         <Router history={hashHistory}>
//           <Route path="/" component={App}></Route>
//
//         </Router>,
//         document.getElementById('app')
//       );
//     });
//   }
// })
//
// $(document).ready(function() {
//   $('.erb-display').hide();
// })

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { render } from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, middleware)

$(function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})
