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
var Router1 = require('./components/router');


var StudentActions = require('./actions/studentActions');

var StudentManager = require('./components/student/studentManager');

StudentActions.getAllStudents();

ReactDOM.render((
    <div>
        <Nav />
        <Router1 />
    </div>

), document.getElementById('app'));