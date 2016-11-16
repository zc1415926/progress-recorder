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
var PerformanceActions = require('../../actions/PerformanceActions');
var PerformanceStore = require('../../stores/PerformanceStore');
var PerformanceOfStudentModal = require('../performance/partials/performanceOfStudentModal');
var CreatePerfModal = require('../performance/partials/createPerformanceModal');
var UpdatePerfModal = require('../performance/partials/updatePerformanceModal');
var DeletePerfModal = require('../performance/partials/deletePerformanceModal');

var DashboardPage = React.createClass({

    getInitialState: function () {
        return {
            isPerStudentModalOpen: false,
            isCreatePerfModalOpen: false,
            isUpdatePerfModalOpen: false,
            isDeletePerfModalOpen: false,
            selectedClassCode: '',
            dashboardStudents: [],
            performance: [],
            targetPerformance: {},
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceStore.addEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.onGetPerformanceOfStudent);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceStore.removeEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.onGetPerformanceOfStudent);
    },
    
    onDashboard: function(){
        this.setState({dashboardStudents: StudentStore.getDashboardStudents()});
    },

    onGetPerformanceOfStudent: function () {
        this.setState({isPerStudentModalOpen: true,
            performance: PerformanceStore.getRecordsOfStudent()
        });
    },

    dashboardStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.dashboardStudentsByGradeClass(currentGrade, currentClass);
    },

    onTotalScoreClicked: function(studentNumber){
        PerformanceActions.getPerformanceByStudentNumber(studentNumber);
    },
    
    closePerfStudentModal: function () {
        this.setState({isPerStudentModalOpen: false});
    },

    openCreatePerfModal: function () {
        this.setState({isPerStudentModalOpen: false});
        this.setState({isCreatePerfModalOpen: true});
    },

    closeCreatePerfModal: function () {
        this.setState({isCreatePerfModalOpen: false});
    },

    openUpdatePerfModal: function (performance) {
        this.setState({isPerStudentModalOpen: false});
        this.setState({isUpdatePerfModalOpen: true,
            targetPerformance: performance});
    },

    closeUpdatePerfModal: function () {
        this.setState({isUpdatePerfModalOpen: false});
    },

    openDeletePerfModal: function (performance) {
        this.setState({isPerStudentModalOpen: false});
        this.setState({isDeletePerfModalOpen: true,
            targetPerformance: performance});
    },

    closeDeletePerfModal: function () {
        this.setState({isDeletePerfModalOpen: false});
    },

    render: function () {
        return (
            <div>
                <div className="jumbotron subPage">
                    <h1>Dashboard</h1>
                    <p>Hi! I'm dashboard.</p>
                    <GradeClass getStudentsByGradeClass={this.dashboardStudentsByGradeClass}/>
                </div>
                <DashbStuList onPerfScoreClicked={this.onTotalScoreClicked}
                              students={this.state.dashboardStudents}/>
                              
                <PerformanceOfStudentModal isOpen={this.state.isPerStudentModalOpen}
                                           closeModal={this.closePerfStudentModal}
                                           performance={this.state.performance}
                                           openCreatePerfModal={this.openCreatePerfModal}
                                           openUpdatePerfModal={this.openUpdatePerfModal}
                                           openDeletePerfModal={this.openDeletePerfModal}/>
                <CreatePerfModal isOpen={this.state.isCreatePerfModalOpen}
                                 closeModal={this.closeCreatePerfModal}/>
                <UpdatePerfModal isOpen={this.state.isUpdatePerfModalOpen}
                                 performance={this.state.targetPerformance}
                                 closeModal={this.closeUpdatePerfModal}/>
                <DeletePerfModal isOpen={this.state.isDeletePerfModalOpen}
                                 performance={this.state.targetPerformance}
                                 closeModal={this.closeDeletePerfModal}/>
            </div>
        );
    }
});

module.exports = DashboardPage;