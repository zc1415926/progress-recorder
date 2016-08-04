/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="jumbotron subPage">
                    <h1>欢迎使用学生过程性评价系统</h1>
                    <ul>
                        <li>已经完成学生信息的增删改查功能</li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;