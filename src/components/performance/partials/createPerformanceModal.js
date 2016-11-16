/**
 * Created by zc1415926 on 2016/11/16.
 */
'use strict';
var React = require('react');
var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;
var Input = require('../../app/partials/inputGroup');

var CreatePerformanceModal = React.createClass({

    render: function () {
        return (
        <div className="container">
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.closeModal}>
                <ModalHeader>
                    <ModalClose onClick={this.props.closeModal}/>
                    <ModalTitle>新建学生表现记录</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <Input id="delta_score" text="评分" onChange={this.props.onInputValueChanged}/>
                        <Input id="comment" text="备注" onChange={this.props.onInputValueChanged}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.props.confirmModal}>
                        保存
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

module.exports = CreatePerformanceModal;