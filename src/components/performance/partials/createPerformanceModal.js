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

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen,
            records: [{
                id: 0,
                created_at: 0,
                delta_score: 0,
                comment: 'Oh yeah!'
            }]
        };
    },

    shouldComponentUpdate: function (nextProps) {

        return this.state.isOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        //close the open flag in the parent
        if(!this.state.isOpen){
            this.props.closeModal();
        }
    },

    handleModalCloseRequest: function () {
        this.setState({'isOpen': false});
    },

    onCreatePerfClicked: function () {
        console.log('sb');
        //this.setState({'modalIsOpen': false});
       // this.props.onCreatePerfClicked();
    },

    render: function () {
        return (
        <div className="container">
            <Modal isOpen={this.state.isOpen} onRequestHide={this.handleModalCloseRequest}>
                <ModalHeader>
                    <ModalClose onClick={this.handleModalCloseRequest}/>
                    <ModalTitle>新建学生表现记录</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <Input id="delta_score" text="评分" />
                        <Input id="comment" text="备注"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={this.onCreatePerfClicked}>
                        保存
                    </button>
                    <button className="btn btn-default" onClick={this.handleModalCloseRequest}>
                        取消
                    </button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
});

module.exports = CreatePerformanceModal;