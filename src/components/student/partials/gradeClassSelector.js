/**
 * Created by ZC on 2016/7/27.
 */
'use strict';

var React = require('react');
var Dropdown = require('./DropdownMenu');
var StudentActions = require('../../../actions/studentActions');

var GraddeClassSelector = React.createClass({
    getInitialState: function () {
        return {
            gradeClasses: StudentActions.getAllStudents()
        };
    },

    render: function () {
        return (
            <div>
                <label>年级：</label>
                <Dropdown text="请选择" listItems={['1', '2']}/>
                <label>班级：</label>
                <Dropdown text="请选择" listItems={['1', '2']}/>
            </div>
        );
    }
});

module.exports = GraddeClassSelector;