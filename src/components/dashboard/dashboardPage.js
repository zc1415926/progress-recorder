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
var ListPerfModal = require('../performance/partials/listPerformanceModal');
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
            this.openListPerfModal);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceStore.removeEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.openListPerfModal);
    },
    
    onDashboard: function(){
        this.setState({dashboardStudents: StudentStore.getDashboardStudents()});
    },

    dashboardStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.dashboardStudentsByGradeClass(currentGrade, currentClass);
    },

    onTotalScoreClicked: function(studentNumber){
        PerformanceActions.getPerformanceByStudentNumber(studentNumber);
    },

    //region: open and close function of modals
    openListPerfModal: function () {
        this.setState({isPerStudentModalOpen: true,
            performance: PerformanceStore.getRecordsOfStudent()
        });
    },

    closeListPerfModal: function () {
        this.setState({isPerStudentModalOpen: false});
    },

    openCreatePerfModal: function () {
        this.setState({isPerStudentModalOpen: false});
        this.setState({isCreatePerfModalOpen: true});
    },

    confirmCreatePerfModal: function () {
        console.log('create performance');
        console.log(this.state.targetPerformance);
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
    //end region

    onInputValueChanged: function (e) {
        this.state.targetPerformance[e.target.id] = e.target.value;
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
                              
                <ListPerfModal isOpen={this.state.isPerStudentModalOpen}
                    closeModal={this.closeListPerfModal}
                    performance={this.state.performance}
                    openCreatePerfModal={this.openCreatePerfModal}
                    openUpdatePerfModal={this.openUpdatePerfModal}
                    openDeletePerfModal={this.openDeletePerfModal}/>

                <CreatePerfModal isOpen={this.state.isCreatePerfModalOpen}
                                 confirmModal={this.confirmCreatePerfModal}
                                 closeModal={this.closeCreatePerfModal}
                                 onInputValueChanged={this.onInputValueChanged}/>

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