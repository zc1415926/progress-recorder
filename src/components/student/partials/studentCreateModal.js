/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');
var _ = require('lodash');
var toastr = require('toastr');
var StudentStore = require('../../../stores/studentStore');
var StudentActions = require('../../../actions/studentActions');
var Input = require('./inputGroup');

var StudentInfoModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen,
            student: {
                student_number      : '',
                student_name        : '',
                classCode           : '',
            },

            errors: {}
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.CREATE_EVENT, this.handleCreateSuccess);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.CREATE_EVENT, this.handleCreateSuccess);
    },

    shouldComponentUpdate: function (nextProps) {
        this.state.student.classCode = nextProps.classCode;
        return this.state.modalIsOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.modalIsOpen){
            this.props.callbackParent('StuCreate');
        }
    },

    handleCreateSuccess: function () {
        toastr.success('成功添加了学生');
        this.setState({modalIsOpen: false});
    },

    handleModalCloseRequest: function () {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
    },

    handleSaveClicked: function (e) {
        StudentActions.createStudent(this.state.student);
        /*this.state.errors = {};

        if(this.state.student_number == '' || _.isNaN(_.toNumber(this.state.student_number))){
            console.log('student number error!');
            this.state.errors.student_number = 'student_number error';
        }
        if(this.state.student_name == '' || this.state.student_name.length < 2){
            console.log('student_name error!');
            this.state.errors.student_name = 'student_name error';
        }
        if(this.state.student_entry_year == ''){
            console.log('student_entry_year error!');
            this.state.errors.student_entry_year = 'student_entry_year error';
        }
        if(this.state.student_grade == ''){
            console.log('student number error!');
            this.state.errors.student_grade = 'student_grade error';
        }
        if(this.state.student_class == ''){
            console.log('student number error!');
            this.state.errors.student_class = 'student_class error';
        }

        this.setState({errors: this.state.errors});

        if(_.keys(this.state.errors).length == 0){
            console.log('valid');
            StudentActions.createStudent({
                student_number: this.state.student_number,
                student_name:   this.state.student_name,
                student_entry_year: this.state.student_entry_year,
                student_grade:  this.state.student_grade,
                student_class:  this.state.student_class
            });
            this.setState({modalIsOpen: false});
        }else{
            console.log('invalid');
        }*/
        /*this.props.callbackParent([
            this.state.student_number,
            this.state.student_name,
            this.state.student_entry_year,
            this.state.student_grade,
            this.state.student_class
        ]);*/
        //console.log(this.state);
        //this.setState({modalIsOpen: false});
    },

    onModalChange:function(e){
        this.state.student[e.target.id] = e.target.value;
        return this.setState({student: this.state.student});
    },

    render: function () {
        return (
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">添加学生信息</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <Input id="classCode" text="班级代码：" value={this.state.student.classCode} disabled="disabled"
                                   onChange={this.onModalChange}/>
                            <Input id="student_number" text="学号：" value={this.state.student.student_number}
                                   onChange={this.onModalChange}/>
                            <Input id="student_name" text="姓名：" value={this.state.student.student_name}
                                   onChange={this.onModalChange}/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>
                            确认添加
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = StudentInfoModal;