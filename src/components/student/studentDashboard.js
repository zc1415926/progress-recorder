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
        console.log('performance');
        console.log(performance);

        return (
            <div>{performance.delta_score}---------------
            {performance.comment}</div>
        );
    },

    render: function () {

        if(sessionStorage.getItem('token'))
        {
            if(sessionStorage.getItem('role') == 'student'){
                return (
                    <div>
                        <h1>StudentDashboard</h1>
                        {this.state.performances.map(this.createPerformanceRow, this)}
                    </div>
                );
            }
            else{
                //role == 'student'
                return <h1>假装学生</h1>;
            }
        }
        else{
            return <h1>你没登录</h1>;
        }
    }
});

module.exports = StudentDashboard;