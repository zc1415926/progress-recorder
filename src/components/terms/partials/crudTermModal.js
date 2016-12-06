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

var CrudTermModal = React.createClass({
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
                            <Input id="year" text="学年：" disabled={this.props.disableArray?this.props.disableArray[0]:''}
                                   value={this.props.term.year?this.props.term.year:''}
                                   onChange={this.props.onInputValueChanged}/>

                            <Input id="season" text="学期："  disabled={this.props.disableArray?this.props.disableArray[1]:''}
                                   value={this.props.term.season?this.props.term.season:''}
                                   onChange={this.props.onInputValueChanged}/>
                            </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className={this.props.confirmBtnClassName?this.props.confirmBtnClassName:"btn btn-primary"} onClick={this.props.confirmModal}>
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

module.exports = CrudTermModal;