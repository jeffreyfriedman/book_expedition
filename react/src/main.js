import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from "./components/App"
import UserDashboard from "./components/UserDashboard"

if ($('#div').selector.length > 0) {
  $(function() {
    ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={App}></Route>

      </Router>,
      document.getElementById('app')
    );
  });
}

$(document).ready(function() {
  $('.erb-display').hide();
})
