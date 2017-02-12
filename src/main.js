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
var toastr = require('toastr');

var App = require('./components/app/app');
var Home = require('./components/app/partials/homePage');

var onEnterRouter = function (routeType, nextState, replace) {

    var token = sessionStorage.getItem('token');

    if(token){
        if(sessionStorage.getItem('role') == routeType){

        }
        else {
            //权限不相符的情况
        }
    }
    else {
        //not logged in
        replace('/auth');
        toastr.error('您没有登录！')
    }
};

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/student" component={require('./components/student/studentDashboard')}
                onEnter={onEnterRouter.bind(null, 'student')}/>
            <Route path="/students" component={require('./components/student/studentManager')}/>
            <Route path="/gradeClass" component={require('./components/gradeClass/gradeClassManager')}/>
            <Route path="/behaviour" component={require('./components/behaviour/behaviourPage')}/>
            <Route path="/auth" component={require('./components/auth/authPage')}/>
            <Route path="/admin" component={require('./components/admin/adminPage')}/>
            <Route path="/dashboard" component={require('./components/dashboard/dashboardPage')}/>
            <Route path="/term" component={require('./components/term/termPage')}/>
            <Route path="*" component={require('./components/app/pageNotFind')}/>
        </Route>
    </Router>

), document.getElementById('app'));