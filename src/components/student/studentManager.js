/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../../stores/studentStore');
var StudentActions = require('../../actions/studentActions');
var CreateStudentModal = require('./partials/crudStudentModal');
var UpdateStudentModal = require('./partials/crudStudentModal');
var DeleteStudentModal = require('./partials/crudStudentModal');
var StudentList = require('./partials/studentList');
var GradeClassDropdown = require('../app/ui/gradeClassDropdown');
var toastr = require('toastr');

var StudentManager = React.createClass({

    getInitialState: function () {
        return {
            students: [],
            isStuCreateModalOpen: false,
            isEditModalOpen: false,
            isStuDelModalOpen: false,
            selectedClassCode: '',
            targetStudent: {},
            targetGradeNum: '',
            targetClassNum: '',
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.CHANGE_EVENT, this.onStudentChange);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.CHANGE_EVENT, this.onStudentChange);
    },

    onStudentChange: function (actionName) {
        /*
        按年班查学生，添加、修改、删除学生都会引发CHANGE_EVENT并
        进入到这个函数，如果是添加、修改、删除其中的一种，则还要
        关闭相应的对话框，并清除targetStudent
        */
        this.setState({students: StudentStore.getStudents()});

        switch (actionName){
            case 'create':
                toastr.success('已经成功添加学生');
                this.setState({isStuCreateModalOpen: false});
                this.setState({targetStudent: {}});
                break;
            case 'update':
                toastr.success('已经成功修改学生');
                this.setState({isEditModalOpen: false});
                this.setState({targetStudent: {}});
                break;
            case 'delete':
                toastr.success('已经成功删除学生');
                this.setState({isStuDelModalOpen: false});
                this.setState({targetStudent: {}});
                break;
        }

    },

    onGradeClassSelected: function (gradeNum, classNum) {

        this.state.targetGradeNum = gradeNum;
        this.state.targetClassNum = classNum;

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
                     In a word: 解除绑定
                     */
                    targetStudent: {
                        student_number      : student['student_number'],
                        student_name        : student['student_name'],
                        classCode           : student['classCode']
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

    confirmModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.state.targetStudent.gradeNum = this.state.targetGradeNum;
                this.state.targetStudent.classNum = this.state.targetClassNum;
                StudentActions.createStudent(this.state.targetStudent);
                break;
            case 'update':
                StudentActions.updateStudent(this.state.targetStudent);
                break;
            case 'delete':
                StudentActions.deleteStudent(this.state.targetStudent);
                break;
        }
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
                                    confirmModal={this.confirmModal.bind(null, 'create')}
                                    closeModal={this.closeCrudModal.bind(null, 'create')}/>

                <UpdateStudentModal isOpen={this.state.isEditModalOpen}
                                    student={this.state.targetStudent}
                                    title={'修改学生信息'}
                                    disableArray={['disabled', '']}
                                    onInputValueChanged={this.onInputValueChanged}
                                    confirmModal={this.confirmModal.bind(null, 'update')}
                                    closeModal={this.closeCrudModal.bind(null, 'update')}/>

                <DeleteStudentModal isOpen={this.state.isStuDelModalOpen}
                                    student={this.state.targetStudent}
                                    title={'删除学生信息'}
                                    disableArray={['disabled', 'disabled']}
                                    onInputValueChanged={this.onInputValueChanged}
                                    confirmModal={this.confirmModal.bind(null, 'delete')}
                                    closeModal={this.closeCrudModal.bind(null, 'delete')}/>
            </div>
        );
    }
});

module.exports = StudentManager;