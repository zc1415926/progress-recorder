/**
 * Created by ZC on 2016/8/4.
 */
'use strict';

var React = require('react');
var GradeClassActions = require('../../actions/gradeClassActions');
var GradeClassStore = require('../../stores/gradeClassStore');
var GradeClassList = require('./partials/gradeClassList');
var CreateGradeClassModal = require('./partials/crudGradeClassModal');
var UpdateGradeClassModal = require('./partials/crudGradeClassModal');
var DeleteGradeClassModal = require('./partials/crudGradeClassModal');
var gradeClassActions = require('../../actions/gradeClassActions');

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
            gradeClass: {},
            isCreateModalOpen: false,
            isUpdateModalOpen: false,
            isDeleteModalOpen: false,
        };
    },

    componentDidMount: function () {
        GradeClassStore.addEventListener(GradeClassStore.GET_GRADE_CLASSES_EVENT, this.onRetrieved);
        GradeClassStore.addEventListener(GradeClassStore.CREATE_EVENT, this.onChanged);
        GradeClassStore.addEventListener(GradeClassStore.UPDATE_EVENT, this.onChanged);
        GradeClassStore.addEventListener(GradeClassStore.DELETE_EVENT, this.onChanged);
        //初次打开页面，获取一次数据
        GradeClassActions.getGradeClasses();
    },

    componentWillUnmount: function () {
        GradeClassStore.removeEventListener(GradeClassStore.GET_GRADE_CLASSES_EVENT, this.onRetrieved);
        GradeClassStore.removeEventListener(GradeClassStore.CREATE_EVENT, this.onChanged);
        GradeClassStore.removeEventListener(GradeClassStore.UPDATE_EVENT, this.onChanged);
        GradeClassStore.removeEventListener(GradeClassStore.DELETE_EVENT, this.onChanged);
    },

    onRetrieved: function () {
        this.setState({gradeClasses: GradeClassStore.getGradeClasses()});
    },

    onChanged: function (actionName) {
        switch (actionName){
            case 'create':
                toastr.success('已经成功创建班级');
                this.setState({isCreateModalOpen: false});
                break;
            case 'update':
                toastr.success('已经成功修改班级');
                this.setState({isUpdateModalOpen: false});
                break;
            case 'delete':
                toastr.success('已经成功删除班级，班级代码：' + GradeClassStore.getGradeClassCode());
                this.setState({isDeleteModalOpen: false});
                break;
        }

        this.setState({gradeClass: {}});
    },

    openModal: function (modalName, gradeClass) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: true});
                break;
            case 'update':
                this.setState({
                    isUpdateModalOpen: true,
                    gradeClass: gradeClass});
                break;
            case 'delete':
                this.setState({
                    isDeleteModalOpen: true,
                    gradeClass: gradeClass});
                break;
        }
    },

    closeModal: function (modalName) {
        switch (modalName){
            case 'create':
                this.setState({isCreateModalOpen: false});
                break;
            case 'update':
                this.setState({isUpdateModalOpen: false});
                break;
            case 'delete':
                this.setState({isDeleteModalOpen: false});
                break;
        }

        this.setState({gradeClass: {}});
    },
    
    confirmModal: function (modalName) {
        switch (modalName){
            case 'create':
                gradeClassActions.createGradeClass(this.state.gradeClass);
                break;
            case 'update':
                gradeClassActions.updateGradeClass(this.state.gradeClass);
                break;
            case 'delete':
                gradeClassActions.deleteGradeClass(this.state.gradeClass.classCode);
                break;
        }
    },

    onInputValueChanged: function (e) {
        this.state.gradeClass[e.target.id] = e.target.value;
        this.setState({gradeClass: this.state.gradeClass});
    },

    render: function () {

        return (
            <div className="container">
                <div className="jumbotron subPage">
                    <h1>班级管理</h1>
                    <p>您可以在这里添加、删除、修改班级信息。</p>
                </div>

                <GradeClassList gradeClasses={this.state.gradeClasses}
                                openCreateModal={this.openModal.bind(null, 'create')}
                                openUpdateModal={this.openModal.bind(null, 'update')}
                                openDeleteModal={this.openModal.bind(null, 'delete')}/>

                <CreateGradeClassModal isOpen={this.state.isCreateModalOpen}
                                       closeModal={this.closeModal.bind(null, 'create')}
                                       title={'添加学生信息'}
                                       gradeClass={this.state.gradeClass}
                                       onInputValueChanged={this.onInputValueChanged}
                                       confirmModal={this.confirmModal.bind(null, 'create')}/>

                <UpdateGradeClassModal isOpen={this.state.isUpdateModalOpen}
                                       closeModal={this.closeModal.bind(null, 'update')}
                                       title={'修改学生信息'}
                                       gradeClass={this.state.gradeClass}
                                       onInputValueChanged={this.onInputValueChanged}
                                       confirmModal={this.confirmModal.bind(null, 'update')}/>

                <DeleteGradeClassModal isOpen={this.state.isDeleteModalOpen}
                                       closeModal={this.closeModal.bind(null, 'delete')}
                                       title={'删除学生信息'}
                                       gradeClass={this.state.gradeClass}
                                       onInputValueChanged={this.onInputValueChanged}
                                       confirmModal={this.confirmModal.bind(null, 'delete')}/>
            </div>
        );
    }
});

module.exports = GradeClassManager;