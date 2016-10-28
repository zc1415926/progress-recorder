/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
//var NavTab = require('./navTab');
var NavTab = require('react-router-navtab');
var AuthStore = require('../../../stores/authStore');

var Nav = React.createClass({

    getInitialState: function () {
        return {
            authenticatedUser: {},
        };
    },

    componentDidMount: function () {
        AuthStore.addEventListener(AuthStore.GET_USER_FROM_TOKEN_SUCCESS, this.onGetUserSuccess);
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthStore.GET_USER_FROM_TOKEN_SUCCESS, this.onGetUserSuccess);
    },

    onGetUserSuccess: function () {
        console.log(AuthStore.getAuthenticatedUser()['user']['name']);
        this.setState({authenticatedUser: AuthStore.getAuthenticatedUser()['user']});
    },

    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">学生过程性评价系统</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <NavTab to="/">首页</NavTab>
                            <NavTab to="/students">学生管理</NavTab>
                            <NavTab to="/gradeClass">班级管理</NavTab>
                            <NavTab to="/behaviour">平时表现</NavTab>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <NavTab to="/neverhave">{this.state.authenticatedUser.name}</NavTab>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Nav;