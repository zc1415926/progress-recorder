/**
 * Created by ZC on 2016/12/2.
 */
'use strict';

var React = require('react');
var GradeDropdown = require('./dropdown');
var ClassDropdown = require('./dropdown');
var GradeClassAction = require('../../../actions/gradeClassActions');
var GradeClassStore = require('../../../stores/gradeClassStore');

var SeasonSelectDropdown = require('./dropdown');

var GradeClassDropdown = React.createClass({

    getInitialState: function () {
        return {
            listGradeNums: [],
            listClassNums: [],
            targetGradeNum: '',
            //targetClassNum: '',
            gradeDropdownText: '请选择',
            classDropdownText: '请选择',
        };
    },

    render: function () {
        return (
            <div>
                <label>年级：</label>
                <SeasonSelectDropdown text={this.props.title} items={['春季', '秋季']}
                                onItemClicked={this.props.onDropdownSelect?this.props.onDropdownSelect:function(){}}/>

            </div>
        );
    }
});

module.exports = GradeClassDropdown;