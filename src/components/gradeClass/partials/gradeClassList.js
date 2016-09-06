/**
 * Created by ZC on 2016/8/4.
 */
'use strict';

var React = require('react');
//var _ = require('lodash');

var GradeClassComponent = React.createClass({

    getInitialState: function () {

        //console.log(this.props.gradeClasses);
        return {
            gradeClasses: this.props.gradeClasses,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        //console.log('StudentList nextProps');
        //console.log(nextProps.gradeClasses);
        return this.state.gradeClasses = nextProps.gradeClasses;
    },

    createGradeClassRow: function (gradeClasses) {
       /* _.forOwn(gradeClasses, function(value, key) {
            console.log(key);
            console.log(value);
        });*/
        return (
            <tr key={gradeClasses.classCode}>
                <td>{gradeClasses.classCode}</td>
                <td>{gradeClasses.entryYear}</td>
                <td>{gradeClasses.gradeNum}</td>
                <td>{gradeClasses.classNum}</td>
                <td>
                    <button type="button" className="btn btn-link btn-student-operation"
                    onClick={this.props.openUpdateModal.bind(null, gradeClasses)}>
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
            <div>
                <table id="gradeClassListTable" className="table">
                    <thead>
                    <tr>
                        <th>班级代码</th>
                        <th>入学年分</th>
                        <th>年级</th>
                        <th>班级</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>{this.state.gradeClasses.map(this.createGradeClassRow, this)}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = GradeClassComponent;