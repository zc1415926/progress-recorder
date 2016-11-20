/**
 * Created by ZC on 2016/8/4.
 */
'use strict';

var React = require('react');

var GradeClassList = React.createClass({
    createGradeClassRow: function (gradeClass) {
        return (
            <tr key={gradeClass.classCode}>
                <td>{gradeClass.classCode}</td>
                <td>{gradeClass.entryYear}</td>
                <td>{gradeClass.gradeNum}</td>
                <td>{gradeClass.classNum}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                    onClick={this.props.openUpdateModal.bind(null, gradeClass)}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-link btn-student-operation"
                    onClick={this.props.openDeleteModal.bind(null, gradeClass)}>
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
                                onClick={this.props.openCreateModal}>
                            添加年级班级
                        </button>
                    </div>
                    <div className="col-md-6">
                        <p></p>
                    </div>
                </div>
                <table id="gradeClassListTable" className="table listTable">
                    <thead>
                    <tr>
                        <th>班级代码</th>
                        <th>入学年分</th>
                        <th>年级</th>
                        <th>班级</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>{this.props.gradeClasses.map(this.createGradeClassRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = GradeClassList;