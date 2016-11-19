/**
 * Created by zc1415926 on 2016/11/18.
 */
'use strict';

var React = require('react');
var GradeDropdown = require('./dropdown');
var ClassDropdown = require('./dropdown');
var GradeClassAction = require('../../../actions/gradeClassActions');
var GradeClassStore = require('../../../stores/gradeClassStore');

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

    componentWillMount: function () {
        GradeClassAction.getGrades();
    },

    componentDidMount: function () {
        GradeClassStore.addEventListener(GradeClassStore.GET_GRADES_EVENT, this.onGetGrades);
        GradeClassStore.addEventListener(GradeClassStore.GET_CLASSES_EVENT, this.onGetClasses);
    },

    componentWillUnmount: function () {
        GradeClassStore.removeEventListener(GradeClassStore.GET_GRADES_EVENT, this.onGetGrades);
        GradeClassStore.removeEventListener(GradeClassStore.GET_CLASSES_EVENT, this.onGetClasses);
    },

    onGetGrades: function () {
        this.setState({listGradeNums: GradeClassStore.getGrades()});
    },

    onGetClasses: function () {
        this.setState({listClassNums: GradeClassStore.getClasses()});
    },

    onGradeSelected: function (item) {
        GradeClassAction.getClassesByGradeNum(item);
        this.setState({
            targetGradeNum: item,
            gradeDropdownText: item,
            listClassNums: [],
            classDropdownText: '请选择'
        });
    },
    
    onClassSelected: function (item) {
        this.setState({
            //targetClassNum: item,
            classDropdownText:item
        });

        this.props.onGradeClassSelected(this.state.targetGradeNum, item);
    },

    render: function () {
        return (
            <div>
                <label>年级：</label>
                <GradeDropdown text={this.state.gradeDropdownText} items={this.state.listGradeNums}
                               onItemClicked={this.onGradeSelected}/>

                <label>班级：</label>
                <ClassDropdown text={this.state.classDropdownText} items={this.state.listClassNums}
                               onItemClicked={this.onClassSelected}/>
            </div>
        );
    }
});

module.exports = GradeClassDropdown;