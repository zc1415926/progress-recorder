/**
 * Created by ZC on 2016/7/27.
 */
'use strict';

var React = require('react');

var StudentList = React.createClass({
    /*getInitialState: function () {
        return {
            students: this.props.students
        };
    },
    createAuthorRow: function (student) {
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
    },*/


    createStudentRow: function(student)
    {
        return (
            <tr key={student.id}>
                <td>{student.student_number}</td>
                <td>{student.student_name}</td>
                <td>{student.student_entry_year}</td>
                <td>{student.student_grade}</td>
                <td>{student.student_class}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.props.onEditClick.bind(null, student)}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                            onClick={this.props.onDeleteClick.bind(null, student)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </td>
            </tr>
        );
    },

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary btn-block "
                                onClick={this.props.onCreateClick}>
                            添加学生
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary btn-block "
                        >
                            批量添加学生
                        </button>
                    </div>
                </div>

                <table id="studentListTable" className="table">
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
                    <tbody>{this.props.students.map(this.createStudentRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = StudentList;