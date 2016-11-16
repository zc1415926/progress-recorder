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

var DeletePerformanceModal = React.createClass({

    getInitialState: function () {
        return {
            isOpen: this.props.isOpen,
            performance: {
                id: 0,
                created_at: 0,
                delta_score: 0,
                comment: 'Oh yeah!'
            }
        };
    },

    shouldComponentUpdate: function (nextProps) {
        if(nextProps.performance!={}){
            this.state.performance = nextProps.performance;
        }

        return this.state.isOpen = nextProps.isOpen;
    },

    componentDidUpdate: function(){
        //close the open flag in the parent
        if(!this.state.isOpen){
            this.props.closeModal();
        }
    },

    onConfirmClicked: function () {
        this.setState({'isOpen': false});
       //do some actions
    },

    onCancelClicked: function () {
        this.setState({'isOpen': false});
    },

    onModalChange:function(e){
        this.state.performance[e.target.id] = e.target.value;
        return this.setState({performance: this.state.performance});
    },

    render: function () {
        return (
        <div className="container">
            <Modal isOpen={this.state.isOpen} onRequestHide={this.onCancelClicked}>
                <ModalHeader>
                    <ModalClose onClick={this.onCancelClicked}/>
                    <ModalTitle>删除学生表现记录</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <Input id="delta_score" value={this.state.performance.delta_score} text="评分"
                               disabled="disabled" onChange={this.onModalChange}/>
                        <Input id="comment" value={this.state.performance.comment} text="备注"
                               disabled="disabled" onChange={this.onModalChange}/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={this.onConfirmClicked}>
                        删除
                    </button>
                    <button className="btn btn-default" onClick={this.onCancelClicked}>
                        取消
                    </button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
});

module.exports = DeletePerformanceModal;