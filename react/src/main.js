import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App'
import DestinationsContainer from './containers/DestinationsContainer'

$(document).ready(function() {
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
})

// <Route path="/destinations(/:destination)" component={DestinationsContainer}></Route>

$(document).ready(function() {
  $('.erb-display').hide();
})
