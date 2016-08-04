/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');
var toastr = require('toastr');
var StudentStore = require('../../../stores/studentStore');
var StudentActions = require('../../../actions/studentActions');

var StudentInfoModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen
        };
    },

    componentDidMount: function () {
        StudentStore.addEventListener(StudentStore.DELETE_EVENT, this.handleDeleteSuccess);
    },

    componentWillUnmount: function () {
        StudentStore.removeEventListener(StudentStore.DELETE_EVENT, this.handleDeleteSuccess);
    },

    shouldComponentUpdate: function (nextProps) {
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
        StudentActions.deleteStudent({
            student_number: this.props.currentStudent.student_number,
            student_name:   this.props.currentStudent.student_name,
            student_entry_year: this.props.currentStudent.student_entry_year,
            student_grade:  this.props.currentStudent.student_grade,
            student_class:  this.props.currentStudent.student_class
        });
    },

    onModalChange:function(e){

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
                            <div className="form-group">
                                <label htmlFor="student_number" className="control-label">学号：</label>
                                <input type="text" className="form-control" id="student_number" disabled
                                       value={this.props.currentStudent ? this.props.currentStudent.student_number : ''}
                                       onChange={this.onModalChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_name" className="control-label">姓名：</label>
                                <input type="text" className="form-control" id="student_name" disabled
                                       value={this.props.currentStudent ? this.props.currentStudent.student_name : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_entry_year" className="control-label">入学年：</label>
                                <input type="text" className="form-control" id="student_entry_year" disabled
                                       value={this.props.currentStudent ? this.props.currentStudent.student_entry_year : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_grade" className="control-label">年级：</label>
                                <input type="text" className="form-control" id="student_grade" disabled
                                       value={this.props.currentStudent ? this.props.currentStudent.student_grade : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_class" className="control-label">班级：</label>
                                <input type="text" className="form-control" id="student_class" disabled
                                       value={this.props.currentStudent ? this.props.currentStudent.student_class : ''}
                                       onChange={this.onModalChange}/>
                            </div>
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