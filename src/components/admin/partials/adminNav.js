/**
 * Created by zc1415926 on 2017/2/10.
 */
'use strict';

var React = require('react');
var NavTab = require('../../app/partials/navTab');

var AdminNav = React.createClass({
    render: function () {
        return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">管理员工具</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <NavTab to="/admin">管理首页</NavTab>
                                <NavTab to="/dashboard">仪表板</NavTab>
                                <NavTab to="/students">学生管理</NavTab>
                                <NavTab to="/gradeClass">班级管理</NavTab>
                                <NavTab to="/behaviour">平时表现</NavTab>
                                <NavTab to="/term">学期管理</NavTab>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
});

module.exports = AdminNav;