/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');
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
                student_entry_year  : '',
                student_grade       : '',
                student_class       : '',
            },
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.DELETE_EVENT, this.handleDeleteSuccess);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DELETE_EVENT, this.handleDeleteSuccess);
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['currentStudent']){
            this.state.student=nextProps['currentStudent'];
        }

        return this.state.modalIsOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        if(!this.state.modalIsOpen){
            this.props.callbackParent('StuDel');
        }
    },

    handleDeleteSuccess: function () {
        toastr.success('已经成功删除学生');
        this.setState({modalIsOpen: false});
    },

    handleModalCloseRequest: function () {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({'modalIsOpen': false});
    },

    handleDeleteClicked: function () {
        StudentActions.deleteStudent(this.state.student);
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
                        <h4 className="modal-title">删除学生信息</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <Input id="student_number" text="学号：" value={this.state.student.student_number}
                                   disabled="disabled"/>
                            <Input id="student_name" text="姓名：" value={this.state.student.student_name}
                                   disabled="disabled"/>
                            <Input id="student_entry_year" text="入学年：" value={this.state.student.student_entry_year}
                                   disabled="disabled"/>
                            <Input id="student_grade" text="年级：" value={this.state.student.student_grade}
                                   disabled="disabled"/>
                            <Input id="student_class" text="班级：" value={this.state.student.student_class}
                                   disabled="disabled"/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            取消
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.handleDeleteClicked}>
                            确认删除
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = StudentInfoModal;