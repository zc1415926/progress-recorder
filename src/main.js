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
var AuthType = require('./components/auth/auhTypes');

var App = require('./components/app/app');
var Home = require('./components/app/partials/homePage');

var onEnterRouter = function (routeType, nextState, replace) {

    var token = sessionStorage.getItem('token');

    var roleWeight = 1000;

    if(token){
        switch (sessionStorage.getItem('role')){
            case 'admin':
                roleWeight = 0;
                break;
            case 'teacher':
                roleWeight = 100;
                break;
            case 'student':
                roleWeight = 200;
                break;
        }

        if(roleWeight <= routeType){
            console.log('符合权限');
        }
        else {
            console.log('不符合权限');
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
            <Route path="student" component={require('./components/student/studentDashboard')}
                onEnter={onEnterRouter.bind(null, AuthType.STUDENT)}/>

            <Route path="admin" component={require('./components/admin/adminPage')}
                   onEnter={onEnterRouter.bind(null, AuthType.ADMIN)}/>
            <Route path="admin/dashboard" component={require('./components/dashboard/dashboardPage')}/>
            <Route path="admin/students" component={require('./components/student/studentManager')}/>
            <Route path="admin/gradeClass" component={require('./components/gradeClass/gradeClassManager')}/>
            <Route path="admin/behaviour" component={require('./components/behaviour/behaviourPage')}/>
            <Route path="admin/term" component={require('./components/term/termPage')}/>

            <Route path="auth" component={require('./components/auth/authPage')}/>
            <Route path="*" component={require('./components/app/pageNotFind')}/>
        </Route>
    </Router>

), document.getElementById('app'));