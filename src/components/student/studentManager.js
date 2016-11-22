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
var StudentList = require('./partials/studentList');
var GradeClassDropdown = require('../app/ui/gradeClassDropdown');

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
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.CHANGE_EVENT, this._onChange);
    },

    _onChange: function () {
        this.setState({students: StudentStore.getStudents()});
    },

    onGradeClassSelected: function (gradeNum, classNum) {
        StudentActions.getStudentsByGradeClass(gradeNum, classNum);
    },

    openCrudModal: function (modalName, student) {
        switch (modalName){
            case 'create':
                this.setState({isStuCreateModalOpen: true});
                break;
            case 'update':
                this.setState({
                    isEditModalOpen: true,
                    /*
                     如果不这样进行一次操作，传返回的stu的话，会导致这stu一直是“传引用（瞎猜的）”，
                     使得当在修改学生信息对话框中修改了文本框中的内容并点击“取消”后，
                     学生列表中的相应位置在内存中被修改，使用下面的代码打断引用的传递解决该问题
                     */
                    targetStudent: {
                        student_number      : student['student_number'],
                        student_name        : student['student_name'],
                        classCode  : GradeClassStore.getClassCode()
                    }
                });
                break;
            case 'delete':
                this.setState({isStuDelModalOpen: true,targetStudent: student});
                break;
        }
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

    onInputValueChanged: function (e) {
        this.state.targetStudent[e.target.id] = e.target.value;
        this.setState({targetStudent: this.state.targetStudent});
    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>学生管理</h1>
                    <p>您可以在这里添加、删除、修改学生信息。</p>
                    <GradeClassDropdown onGradeClassSelected={this.onGradeClassSelected}/>
                </div>

                <StudentList students={this.state.students}
                             onCreateClick={this.openCrudModal.bind(null, 'create')}
                             onEditClick={this.openCrudModal.bind(null, 'update')}
                             onDeleteClick={this.openCrudModal.bind(null, 'delete')}/>

                <CreateStudentModal isOpen={this.state.isStuCreateModalOpen}
                                    student={this.state.targetStudent}
                                    title={'添加学生信息'}
                                    onInputValueChanged={this.onInputValueChanged}
                                    closeModal={this.closeCrudModal.bind(null, 'create')}/>

                <UpdateStudentModal isOpen={this.state.isEditModalOpen}
                                    student={this.state.targetStudent}
                                    title={'修改学生信息'}
                                    onInputValueChanged={this.onInputValueChanged}
                                    closeModal={this.closeCrudModal.bind(null, 'update')}/>

                <DeleteStudentModal isOpen={this.state.isStuDelModalOpen}
                                    student={this.state.targetStudent}
                                    title={'删除学生信息'}
                                    onInputValueChanged={this.onInputValueChanged}
                                    closeModal={this.closeCrudModal.bind(null, 'delete')}/>
            </div>
        );
    }
});

module.exports = StudentManager;