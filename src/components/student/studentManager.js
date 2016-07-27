/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../../stores/studentStore');

var StuCreateModal = require('./partials/studentCreateModal');
var StuUpdateModal = require('./partials/studentUpdateModal');
var StuDelModal = require('./partials/studentDeleteModal');
var GradeClass = require('./partials/gradeClassSelector');
var StudentList = require('./partials/studentList');

var stateObject = {};

var HomePage = React.createClass({

    getInitialState: function () {
        return {
            students: StudentStore.getAllStudents(),
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
        this.setState({students: StudentStore.getAllStudents()});
    },

    openStuCreateModal: function(){
        this.setState({
            isStuCreateModalOpen: true
        });
    },

    openEditModal: function (stu, event) {
        //console.log('openModal');
        //console.log(this.state.modalIsOpen);
        this.setState({
            currentStudent: stu,
            isEditModalOpen: true
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
        console.log(stateObject);
        //browserHistory.push('/');
        this.setState(stateObject);

    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>学生管理</h1>
                    <p>您可以在这里添加、删除、修改学生信息。</p>
                    <GradeClass/>
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