/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal');

var StudentInfoModal = React.createClass({

    getInitialState: function () {
        return {
            modalIsOpen: this.props.isOpen
        };
    },

    shouldComponentUpdate: function (nextProps) {
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

    handleSaveClicked: function (e) {
        alert('Save button was clicked');
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
                        <h4 className="modal-title">修改学生信息</h4>
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
                                <input type="text" className="form-control" id="student_name"
                                       value={this.props.currentStudent ? this.props.currentStudent.student_name : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_entry_year" className="control-label">入学年：</label>
                                <input type="text" className="form-control" id="student_entry_year"
                                       value={this.props.currentStudent ? this.props.currentStudent.student_entry_year : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_grade" className="control-label">年级：</label>
                                <input type="text" className="form-control" id="student_grade"
                                       value={this.props.currentStudent ? this.props.currentStudent.student_grade : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="student_class" className="control-label">班级：</label>
                                <input type="text" className="form-control" id="student_class"
                                       value={this.props.currentStudent ? this.props.currentStudent.student_class : ''}
                                       onChange={this.onModalChange}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>
                            确认修改
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = StudentInfoModal;