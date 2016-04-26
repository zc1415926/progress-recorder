/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../stores/studentStore');
var Link = require('react-router').Link;
var StuCreateModal = require('./student/studentCreateModal');
var StuUpdateModal = require('./student/studentUpdateModal');
var StuDelModal = require('./student/studentDeleteModal');

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
        this.setState(stateObject);
    },

    render: function () {

        var createAuthorRow = function (student) {
            return (
                <tr key={student.id}>
                    <td>{student.student_number}</td>
                    <td>{student.student_name}</td>
                    <td>{student.student_entry_year}</td>
                    <td>{student.student_grade}</td>
                    <td>{student.student_class}</td>
                    <td>
                        <button type="button" className="btn btn-link btn-student-operation"
                                onClick={this.openEditModal.bind(this, student)}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-student-operation"
                                onClick={this.openStuDelModal.bind(this, student)}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                    </td>
                </tr>
            );
        };

        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>学生管理</h1>
                    <p>您可以在这里添加、删除、修改学生信息。</p>
                    <button type="button" className="btn btn-primary btn-lg"
                            onClick={this.openStuCreateModal}>
                        添加学生
                    </button>
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>入学年</th>
                        <th>年级</th>
                        <th>班级</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>{this.state.students.map(createAuthorRow, this)}</tbody>
                </table>

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