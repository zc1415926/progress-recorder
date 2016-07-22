/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var NavTab = require('./navTab');

var Nav = React.createClass({
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
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Nav;