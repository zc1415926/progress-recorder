/**
 * Created by zc1415926 on 2016/11/11.
 */
/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');
var GradeClass = require('../student/partials/gradeClassSelector');
var StudentActions = require('../../actions/studentActions');
var StudentStore = require('../../stores/studentStore');
var DashbStuList = require('./partials/dashboardStudentList');

var DashboardPage = React.createClass({

    getInitialState: function () {
        return {
            students: [],
            isStuCreateModalOpen: false,
            isEditModalOpen: false,
            isStuDelModalOpen: false,
            selectedClassCode: '',
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.CHANGE_EVENT, this._onChange);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.CHANGE_EVENT, this._onChange);
    },

    _onChange: function () {
        this.setState({students: StudentStore.getStudents()});
    },

    getStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.getStudentsByGradeClass(currentGrade, currentClass);
    },

    render: function () {
        return (
            <div>
                <div className="jumbotron subPage">
                    <h1>Dashboard</h1>
                    <p>Hi! I'm dashboard.</p>
                    <GradeClass getStudentsByGradeClass={this.getStudentsByGradeClass}/>
                </div>
                <DashbStuList students={this.state.students}/>
            </div>
        );
    }
});

module.exports = DashboardPage;