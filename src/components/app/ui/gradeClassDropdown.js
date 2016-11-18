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
        //GradeClassAction.getGradeClasses();
        return {
            listGradeNums: [],
            listClassNums: [],
            targetGradeNum: '',
            targetClassNum: '',
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
        this.setState({targetGradeNum: item});
    },
    
    onClassSelected: function (item) {
        console.log('onClassSelected');

        this.setState({targetClassNum: item});

        console.log(this.state.targetGradeNum);
        console.log(this.state.targetClassNum);
    },

    render: function () {
        return (
            <div>
                <GradeDropdown text={'Grade'} items={this.state.listGradeNums} onItemClicked={this.onGradeSelected}/>
                <ClassDropdown text={'Class'} items={this.state.listClassNums} onItemClicked={this.onClassSelected}/>
            </div>
        );
    }
});

module.exports = GradeClassDropdown;