/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
//var NavTab = require('./navTab');
var NavTab = require('react-router-navtab');
var authActions = require('../../../actions/authActions');
var AuthStore = require('../../../stores/authStore');

var Nav = React.createClass({

    componentDidMount: function () {
        AuthStore.addEventListener(AuthStore.GET_USER_FROM_TOKEN_SUCCESS, this.onGetUserSuccess);
    },

    componentWillUnmount: function () {
        AuthStore.removeEventListener(AuthStore.GET_USER_FROM_TOKEN_SUCCESS, this.onGetUserSuccess);
    },

    onGetUserSuccess: function () {
        //console.log(JSON.parse(AuthStore.getAuthenticatedUser()));
        console.log('AuthStore.getAuthenticatedUser()');
        console.log(AuthStore.getAuthenticatedUser());
        this.setState({authenticatedUser: AuthStore.getAuthenticatedUser()});
    },

    onLogoutClicked: function () {
        authActions.logout();
    },

    //导航条最右侧的部分，用户未登录则显示登录按钮，若用户已登录则根据用户角色生成不同的下拉菜单
    teacherAuthHandler: function (authenticatedUser) {
        if(!authenticatedUser){
            return (
                <ul className="nav navbar-nav navbar-right">
                    <NavTab to="/auth">教师登录</NavTab>
                </ul>
            );
        }
        else {

            var userRole = sessionStorage.getItem('role');

            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#"></a></li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            {authenticatedUser} <span className="caret"></span></a>
                            {this.getUserRoleMenu(userRole)}
                    </li>
                </ul>
            );
        }
    },

    //根据用户角色判定下拉菜单的内容
    getUserRoleMenu:function (userRole) {
        switch (userRole){
            case 'admin':
                return (
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="admin">管理首页</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="" onClick={this.onLogoutClicked}>退出登录</a></li>
                    </ul>
                );
                break;
            case 'teacher':
                return (
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="admin">管理首页</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="" onClick={this.onLogoutClicked}>退出登录</a></li>
                    </ul>
                );
                break;
            case 'student':
                return (
                    <ul className="dropdown-menu" role="menu">
                        <li><a href="" onClick={this.onLogoutClicked}>退出登录</a></li>
                    </ul>
                );
                break;
        }
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
                            <NavTab to="/studentDashboard">学生首页</NavTab>
                        </ul>
                        {this.teacherAuthHandler(AuthStore.getAuthenticatedUser()['name'])}
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Nav;