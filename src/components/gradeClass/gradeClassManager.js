/**
 * Created by ZC on 2016/8/4.
 */
'use strict';

var React = require('react');
var GradeClassActions = require('../../actions/gradeClassActions');
var GradeClassStore = require('../../stores/gradeClassStore');
var GradeClassList = require('./partials/gradeClassList');

var GradeClassManager = React.createClass({

    getInitialState: function () {
        return {
            gradeClasses: [{
                classCode: '请稍等',
                entryYear: '正在',
                gradeNum: '加载',
                classNum: '!',
            }],
        };
    },

    componentDidMount: function () {
        GradeClassStore.addChangeListener(this._onChange);
        GradeClassActions.getGradeClasses();
    },

    componentWillUnmount: function () {
        GradeClassStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {


        this.setState({gradeClasses: GradeClassStore.getGradeClasses()});
    },

    render: function () {

        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>班级管理</h1>
                    <p>您可以在这里添加、删除、修改班级信息。</p>
                </div>

                <GradeClassList gradeClasses={this.state.gradeClasses}/>
            </div>
        );
    }
});

module.exports = GradeClassManager;