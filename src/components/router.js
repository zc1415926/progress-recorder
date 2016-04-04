/**
 * Created by ZC on 2016/4/4.
 */
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

var router = React.createClass({
    render: function () {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={require('./homePage')}/>
            <Route path="student" component={require('./student/studentManager')} />
        </Router>
    );
}});

module.exports = router;