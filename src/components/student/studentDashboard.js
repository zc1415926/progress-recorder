/**
 * Created by zc1415926 on 2017/2/11.
 */
/**
 * Created by zc1415926 on 2017/2/10.
 */
'use strict';

var React = require('react');
var AuthActions = require('../../actions/authActions');
var AuthStore = require('../../stores/authStore');
var PerformanceActions = require('../../actions/performanceActions');
var PerformanceStore = require('../../stores/PerformanceStore');

var StudentDashboard = React.createClass({

    getInitialState: function () {
        return {
            performances: [],
        };
    },

    componentDidMount: function () {

        PerformanceStore.addEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.getPerformance);

        if(sessionStorage.getItem('token'))
        {
            var user = AuthStore.getAuthenticatedUser();
            PerformanceActions.getPerformanceByStudentNumber(user.username);
        }
    },

    getPerformance: function () {
        this.setState({performances: PerformanceStore.getRecordsOfStudent()});
    },

    createPerformanceRow: function (performance) {
        //console.log('performance');
        //console.log(performance);

        return (
            <tr key={performance.id}>
                <td>{performance.delta_score}</td>
                <td>{performance.comment}</td>
                <td>{performance.created_at}</td>
            </tr>
        );
    },

    render: function () {

        if(sessionStorage.getItem('token'))
        {
            if(sessionStorage.getItem('role') == 'student'){
                return (
                    <div className="container">
                        <div className="jumbotron subPage">
                            <h1>学生首页</h1>
                            <p>学生可以查看自己的信息总览。</p>
                        </div>
                        <table id="studentListTable" className="table listTable">
                            <thead>
                            <tr>
                                <th>记分</th>
                                <th>原因</th>
                                <th>时间</th>
                            </tr>
                            </thead>
                            <tbody>{this.state.performances.map(this.createPerformanceRow, this)}</tbody>
                        </table>
                    </div>
                );
            }
            else{
                return <h1>模拟学生</h1>;
            }
        }
        else{
            return <h1>你没登录</h1>;
        }
    }
});

module.exports = StudentDashboard;