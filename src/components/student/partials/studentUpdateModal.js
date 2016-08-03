/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');
var toastr = require('toastr');
var StudentActions = require('../../../actions/studentActions');
var StudentStore = require('../../../stores/studentStore');

var Input = require('./inputGroup');

var StudentUpdateModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen,
            student: {
                student_number      : '',
                student_name        : '',
                student_entry_year  : '',
                student_grade       : '',
                student_class       : '',
            },
        };
    },

    componentDidMount: function () {
        StudentStore.addUpdateListener(this.handleUpdateSuccess);
    },

    componentWillUnmount: function () {
        StudentStore.removeUpdateListener(this.handleUpdateSuccess);
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['currentStudent']){
            this.state.student=nextProps['currentStudent'];
        }

        return this.state.modalIsOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.modalIsOpen){
            this.props.callbackParent('Edit');
        }
    },

    handleModalCloseRequest: function () {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modalIsOpen: false});
    },

    handleUpdateClicked: function () {
        StudentActions.updateStudent(this.state.student);
    },

    handleUpdateSuccess: function () {
        toastr.success("成功修改学生信息");
        this.setState({modalIsOpen: false});
    },

    onModalChange:function(e){
        this.state.student[e.target.id] = e.target.value;
        this.setState({student: this.state.student});
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
                        <h4 className="modal-title">修改学生信息</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="student_number" className="control-label">学号：</label>
                                <input type="text" className="form-control" id="student_number" disabled
                                       value={this.state.student.student_number}
                                       onChange={this.onModalChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_name" className="control-label">姓名：</label>
                                <input type="text" className="form-control" id="student_name"
                                       value={this.state.student.student_name}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_entry_year" className="control-label">入学年：</label>
                                <input type="text" className="form-control" id="student_entry_year"
                                       value={this.state.student.student_entry_year}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_grade" className="control-label">年级：</label>
                                <input type="text" className="form-control" id="student_grade"
                                       value={this.state.student.student_grade}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_class" className="control-label">班级：</label>
                                <input type="text" className="form-control" id="student_class"
                                       value={this.state.student.student_class}
                                       onChange={this.onModalChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleUpdateClicked}>
                            确认修改
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = StudentUpdateModal;