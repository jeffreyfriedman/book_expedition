import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App'
import NewApp from './containers/NewApp'
import DashboardContainer from './containers/DashboardContainer'
import DestinationsContainer from './containers/DestinationsContainer'
import BooksContainer from './containers/BooksContainer'
import NotesContainer from './containers/NotesContainer'

$(document).ready(function() {
  if ($('#div').selector.length > 0) {
    $(function() {
      ReactDOM.render(
        <Router history={hashHistory}>
          <Route path="/" component={NewApp}>
            <IndexRoute component={DashboardContainer}/>
            <Route path="/destinations(/:destination)" component={DestinationsContainer} />
            <Route path="/books(/:book)" component={BooksContainer} />
            <Route path="/notes(/:note)" component={NotesContainer} />
          </Route>
        </Router>,
        document.getElementById('app')
      );
    });
  }
})
// <Route path="/" component={App}></Route>
// <Route path="/destinations(/:destination)" component={DestinationsContainer}></Route>

$(document).ready(function() {
  $('.erb-display').hide();
})
