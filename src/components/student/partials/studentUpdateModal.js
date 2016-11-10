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
                classCode           : '',
            },
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.UPDATE_EVENT, this.handleUpdateSuccess);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.UPDATE_EVENT, this.handleUpdateSuccess);
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
                        <h4 className="modal-title">修改学生信息</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <Input id="classCode" text="班级代码：" value={this.state.student.classCode} disabled="disabled"
                                   onChange={this.onModalChange}/>
                            <Input id="student_number" text="学号：" value={this.state.student.student_number} disabled="disabled"
                                   onChange={this.onModalChange}/>
                            <Input id="student_name" text="姓名：" value={this.state.student.student_name}
                                   onChange={this.onModalChange}/>
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