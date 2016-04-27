/**
 * Created by ZC on 2016/4/4.
 */
'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var router = React.createClass({
    render: function () {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={require('./student/studentManager')}/>
            {/*<Route path="student" component={require('./student/studentManager')} />*/}
        </Router>
    );
}});

module.exports = router;