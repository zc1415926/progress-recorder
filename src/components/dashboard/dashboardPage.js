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
var CreatePerfModal = require('../performance/partials/crudPerformanceModal');
var UpdatePerfModal = require('../performance/partials/crudPerformanceModal');
var DeletePerfModal = require('../performance/partials/crudPerformanceModal');

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
            targetStudentNumber: '',
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
        this.setState({targetStudentNumber: studentNumber});
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

    confirmCreatePerfModal: function () {
        console.log('create performance');
        console.log(this.state.targetPerformance);
    },

    confirmUpdatePerfModal: function () {
        console.log('update performance');
        console.log(this.state.targetPerformance);
    },

    openCrudModal: function (modalName, performance) {

        this.setState({isPerStudentModalOpen: false});

        switch (modalName){
            case 'create':
                this.state.targetPerformance.student_number = this.state.targetStudentNumber;
                this.setState({isCreatePerfModalOpen: true,
                    targetPerformance: this.state.targetPerformance});
                break;
            case 'update':
                this.setState({isUpdatePerfModalOpen: true,
                    targetPerformance: performance});
                break;
            case 'delete':
                this.setState({isDeletePerfModalOpen: true,
                    targetPerformance: performance});
                break;
        }
    },

    closeCrudModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isCreatePerfModalOpen: false});
                break;
            case 'update':
                this.setState({isUpdatePerfModalOpen: false});
                break;
            case 'delete':
                this.setState({isDeletePerfModalOpen: false});
                break;
        }

        this.setState({targetPerformance: {}});
    },
    //end region

    onInputValueChanged: function (e) {
        this.state.targetPerformance[e.target.id] = e.target.value;
        this.setState({targetPerformance: this.state.targetPerformance});
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
                    openCreatePerfModal={this.openCrudModal.bind(null, 'create')}
                    openUpdatePerfModal={this.openCrudModal.bind(null, 'update')}
                    openDeletePerfModal={this.openCrudModal.bind(null, 'delete')}/>

                <CreatePerfModal isOpen={this.state.isCreatePerfModalOpen}
                                 title={'新建表现分记录'}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmCreatePerfModal}
                                 closeModal={this.closeCrudModal.bind(null,'create')}
                                 onInputValueChanged={this.onInputValueChanged}/>

                <UpdatePerfModal isOpen={this.state.isUpdatePerfModalOpen}
                                 title={'修改表现分记录'}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmUpdatePerfModal}
                                 closeModal={this.closeCrudModal.bind(null,'update')}
                                 onInputValueChanged={this.onInputValueChanged}/>

                <DeletePerfModal isOpen={this.state.isDeletePerfModalOpen}
                                 title={'删除表现分记录'}
                                 disableArray={['disabled', 'disabled']}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmDeletePerfModal}
                                 closeModal={this.closeCrudModal.bind(null,'delete')}
                                 onInputValueChanged={this.onInputValueChanged}/>
            </div>
        );
    }
});

module.exports = DashboardPage;