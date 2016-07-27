/**
 * Created by ZC on 2016/7/27.
 */
'use strict';

var React = require('react');
var Dropdown = require('./DropdownMenu');
var StudentActions = require('../../../actions/studentActions');
var StudentStore = require('../../../stores/studentStore');
var _ = require('lodash');

//var grades = [];

var GradeClassSelector = React.createClass({

    getInitialState: function () {
        return {
            gradeClasses: {},
            grades: [],
            classes: []
        };
    },

    componentDidMount: function () {
        StudentStore.addChangeListener(this._onChange);
        StudentActions.getGradeClasses();
    },

    componentWillUnmount: function () {
        StudentStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({grades: _.keys(StudentStore.getGradeClasses())});
    },

    onGradeSelect: function (grade) {
        this.setState({classes: StudentStore.getGradeClasses()[grade]});
    },

    onClassSelect: function (classNum) {
        console.log(classNum);
    },

    render: function () {
        return (
            <div>
                <label>年级：</label>
                <Dropdown text="请选择" listItems={this.state.grades}
                          callbackParent={this.onGradeSelect}/>
                <label>班级：</label>
                <Dropdown text="请选择" listItems={this.state.classes}
                          callbackParent={this.onClassSelect}/>
            </div>
        );
    }
});

module.exports = GradeClassSelector;