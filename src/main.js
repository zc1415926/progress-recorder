/**
 * Created by ZC on 2016/4/2.
 */
//$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app/app');
var Home = require('./components/app/partials/homePage');

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/students" component={require('./components/student/studentManager')}/>
            <Route path="/gradeClass" component={require('./components/gradeClass/gradeClassManager')}/>
            <Route path="/behaviour" component={require('./components/behaviour/behaviourPage')}/>
            <Route path="/auth" component={require('./components/auth/authPage')}/>
            <Route path="/dashboard" component={require('./components/dashboard/dashboardPage')}/>
            <Route path="/terms" component={require('./components/terms/termsPage')}/>
            <Route path="*" component={require('./components/app/pageNotFind')}/>
        </Route>
    </Router>

), document.getElementById('app'));