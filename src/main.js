/**
 * Created by ZC on 2016/4/2.
 */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Nav = require('./components/partials/nav');


var StudentActions = require('./actions/studentActions');

StudentActions.getAllStudents();

ReactDOM.render((
    <div>
        <Nav />
        <Router history={browserHistory}>
            <Route path="/" component={require('./components/homePage')} />
        </Router>
    </div>

), document.getElementById('app'));