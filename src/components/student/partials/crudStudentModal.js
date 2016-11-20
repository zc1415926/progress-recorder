/**
 * Created by ZC on 2016/4/18.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;
var Input = require('../../app/ui/inputGroup');

var CrudStudentModal = React.createClass({
    render: function () {
        return (
            <div className="container">
                <Modal isOpen={this.props.isOpen} onRequestHide={this.props.closeModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.props.closeModal}/>
                        <ModalTitle>{this.props.title}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <Input id="classCode" text="班级代码：" disabled={this.props.disableArray?this.props.disableArray[0]:''}
                                   value={this.props.student.classCode?this.props.student.classCode:''}
                                   onChange={this.props.onInputValueChanged}/>

                            <Input id="student_number" text="学号：" disabled={this.props.disableArray?this.props.disableArray[1]:''}
                                   value={this.props.student.student_number?this.props.student.student_number:''}
                                   onChange={this.props.onInputValueChanged}/>

                            <Input id="student_name" text="姓名："  disabled={this.props.disableArray?this.props.disableArray[2]:''}
                                   value={this.props.student.student_name?this.props.student.student_name:''}
                                   onChange={this.props.onInputValueChanged}/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={this.props.confirmModal}>
                            确定
                        </button>
                        <button className="btn btn-default" onClick={this.props.closeModal}>
                            取消
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
});

module.exports = CrudStudentModal;