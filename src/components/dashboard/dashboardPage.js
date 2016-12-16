/**
 * Created by zc1415926 on 2016/11/11.
 */
/**
 * Created by ZC on 2016/7/20.
 */
'use strict';

var React = require('react');
var GradeClassDropdown = require('../app/ui/gradeClassDropdown');
var StudentActions = require('../../actions/studentActions');
var StudentStore = require('../../stores/studentStore');
var DashbStuList = require('./partials/dashboardStudentList');
var PerformanceActions = require('../../actions/PerformanceActions');
var PerformanceStore = require('../../stores/PerformanceStore');
var TermActions = require('../../actions/termActions');
var TermStore = require('../../stores/termStore');
var CurrentTerm = require('../term/partials/currentTerm');
var TermSelectDropdown = require('../term/partials/termSelectDropdown');
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

            currentTerm: {},
            terms: [],
            //当前选中的学期
            targetTermCode: {},
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceStore.addEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.openModal.bind(null, 'list'));
        TermStore.addEventListener(TermStore.GET_CURRENT_EVENT, this.onGetCurrentTerm);
        TermStore.addEventListener(TermStore.CHANGE_EVENT, this.onIndexTerm);

        TermActions.getCurrentTerm();
        TermActions.indexTerm();
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DASHBOARD_EVENT, this.onDashboard);
        PerformanceStore.removeEventListener(PerformanceStore.GET_PERFORMANCE_OF_STUDENT,
            this.openModal.bind(null, 'list'));
        TermStore.removeEventListener(TermStore.GET_CURRENT_EVENT, this.onGetCurrentTerm);
        TermStore.removeEventListener(TermStore.CHANGE_EVENT, this.onIndexTerm);

    },

    onGetCurrentTerm: function () {
        this.setState({currentTerm: TermStore.getCurrentTerm()});
        this.state.targetTerm = TermStore.getCurrentTerm().term_code;
    },

    onIndexTerm: function () {
        this.setState({terms: TermStore.getTerms()});
    },

    onTermSelect: function (item) {
        //不触发render，可以马上赋值马上用
        this.state.targetTerm = item;
    },

    onDashboard: function(){
        this.setState({dashboardStudents: StudentStore.getDashboardStudent()});
    },

    dashboardStudent: function (currentGrade, currentClass) {
        StudentActions.dashboardStudent(currentGrade, currentClass, this.state.targetTerm);
    },

    onTotalScoreClicked: function(studentNumber){
        this.setState({targetStudentNumber: studentNumber});
        PerformanceActions.getPerformanceByStudentNumber(studentNumber);
    },

    //region: confirm open and close function of modals
    confirmModal: function (modalName) {
        switch (modalName){
            case 'create':
                console.log('confirm ' + modalName);
                console.log(this.state.targetPerformance);
                break;
            case 'update':
                console.log('confirm ' + modalName);
                console.log(this.state.targetPerformance);
                break;
            case 'delete':
                console.log('confirm ' + modalName);
                console.log(this.state.targetPerformance);
                break;
        }

        this.setState({targetPerformance: {}});
    },

    openModal: function (modalName, performance) {

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
            case 'list':
                this.setState({isPerStudentModalOpen: true,
                    performance: PerformanceStore.getRecordsOfStudent()
                });
                break;
        }
    },

    closeModal: function (modalName) {
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
            case 'list':
                this.setState({isPerStudentModalOpen: false});
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
                    <CurrentTerm currentTerm={this.state.currentTerm} />
                    <TermSelectDropdown terms={this.state.terms} onTermSelect={this.onTermSelect}/>
                    <GradeClassDropdown onGradeClassSelected={this.dashboardStudent}/>
                </div>
                <DashbStuList onPerfScoreClicked={this.onTotalScoreClicked}
                              students={this.state.dashboardStudents}/>
                              
                <ListPerfModal isOpen={this.state.isPerStudentModalOpen}
                    closeModal={this.closeModal.bind(null, 'list')}
                    performance={this.state.performance}
                    openCreatePerfModal={this.openModal.bind(null, 'create')}
                    openUpdatePerfModal={this.openModal.bind(null, 'update')}
                    openDeletePerfModal={this.openModal.bind(null, 'delete')}/>

                <CreatePerfModal isOpen={this.state.isCreatePerfModalOpen}
                                 title={'新建表现分记录'}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmModal.bind(null, 'create')}
                                 closeModal={this.closeModal.bind(null,'create')}
                                 onInputValueChanged={this.onInputValueChanged}/>

                <UpdatePerfModal isOpen={this.state.isUpdatePerfModalOpen}
                                 title={'修改表现分记录'}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmModal.bind(null, 'update')}
                                 closeModal={this.closeModal.bind(null,'update')}
                                 onInputValueChanged={this.onInputValueChanged}/>

                <DeletePerfModal isOpen={this.state.isDeletePerfModalOpen}
                                 title={'删除表现分记录'}
                                 disableArray={['disabled', 'disabled']}
                                 performance={this.state.targetPerformance}
                                 confirmModal={this.confirmModal.bind(null, 'delete')}
                                 closeModal={this.closeModal.bind(null,'delete')}
                                 onInputValueChanged={this.onInputValueChanged}/>
            </div>
        );
    }
});

module.exports = DashboardPage;