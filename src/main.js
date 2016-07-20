/**
 * Created by ZC on 2016/4/2.
 */
//$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var StudentActions = require('./actions/studentActions');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app/app');
var Home = require('./components/app/partials/homePage');
var Students = require('./components/student/studentManager');
var StudentCreate = require('./components/student/pages/studentCreatePage');


StudentActions.getAllStudents();

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/students" component={Students}/>
            <Route path="*" component={require('./components/app/pageNotFind')}/>
        </Route>
    </Router>

), document.getElementById('app'));