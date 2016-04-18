/**
 * Created by ZC on 2016/4/2.
 */
'use strict';

var React = require('react');
var StudentStore = require('../stores/studentStore');
var Link = require('react-router').Link;

var HomePage = React.createClass({

    getInitialState: function() {
        return {
            students: StudentStore.getAllStudents(),
        };
    },

    componentDidMount: function() {
        StudentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        StudentStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        console.log('this is onChange handler');
        this.setState({ students: StudentStore.getAllStudents() });
    },

    render: function () {

        var createAuthorRow = function(student) {
            return (
                <tr key={student.id}>
                    <td>{student.student_number}</td>
                    <td>{student.student_name}</td>
                    <td>{student.student_entry_year}</td>
                    <td>{student.student_grade}</td>
                    <td>{student.student_class}</td>
                    <td><button type="button" className="btn btn-link btn-student-operation"><span className="glyphicon glyphicon-remove"></span></button>
                    <button type="button" className="btn btn-link btn-student-operation"><span className="glyphicon glyphicon-pencil"></span></button></td>
                </tr>
            );
        };

        return (
            <div className="container">
                <h1>Hello!!</h1>
                <Link to="/student" className="btn btn-primary">Add Student</Link>
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
            </div>
        );
    }
});

module.exports = HomePage;