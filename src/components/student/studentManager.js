/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../../stores/studentStore');
var GradeClassStore = require('../../stores/gradeClassStore');
var StudentActions = require('../../actions/studentActions');
var CreateStudentModal = require('./partials/crudStudentModal');
var UpdateStudentModal = require('./partials/crudStudentModal');
var DeleteStudentModal = require('./partials/crudStudentModal');
var GradeClass = require('./partials/gradeClassSelector');
var StudentList = require('./partials/studentList');

var stateObject = {};

var StudentManager = React.createClass({

    getInitialState: function () {
        return {
            students: [],
            isStuCreateModalOpen: false,
            isEditModalOpen: false,
            isStuDelModalOpen: false,
            selectedClassCode: '',
            targetStudent: {},
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.CHANGE_EVENT, this._onChange);
        //GradeClassStore.addEventListener(GradeClassStore.GET_CLASS_CODE_EVENT, this.onGetClassCode);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.CHANGE_EVENT, this._onChange);
        //GradeClassStore.removeEventListener(GradeClassStore.GET_CLASS_CODE_EVENT, this.onGetClassCode);
    },

    _onChange: function () {
        this.setState({students: StudentStore.getStudents()});
    },

    /*onGetClassCode: function () {
        this.setState({classCode: GradeClassStore.getClassCode()});
    },*/

    openStuCreateModal: function(){
        this.setState({
            isStuCreateModalOpen: true
        });
    },

    openEditModal: function (stu, event) {
        this.setState({
            isEditModalOpen: true,

            /*
            如果不这样进行一次操作，传返回的stu的话，会导致这stu一直是“传引用（瞎猜的）”，
            使得当在修改学生信息对话框中修改了文本框中的内容并点击“取消”后，
            学生列表中的相应位置在内存中被修改，使用下面的代码打断引用的传递解决该问题
             */
            targetStudent: {
                student_number      : stu['student_number'],
                student_name        : stu['student_name'],
                classCode  : GradeClassStore.getClassCode()}
        });
    },

    openStuDelModal: function(stu, event){
        this.setState({
            targetStudent: stu,
            isStuDelModalOpen: true
        });
    },

    getStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.getStudentsByGradeClass(currentGrade, currentClass);
    },

    closeCrudModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isStuCreateModalOpen: false});
                break;
            case 'update':
                this.setState({isEditModalOpen: false});
                break;
            case 'delete':
                this.setState({isStuDelModalOpen: false});
                break;
        }

        this.setState({targetStudent: {}});
    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>学生管理</h1>
                    <p>您可以在这里添加、删除、修改学生信息。</p>
                    <GradeClass getStudentsByGradeClass={this.getStudentsByGradeClass}/>
                </div>

                <StudentList students={this.state.students}
                             onCreateClick={this.openStuCreateModal}
                             onEditClick={this.openEditModal}
                             onDeleteClick={this.openStuDelModal}/>

                <CreateStudentModal isOpen={this.state.isStuCreateModalOpen}
                                    student={this.state.targetStudent}
                                    title={'添加学生信息'}
                                    closeModal={this.closeCrudModal.bind(null, 'create')}/>

                <UpdateStudentModal isOpen={this.state.isEditModalOpen}
                                    student={this.state.targetStudent}
                                    title={'修改学生信息'}
                                    closeModal={this.closeCrudModal.bind(null, 'update')}/>

                <DeleteStudentModal isOpen={this.state.isStuDelModalOpen}
                                    student={this.state.targetStudent}
                                    title={'删除学生信息'}
                                    closeModal={this.closeCrudModal.bind(null, 'delete')}/>
            </div>
        );
    }
});

module.exports = StudentManager;