/**
 * Created by zc1415926 on 2016/11/11.
 */
'use strict';

var React = require('react');

var StudentList = React.createClass({

    getInitialState: function () {
        return {
            students: this.props.students,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        return this.state.students = nextProps.students;
    },

    createStudentRow: function(student)
    {
        return (
            <tr key={student.id}>
                <td>{student.student_name}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                            >
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                            >
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </td>
            </tr>
        );
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <table id="studentListTable" className="table listTable">
                        <thead>
                        <tr>
                            <th>姓名</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.students.map(this.createStudentRow, this)}</tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h1>hqhq</h1>
                </div>
            </div>
        );
    }
});

module.exports = StudentList;