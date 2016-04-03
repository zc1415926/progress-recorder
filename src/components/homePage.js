/**
 * Created by ZC on 2016/4/2.
 */
"use strict";

var React = require('react');
var StudentStore = require('../stores/studentStore');

var HomePage = React.createClass({

    getInitialState: function() {
        return {
            students: StudentStore.getAllStudents(),
        };
    },

    componentWillMount: function() {
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
                    <td>{student.student_grade}</td>
                    <td>{student.student_class}</td>
                </tr>
            );
        };

        return (
            <div className="container">
                <h1>Hello!!</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>State</th>
                            <th>Grade</th>
                            <th>Class</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.students.map(createAuthorRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = HomePage;