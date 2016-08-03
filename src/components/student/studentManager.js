/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../../stores/studentStore');
var StudentActions = require('../../actions/studentActions');

var StuCreateModal = require('./partials/studentCreateModal');
var StuUpdateModal = require('./partials/studentUpdateModal');
var StuDelModal = require('./partials/studentDeleteModal');
var GradeClass = require('./partials/gradeClassSelector');
var StudentList = require('./partials/studentList');

var stateObject = {};

var HomePage = React.createClass({

    getInitialState: function () {
        return {
            students: [],
            isStuCreateModalOpen: false,
            isEditModalOpen: false,
            isStuDelModalOpen: false,
        };
    },

    componentDidMount: function () {
        StudentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        StudentStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({students: StudentStore.getStudents()});
    },

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
            currentStudent: {
                student_number      : stu['student_number'],
                student_name        : stu['student_name'],
                student_entry_year  : stu['student_entry_year'],
                student_grade       : stu['student_grade'],
                student_class       : stu['student_class']}
        });
    },

    openStuDelModal: function(stu, event){
        this.setState({
            currentStudent: stu,
            isStuDelModalOpen: true
        });
    },


    onModalCloseNoteParent:function(modalName){
        // 使用obj.'is'+modalName+'ModalOpen'的方法不能定义一个object的key
        // 要定义一个由表达式组成的object的key，要先声明var stateObject = {}
        // 再用obj[obj.'is'+modalName+'ModalOpen']=false赋值
        stateObject['is'+modalName+'ModalOpen'] = false;
        //console.log(stateObject);
        //browserHistory.push('/');
        this.setState(stateObject);
    },

    getStudentsByGradeClass: function (currentGrade, currentClass) {
        StudentActions.getStudentsByGradeClass(currentGrade, currentClass);
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

                <StuCreateModal isOpen={this.state.isStuCreateModalOpen} currentStudent={this.state.currentStudent}
                                callbackParent={this.onModalCloseNoteParent}/>
                <StuUpdateModal isOpen={this.state.isEditModalOpen} currentStudent={this.state.currentStudent}
                              callbackParent={this.onModalCloseNoteParent}/>
                <StuDelModal isOpen={this.state.isStuDelModalOpen} currentStudent={this.state.currentStudent}
                              callbackParent={this.onModalCloseNoteParent}/>
            </div>
        );
    }
});

module.exports = HomePage;