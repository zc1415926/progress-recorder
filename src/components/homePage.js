/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../stores/studentStore');
var Link = require('react-router').Link;
var StuInfoModal = require('./student/studentInfoModal');

var HomePage = React.createClass({

    getInitialState: function () {
        return {
            students: StudentStore.getAllStudents(),
            modalIsOpen: false
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

    openModal: function (stu, event) {
        this.setState({
            currentStudent: stu,
            modalIsOpen: true
        });
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
                                onClick={this.openModal.bind(this, student)}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-student-operation">
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
                    <Link to="/student" className="btn btn-primary btn-lg">添加学生</Link>
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

                <StuInfoModal isOpen={this.state.modalIsOpen} currentStudent={this.state.currentStudent}/>
            </div>
        );
    }
});

module.exports = HomePage;