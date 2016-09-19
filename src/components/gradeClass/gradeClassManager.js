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
var toastr = require('toastr');

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
        GradeClassStore.addEventListener(GradeClassStore.RETRIEVE_EVENT, this.onRetrieved);
        GradeClassStore.addEventListener(GradeClassStore.CREATE_EVENT, this.onCreated);
        GradeClassStore.addEventListener(GradeClassStore.UPDATE_EVENT, this.onUpdated);
        GradeClassStore.addEventListener(GradeClassStore.DELETE_EVENT, this.onDeleted);
        //初次打开页面，获取一次数据
        GradeClassActions.getGradeClasses();
    },

    componentWillUnmount: function () {
        GradeClassStore.removeEventListener(this._onChange);
    },

    onRetrieved: function () {
        this.setState({gradeClasses: GradeClassStore.getGradeClasses()});
    },

    onCreated: function () {
        toastr.success('已经成功创建班级');
        this.setState({isCreateModalOpen: false,
            currentGradeClass: {}});
    },

    onUpdated: function () {
        toastr.success('已经成功修改班级');
        this.setState({isUpdateModalOpen: false,
            currentGradeClass: {}});
    },

    onDeleted: function () {
        toastr.success('已经成功删除班级，班级代码：' + GradeClassStore.getGradeClassCode());
        this.setState({isDeleteModalOpen: false,
            currentGradeClass: {}});
    },

    openCreateModal: function () {
        this.setState({isCreateModalOpen: true});
    },

    closeCreateModal: function () {
        this.setState({isCreateModalOpen: false,
            currentGradeClass: {}});
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