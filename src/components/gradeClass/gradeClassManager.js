/**
 * Created by ZC on 2016/8/4.
 */
'use strict';

var React = require('react');
var GradeClassActions = require('../../actions/gradeClassActions');
var GradeClassStore = require('../../stores/gradeClassStore');
var GradeClassList = require('./partials/gradeClassList');
var GradeClassCreateModal = require('./partials/gradeClassCreateModal');
var GradeClassUpdateModal = require('./partials/gradeClassUpdateModal');
var GradeClassDeleteModal = require('./partials/gradeClassDeleteModal');

var GradeClassManager = React.createClass({

    getInitialState: function () {
        return {
            gradeClasses: [{
                classCode: '请稍等',
                entryYear: '正在',
                gradeNum: '加载',
                classNum: '!',
            }],

            isCreateModalOpen: false,
            isUpdateModalOpen: false,
            isDeleteModalOpen: false,
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

    openCreateModal: function () {
        this.setState({isCreateModalOpen: true});
    },

    closeCreateModal: function () {
        this.setState({isCreateModalOpen: false});
    },

    openUpdateModal: function (gradeClass) {
        this.setState({isUpdateModalOpen: true,
            currentGradeClass: gradeClass});
    },

    closeUpdateModal: function () {
        this.setState({isUpdateModalOpen: false,
            currentGradeClass: {}});
    },

    openDeleteModal: function (gradeClass) {
        this.setState({isDeleteModalOpen: true,
            currentGradeClass: gradeClass});
    },

    closeDeleteModal: function () {
        this.setState({isDeleteModalOpen: false,
            currentGradeClass: {}});
    },

    render: function () {

        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>班级管理</h1>
                    <p>您可以在这里添加、删除、修改班级信息。</p>
                </div>

                <GradeClassList gradeClasses={this.state.gradeClasses}
                                openCreateModal={this.openCreateModal}
                                openUpdateModal={this.openUpdateModal}
                                openDeleteModal={this.openDeleteModal}/>

                <GradeClassCreateModal isOpen={this.state.isCreateModalOpen}
                                       closeModal={this.closeCreateModal}/>
                <GradeClassUpdateModal isOpen={this.state.isUpdateModalOpen}
                                       currentGradeClass={this.state.currentGradeClass}
                                       closeModal={this.closeUpdateModal}/>
                <GradeClassDeleteModal isOpen={this.state.isDeleteModalOpen}
                                       currentGradeClass={this.state.currentGradeClass}
                                       closeModal={this.closeDeleteModal}/>
            </div>
        );
    }
});

module.exports = GradeClassManager;