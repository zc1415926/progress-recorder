/**
 * Created by ZC on 2016/7/27.
 */
'use strict';

var React = require('react');
var Dropdown = require('./DropdownMenu');
var GradeClassActions = require('../../../actions/studentActions');
var GradeClassStore = require('../../../stores/gradeClassStore');
var _ = require('lodash');

var GradeClassSelector = React.createClass({

    getInitialState: function () {
        return {
            gradeClasses: {},
            gradeText: "请选择",
            classText: "请选择",
            grades: ["暂无数据"],
            classes: ["暂无数据"],
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
        this.setState({grades: _.keys(GradeClassStore.getGradeClasses())});
    },

    onGradeSelect: function (gradeNum) {
        this.setState({classes: GradeClassStore.getGradeClasses()[gradeNum]});
        this.setState({classText: "请选择"});
        this.setState({gradeText: gradeNum});
    },

    onClassSelect: function (classNum) {
        this.setState({classText: classNum});
        this.props.getStudentsByGradeClass(this.state.gradeText, classNum);
    },

    render: function () {
        return (
            <div>
                <label>年级：</label>
                <Dropdown text={this.state.gradeText} listItems={this.state.grades}
                          callbackParent={this.onGradeSelect}/>
                <label>班级：</label>
                <Dropdown text={this.state.classText} listItems={this.state.classes}
                          callbackParent={this.onClassSelect}/>
            </div>
        );
    }
});

module.exports = GradeClassSelector;