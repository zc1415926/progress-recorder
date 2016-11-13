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
var PerformanceScoreActions = require('../../actions/performanceScoreActions');
var PerformanceScoreStore = require('../../stores/performanceScoreStore');
var PerfScorePerStudentModal = require('../performanceScore/partials/perfScorePerStudentModal');

var DashboardPage = React.createClass({

    getInitialState: function () {
        return {
            isPerStudentModalOpen: false,
            selectedClassCode: '',
            dashboardStudents: [],
            perfRecordsOfStudent: [],
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceScoreStore.addEventListener(PerformanceScoreStore.GET_PERF_RECORDS_OF_STUDENT, 
            this.onGetPerfRecordsOfStudent);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceScoreStore.removeEventListener(PerformanceScoreStore.GET_PERF_RECORDS_OF_STUDENT, 
            this.onGetPerfRecordsOfStudent);
    },
    
    onDashboard: function(){
        this.setState({dashboardStudents: StudentStore.getDashboardStudents()});
    },
    
    onGetPerfRecordsOfStudent: function () {
        this.setState({isPerStudentModalOpen: true,
            perfRecordsOfStudent: PerformanceScoreStore.getRecordsOfStudent()
        });
    },

    dashboardStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.dashboardStudentsByGradeClass(currentGrade, currentClass);
    },

    onPerfScoreClicked: function(studentNumber){
        PerformanceScoreActions.getPerformanceScoreByStudentNumber(studentNumber);
    },
    
    closePerStudentModal: function () {
        this.setState({isPerStudentModalOpen: false});
    },
    
    render: function () {
        return (
            <div>
                <div className="jumbotron subPage">
                    <h1>Dashboard</h1>
                    <p>Hi! I'm dashboard.</p>
                    <GradeClass getStudentsByGradeClass={this.dashboardStudentsByGradeClass}/>
                </div>
                <DashbStuList onPerfScoreClicked={this.onPerfScoreClicked}
                              students={this.state.dashboardStudents}/>
                              
                <PerfScorePerStudentModal isOpen={this.state.isPerStudentModalOpen}
                    closeModal={this.closePerStudentModal}
                    records={this.state.perfRecordsOfStudent}/>
            </div>
        );
    }
});

module.exports = DashboardPage;