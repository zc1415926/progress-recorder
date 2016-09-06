/**
 * Created by zc1415926 on 2016/9/6.
 */
'use strict';

var React = require('react');

var Modal = require('react-modal-bootstrap').Modal;
var ModalHeader = require('react-modal-bootstrap').ModalHeader;
var ModalTitle = require('react-modal-bootstrap').ModalTitle;
var ModalClose = require('react-modal-bootstrap').ModalClose;
var ModalBody = require('react-modal-bootstrap').ModalBody;
var ModalFooter = require('react-modal-bootstrap').ModalFooter;

var ReactModal = React.createClass({

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen,
            currentGradeClass: this.props.currentGradeClass,
        };
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps['isOpen']){
            this.state.isOpen=nextProps['isOpen'];
        }
        if(nextProps['currentGradeClass']){
            this.state.currentGradeClass=nextProps['currentGradeClass'];
        }
console.log(nextProps['currentGradeClass']);

        this.state.currentGradeClass = nextProps.currentGradeClass;
        return this.state.isOpen = nextProps.isOpen;
    },

    hideModal:function () {
        this.setState({isOpen: false});
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    <h1>12121{this.state.isOpen}</h1>
                    <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                        <ModalHeader>
                            <ModalClose onClick={this.hideModal}/>
                            <ModalTitle>Modal title</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <p>{this.state.currentGradeClass}Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
                                explicabo hic incidunt placeat quasi repellendus soluta,
                                vero. Autem delectus est laborum minus modi molestias
                                natus provident, quidem rerum sint, voluptas!</p>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-default' onClick={this.hideModal}>
                                Close
                            </button>
                            <button className='btn btn-primary'>
                                Save changes
                            </button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
});

module.exports = ReactModal;